import nodemailer from 'nodemailer'

export async function sendApplicationEmail({ name, email, phone, company, message, attachments }: {
  name: string,
  email: string,
  phone?: string,
  company?: string,
  message?: string,
  attachments?: { filename: string, path: string }[]
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  })

  const mailOptions = {
    from: `"Başvuru Formu" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO || 'evrak@riskanaliz.com.tr',
    subject: `Yeni Başvuru - ${name}`,
    text: `İsim: ${name}\nE-posta: ${email}\nTelefon: ${phone || ''}\nŞirket: ${company || ''}\nMesaj: ${message || ''}`,
    attachments: attachments || []
  }

  return transporter.sendMail(mailOptions)
}
