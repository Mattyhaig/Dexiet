import nodemailer from 'nodemailer'

export async function sendAlertEmail(to: string, domains: Array<{ name: string; score: number }>) {
  if (!process.env.EMAIL_SERVER || !process.env.EMAIL_FROM) return
  const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER)
  const html = `
  <h2>New domains matching your alert</h2>
  <ul>
    ${domains.map((d) => `<li><a href="https://www.${d.name}">${d.name}</a> — score ${d.score.toFixed(1)}</li>`).join('')}
  </ul>`
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Dexiet alert: new domains available',
    html,
  })
}
