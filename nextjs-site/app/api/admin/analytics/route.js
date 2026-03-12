import { NextResponse } from 'next/server'

const PROPERTY_ID = '468298104'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Jubal2026'

function getCreds() {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_B64
  if (b64) return JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'))
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (raw) return JSON.parse(raw)
  throw new Error('No Google service account credentials found')
}

async function createJWT(creds) {
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(JSON.stringify({
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url')

  const pem = creds.private_key.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\n/g, '')
  const binaryKey = Buffer.from(pem, 'base64')

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', binaryKey, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']
  )

  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(`${header}.${payload}`))
  const sig = Buffer.from(signature).toString('base64url')

  return `${header}.${payload}.${sig}`
}

async function getAccessToken() {
  const creds = getCreds()
  const jwt = await createJWT(creds)
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  })
  const data = await res.json()
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`)
  return data.access_token
}

async function gaReport(token, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  )
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data
}

export async function GET(request) {
  const authToken = request.headers.get('authorization')?.replace('Bearer ', '')
  if (authToken !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const range = searchParams.get('range') || '30'
  const startDate = range === '7' ? '7daysAgo' : range === '90' ? '90daysAgo' : '30daysAgo'

  try {
    const token = await getAccessToken()

    const [overviewData, pagesData, devicesData, sourcesData, trendData, geoData] = await Promise.all([
      gaReport(token, {
        dateRanges: [{ startDate, endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }, { name: 'bounceRate' }, { name: 'averageSessionDuration' }, { name: 'newUsers' }],
      }),
      gaReport(token, {
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        limit: 10,
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      }),
      gaReport(token, {
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }],
      }),
      gaReport(token, {
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        limit: 10,
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),
      gaReport(token, {
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
      }),
      gaReport(token, {
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'city' }],
        metrics: [{ name: 'sessions' }],
        limit: 10,
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),
    ])

    const ov = overviewData.rows?.[0]?.metricValues || []
    const overview = {
      users: parseInt(ov[0]?.value || '0'),
      sessions: parseInt(ov[1]?.value || '0'),
      pageViews: parseInt(ov[2]?.value || '0'),
      bounceRate: (parseFloat(ov[3]?.value || '0') * 100).toFixed(1),
      avgSessionDuration: parseFloat(ov[4]?.value || '0').toFixed(0),
      newUsers: parseInt(ov[5]?.value || '0'),
    }

    const topPages = (pagesData.rows || []).map(r => ({ page: r.dimensionValues[0].value, views: parseInt(r.metricValues[0].value), users: parseInt(r.metricValues[1].value) }))
    const devices = (devicesData.rows || []).map(r => ({ device: r.dimensionValues[0].value, sessions: parseInt(r.metricValues[0].value) }))
    const sources = (sourcesData.rows || []).map(r => ({ source: r.dimensionValues[0].value || '(direct)', sessions: parseInt(r.metricValues[0].value) }))
    const dailyTrend = (trendData.rows || []).map(r => ({ date: r.dimensionValues[0].value.replace(/(\d{4})(\d{2})(\d{2})/, '$2/$3'), users: parseInt(r.metricValues[0].value), sessions: parseInt(r.metricValues[1].value) }))
    const locations = (geoData.rows || []).map(r => ({ city: r.dimensionValues[0].value || '(unknown)', sessions: parseInt(r.metricValues[0].value) }))

    return NextResponse.json({ overview, topPages, devices, sources, dailyTrend, locations, range: parseInt(range), generated: new Date().toISOString() }, {
      headers: { 'Cache-Control': 'no-store, no-cache', 'Pragma': 'no-cache' }
    })
  } catch (err) {
    console.error('Analytics API error:', err)
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 })
  }
}
