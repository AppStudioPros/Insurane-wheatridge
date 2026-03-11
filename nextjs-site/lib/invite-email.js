export function buildInviteEmail(firstName, token) {
  const setupUrl = `https://www.insurancewheatridge.com/portal/setup?token=${token}`
  return {
    from: 'Insurance Wheat Ridge <onboarding@resend.dev>',
    subject: "You're Invited to Your Insurance Portal",
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
<tr><td style="background:linear-gradient(135deg,#0954a5,#073d7a);padding:40px 30px;text-align:center">
<h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700">Insurance Wheat Ridge</h1>
<p style="color:#a3c4e8;margin:8px 0 0;font-size:14px">Your Client Portal</p>
</td></tr>
<tr><td style="padding:40px 30px">
<p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px">Hello ${firstName},</p>
<p style="color:#333;font-size:16px;line-height:1.6;margin:0 0 16px">J. Terry at Insurance Wheat Ridge has invited you to your client portal.</p>
<p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 30px">Set up your account to view your policies, access your digital insurance cards, upload documents, and more.</p>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<a href="${setupUrl}" style="display:inline-block;background:#0954a5;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:600">Set Up My Account</a>
</td></tr></table>
<p style="color:#888;font-size:13px;margin:30px 0 0;line-height:1.5">If the button doesn't work, copy and paste this link:<br><a href="${setupUrl}" style="color:#0954a5;word-break:break-all">${setupUrl}</a></p>
</td></tr>
<tr><td style="background:#f9fafb;padding:24px 30px;border-top:1px solid #eee">
<p style="color:#888;font-size:12px;margin:0;text-align:center">Insurance Wheat Ridge — Farmers Insurance<br>4095 Youngfield St, Wheat Ridge, CO 80033<br>(303) 940-1677</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`
  }
}
