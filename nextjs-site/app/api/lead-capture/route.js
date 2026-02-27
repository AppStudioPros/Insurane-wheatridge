import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, email, phone, website } = body

    // Honeypot check
    if (website) {
      return Response.json({ success: true })
    }

    if (!firstName || !email) {
      return Response.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Insurance Wheatridge <noreply@mail.insurancewheatridge.com>',
      to: ['jubal.terry@insurancewheatridge.com'],
      subject: `🎯 New Lead: ${firstName} is interested in a quote`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #1e3a5f; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Lead Captured 🎯</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Someone wants a free quote</p>
          </div>
          <div style="background: white; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827;">
                  <a href="mailto:${email}" style="color: #1e3a5f;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Phone</td>
                <td style="padding: 10px 0; font-weight: 600; color: #111827;">
                  ${phone ? `<a href="tel:${phone}" style="color: #1e3a5f;">${phone}</a>` : '<span style="color: #9ca3af;">Not provided</span>'}
                </td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #1e3a5f;">
              <p style="margin: 0; color: #1e3a5f; font-size: 14px;">
                <strong>Heads up:</strong> This lead came from the quote popup on the website. They expressed interest but haven't filled out the full form yet — worth a quick follow-up!
              </p>
            </div>
          </div>
        </div>
      `,
    })

    // Log to Supabase
    supabase.from('leads').insert({
      first_name: firstName, email, phone
    }).then(({ error: dbErr }) => {
      if (dbErr) console.error('Supabase log error:', dbErr);
    });

    return Response.json({ success: true })
  } catch (err) {
    console.error('Lead capture error:', err)
    return Response.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
