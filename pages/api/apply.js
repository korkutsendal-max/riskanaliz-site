export const config = {
  api: {
    bodyParser: false
  }
}

import formidable from 'formidable'
import fs from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'

const maxFileSize = 10 * 1024 * 1024 // 10 MB per file

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const form = new formidable.IncomingForm({ multiples: true, maxFileSize })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error', err)
      return res.status(400).send('Form verisi çözülemedi.')
    }

    try {
      const name = fields.name || 'İsim yok'
      const email = fields.email || 'E-posta yok'
      const phone = fields.phone || ''
      const message = fields.message || ''

      let uploaded = files.pdfs ? (Array.isArray(files.pdfs) ? files.pdfs : [files.pdfs]) : []
      if (uploaded.length > 4) {
        uploaded.forEach(f => {
          const fp = f.filepath || f.path
          try { if (fp && fs.existsSync(fp)) fs.unlinkSync(fp) } catch (e) {}
        })
        return res.status(400).send('En fazla 4 dosya yükleyebilirsiniz.')
      }

      for (const f of uploaded) {
        const mime = f.mimetype || f.type
        const size = f.size || f.size
        if (!mime || !mime.includes('pdf')) {
          cleanupFiles(uploaded)
          return res.status(400).send('Sadece PDF dosyalarına izin verilir.')
        }
        if (size > maxFileSize) {
          cleanupFiles(uploaded)
          return res.status(400).send('Her bir dosya maksimum 10MB olabilir.')
        }
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })

      const attachments = uploaded.map((f) => {
        const fp = f.filepath || f.path
        return {
          filename: f.originalFilename || path.basename(fp),
          path: fp,
          contentType: 'application/pdf'
        }
      })

      const mailOptions = {
        from: `"Başvuru Formu" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO || 'evrak@riskanaliz.com.tr',
        subject: `Yeni Başvuru - ${name}`,
        text: `Yeni başvuru:\n\nİsim: ${name}\nE-posta: ${email}\nTelefon: ${phone}\nMesaj: ${message}`,
        attachments
      }

      await transporter.sendMail(mailOptions)

      cleanupFiles(uploaded)

      return res.status(200).send('Gönderildi')
    } catch (e) {
      console.error('API hata', e)
      return res.status(500).send('Sunucu hatası')
    }
  })
}

function cleanupFiles(files) {
  for (const f of files) {
    const fp = f.filepath || f.path
    try { if (fp && fs.existsSync(fp)) fs.unlinkSync(fp) } catch (e) {}
  }
}
