import nodemailer from 'nodemailer'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    })

    await transporter.verify()
    return res.status(200).json({ success: true, message: 'SMTP bağlantısı başarılı' })
  } catch (err: any) {
    console.error('email-test error', err)
    return res.status(500).json({ success: false, message: err.message || 'SMTP bağlantı hatası' })
  }
}
