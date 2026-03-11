import bcrypt from 'bcryptjs'

const SECRET = process.env.PORTAL_SECRET || 'iw-portal-secret-2026'

export function createToken(clientId) {
  const payload = {
    client_id: clientId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }
  const json = JSON.stringify(payload)
  const b64 = Buffer.from(json).toString('base64')
  const sig = Buffer.from(b64 + SECRET).toString('base64')
  return b64 + '.' + sig
}

export function verifyToken(token) {
  if (!token) return null
  try {
    const [b64, sig] = token.split('.')
    const expectedSig = Buffer.from(b64 + SECRET).toString('base64')
    if (sig !== expectedSig) return null
    const payload = JSON.parse(Buffer.from(b64, 'base64').toString())
    if (payload.exp < Date.now()) return null
    return payload.client_id
  } catch {
    return null
  }
}

export function getClientId(request) {
  const auth = request.headers.get('Authorization') ?? ''
  const token = auth.replace('Bearer ', '')
  return verifyToken(token)
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash)
}
