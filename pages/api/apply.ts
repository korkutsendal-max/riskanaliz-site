import formidable from 'formidable'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { sendApplicationEmail } from '../../lib/services/email'

export const config = {
  api: { bodyParser: false }
}

function parseForm(req: NextApiRequest): Promise<{ fields: any, files: any }> {
  const form = formidable({ multiples: true, maxFileSize: 10 * 1024 * 1024 })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    const { fields, files } = await parseForm(req)
    const name = fields.name || 'İsim yok'
    const email = fields.email || ''
    const phone = fields.phone || ''
    const company = fields.company || ''
    const message = fields.message || ''

    const uploaded = files.pdfs ? (Array.isArray(files.pdfs) ? files.pdfs : [files.pdfs]) : []
    if (uploaded.length > 4) {
      cleanupFiles(uploaded)
      return res.status(400).json({ success: false, message: 'En fazla 4 dosya yükleyebilirsiniz.' })
    }

    const attachments: { filename: string, path: string }[] = []
    for (const f of uploaded) {
      const fp = f.filepath || f.path
      const mime = f.mimetype || f.type
      const size = f.size || 0
      if (!mime || !mime.includes('pdf')) {
        cleanupFiles(uploaded)
        return res.status(400).json({ success: false, message: 'Sadece PDF dosyalarına izin verilir.' })
      }
      attachments.push({ filename: f.originalFilename || (fp ? fp.split('/').pop() : 'file.pdf'), path: fp })
    }

    try {
      await sendApplicationEmail({ name, email, phone, company, message, attachments })
    } catch (mailErr: any) {
      console.error('nodemailer error', mailErr)
      // Save attempt or notify admin in future; for now return clear error
      cleanupFiles(uploaded)
      return res.status(502).json({ success: false, message: 'E-posta gönderimi başarısız: ' + (mailErr.message || String(mailErr)) })
    }

    // cleanup
    cleanupFiles(uploaded)

    return res.status(200).json({ success: true, message: 'Başvurunuz alındı. Teşekkür ederiz.' })
  } catch (err: any) {
    console.error('apply api error', err)
    return res.status(500).json({ success: false, message: err.message || 'Sunucu hatası' })
  }
}

function cleanupFiles(files: any[]) {
  for (const f of files) {
    const fp = f.filepath || f.path
    try { if (fp && fs.existsSync(fp)) fs.unlinkSync(fp) } catch (e) {}
  }
}
