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
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

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
      return res.status(400).send('En fazla 4 dosya yükleyebilirsiniz.')
    }

    const attachments: { filename: string, path: string }[] = []
    for (const f of uploaded) {
      const fp = f.filepath || f.path
      const mime = f.mimetype || f.type
      const size = f.size || 0
      if (!mime || !mime.includes('pdf')) {
        cleanupFiles(uploaded)
        return res.status(400).send('Sadece PDF dosyalarına izin verilir.')
      }
      attachments.push({ filename: f.originalFilename || (fp ? fp.split('/').pop() : 'file.pdf'), path: fp })
    }

    await sendApplicationEmail({ name, email, phone, company, message, attachments })

    // cleanup
    cleanupFiles(uploaded)

    return res.status(200).send('Gönderildi')
  } catch (err: any) {
    console.error('apply api error', err)
    return res.status(500).send(err.message || 'Sunucu hatası')
  }
}

function cleanupFiles(files: any[]) {
  for (const f of files) {
    const fp = f.filepath || f.path
    try { if (fp && fs.existsSync(fp)) fs.unlinkSync(fp) } catch (e) {}
  }
}
