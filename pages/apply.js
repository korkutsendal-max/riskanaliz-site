import { useState } from 'react'

export default function ApplyPage() {
  const [status, setStatus] = useState(null)
  const [files, setFiles] = useState([])

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files)
    // only PDFs and max 4
    const valid = selected.filter(f => f.type === 'application/pdf')
    if (valid.length !== selected.length) {
      alert('Sadece PDF dosyalarına izin verilir.')
    }
    if (valid.length > 4) {
      alert('En fazla 4 dosya yükleyebilirsiniz.')
      valid.splice(4)
    }
    setFiles(valid)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Gönderiliyor...')
    const form = e.target
    const formData = new FormData(form)

    // Attach files manually to ensure correct field
    files.forEach((f) => formData.append('pdfs', f))

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        setStatus('Başvurunuz başarıyla gönderildi. Teşekkürler.')
        form.reset()
        setFiles([])
      } else {
        const txt = await res.text()
        setStatus('Hata: ' + txt)
      }
    } catch (err) {
      setStatus('Sunucu hatası: ' + err.message)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-start py-12">
      <div className="max-w-3xl w-full mx-auto bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold mb-2">Kurumsal Başvuru Formu</h1>
        <p className="text-gray-600 mb-6">Lütfen formu eksiksiz doldurun. İhtiyacınız halinde en fazla 4 PDF belge ekleyebilirsiniz (her bir dosya max 10MB).</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Ad Soyad *</label>
              <input name="name" required className="mt-1 block w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Şirket</label>
              <input name="company" className="mt-1 block w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">E-posta *</label>
              <input name="email" type="email" required className="mt-1 block w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Telefon</label>
              <input name="phone" className="mt-1 block w-full border rounded p-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Hizmet İlgisi</label>
            <select name="service" className="mt-1 block w-full border rounded p-2">
              <option value="">Seçiniz</option>
              <option value="danismanlik">Danışmanlık</option>
              <option value="analiz">Analiz</option>
              <option value="raporlama">Raporlama</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Açıklama</label>
            <textarea name="message" rows={5} className="mt-1 block w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">PDF Dosyaları (max 4)</label>
            <input type="file" accept="application/pdf" multiple onChange={handleFiles} className="mt-1" />
            {files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-700">
                {files.map((f, i) => (
                  <li key={i}>{f.name} ({Math.round(f.size/1024)} KB)</li>
                ))}
              </ul>
            )}
          </div>

          {/* TODO: add reCAPTCHA here for production */}

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Başvuruyu Gönder</button>
            <span className="text-sm text-gray-600">Gizlilik politikamıza uygun olarak bilgilerinizi saklıyoruz.</span>
          </div>
        </form>

        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </div>
    </main>
  )
}
