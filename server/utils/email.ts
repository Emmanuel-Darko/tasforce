import { Resend } from 'resend'

let _r: Resend | null = null
const r = () => {
  if (!_r) _r = new Resend(useRuntimeConfig().resendApiKey)
  return _r
}
const from = () => useRuntimeConfig().emailFrom

export async function emailRegistrationReceived(to: string, name: string) {
  if (!useRuntimeConfig().resendApiKey) return
  await r().emails.send({
    from: from(), to,
    subject: 'TAS-FORCE — Your registration has been received',
    html: `<div style="font-family:Georgia,serif;max-width:560px;margin:auto;background:#1a0005;color:#f5e6d0;padding:32px;border-radius:8px;">
      <h2 style="color:#C9A84C;">Hello ${name},</h2>
      <p>Thank you for registering with <strong>TAS-FORCE</strong>. Your membership application is under review.</p>
      <p>You will be notified once approved and your membership card is ready.</p>
      <p style="font-size:12px;color:#a0857a;margin-top:24px;">Truth and Advocacy for Serwah &amp; Women Empowerment</p>
    </div>`
  })
}

export async function emailApproved(to: string, name: string, memberId: string) {
  if (!useRuntimeConfig().resendApiKey) return
  const appUrl = useRuntimeConfig().public.appUrl
  await r().emails.send({
    from: from(), to,
    subject: `TAS-FORCE — Welcome, ${name}! Your membership is approved`,
    html: `<div style="font-family:Georgia,serif;max-width:560px;margin:auto;background:#1a0005;color:#f5e6d0;padding:32px;border-radius:8px;">
      <h2 style="color:#C9A84C;">Congratulations, ${name}!</h2>
      <p>Your TAS-FORCE membership has been <strong>approved</strong>.</p>
      <div style="background:#3D0000;border-radius:6px;padding:14px 24px;text-align:center;font-size:22px;letter-spacing:0.14em;font-weight:700;color:#C9A84C;margin:16px 0;">${memberId}</div>
      <p>Log in to view and download your digital membership card.</p>
      <a href="${appUrl}/dashboard" style="display:inline-block;background:#C9A84C;color:#1a0005;padding:10px 24px;border-radius:6px;font-weight:700;text-decoration:none;margin-top:8px;">View My Card</a>
      <p style="font-size:12px;color:#a0857a;margin-top:24px;">Truth and Advocacy for Serwah &amp; Women Empowerment</p>
    </div>`
  })
}

export async function emailRejected(to: string, name: string) {
  if (!useRuntimeConfig().resendApiKey) return
  await r().emails.send({
    from: from(), to,
    subject: 'TAS-FORCE — Application Update',
    html: `<div style="font-family:Georgia,serif;max-width:560px;margin:auto;background:#1a0005;color:#f5e6d0;padding:32px;border-radius:8px;">
      <h2 style="color:#C9A84C;">Dear ${name},</h2>
      <p>After review, your membership application was not approved at this time.</p>
      <p>Please contact us at info@tas-force.org if you believe this is an error.</p>
      <p style="font-size:12px;color:#a0857a;margin-top:24px;">Truth and Advocacy for Serwah &amp; Women Empowerment</p>
    </div>`
  })
}
