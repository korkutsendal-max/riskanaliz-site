import { useState } from 'react'

export default function ApplyPage() {
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Gönderiliyor...')
    const form = e.target
    const formData = new FormData(form)

    const files = formData.getAll('pdfs')
    if (files.length > 4) {
      setStatus('En fazla 4 PDF yükleyebilirsiniz.')
      return
    }

    const res = await fetch('/api/apply', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      setStatus('Başvurunuz gönderildi. Teşekkürler.')
      form.reset()
    } else {
      const text = await res.text()
      setStatus('Hata: ' + text)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Başvuru Formu</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Ad Soyad</label>
          <input name="name" required className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">E-posta</label>
          <input name="email" type="email" required className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Telefon</label>
          <input name="phone" className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Açıklama</label>
          <textarea name="message" className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">PDF Dosyaları (en fazla 4)</label>
          <input name="pdfs" type="file" accept="application/pdf" multiple className="mt-1" />
        </div>
        <div>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Gönder</button>
        </div>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </main>
  )
}
