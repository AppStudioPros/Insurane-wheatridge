import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = "force-dynamic"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, insuranceType, message, website } = await req.json();

    // Honeypot check
    if (website && website.trim() !== '') {
      // Log to Supabase
    supabase.from('inquiries').insert({
      source: 'farmers',
      name, email, phone,
      insurance_type: insuranceType,
      message,
    }).then(({ error: dbErr }) => {
      if (dbErr) console.error('Supabase log error:', dbErr);
    });

    return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Insurance Wheatridge <noreply@mail.insurancewheatridge.com>',
      to: ['jterry1@farmersagent.com'],
      replyTo: email,
      subject: `New Farmers Quote Request — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div style="background: #cc0000; padding: 20px 24px; border-radius: 6px; margin-bottom: 24px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Farmers Insurance Quote Request</h2>
            <p style="color: #fca5a5; margin: 4px 0 0; font-size: 14px;">insurancewheatridge.com — Contact Page</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 160px; vertical-align: top; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #1d4ed8;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; color: #111827;">${phone}</td>
            </tr>` : ''}
            ${insuranceType ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Coverage Type</td>
              <td style="padding: 10px 0; color: #111827;">${insuranceType}</td>
            </tr>` : ''}
            ${message ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Message</td>
              <td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${message}</td>
            </tr>` : ''}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Jubal Terry — Insurance Wheatridge · (303) 464-1911</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    // Log to Supabase
    supabase.from('inquiries').insert({
      source: 'farmers',
      name, email, phone,
      insurance_type: insuranceType,
      message,
    }).then(({ error: dbErr }) => {
      if (dbErr) console.error('Supabase log error:', dbErr);
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
