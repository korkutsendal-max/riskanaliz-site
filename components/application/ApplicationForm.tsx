'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, ApplicationInput } from '../../lib/validations/application'
import { useState } from 'react'

export default function ApplicationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplicationInput>({ resolver: zodResolver(applicationSchema) })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<string | null>(null)

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const pdfs = selected.filter(f => f.type === 'application/pdf')
    if (pdfs.length > 4) pdfs.splice(4)
    setFiles(pdfs)
  }

  const onSubmit = async (data: ApplicationInput) => {
    setStatus('Gönderiliyor...')
    const fd = new FormData()
    fd.append('name', data.name)
    fd.append('email', data.email)
    fd.append('company', data.company || '')
    fd.append('phone', data.phone || '')
    fd.append('service', data.service || '')
    fd.append('message', data.message || '')
    files.forEach(f => fd.append('pdfs', f))

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: fd })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus('Başvurunuz başarıyla gönderildi.')
        reset()
        setFiles([])
      } else {
        setStatus('Hata: ' + (json?.message || 'Bilinmeyen hata'))
      }
    } catch (err: any) {
      setStatus('Sunucu hatası: ' + (err.message || String(err)))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Ad Soyad *</label>
          <input className="mt-1 block w-full p-2 rounded bg-white/5" {...register('name')} />
          {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Şirket</label>
          <input className="mt-1 block w-full p-2 rounded bg-white/5" {...register('company')} />
        </div>
        <div>
          <label className="block text-sm">E-posta *</label>
          <input className="mt-1 block w-full p-2 rounded bg-white/5" {...register('email')} />
          {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Telefon</label>
          <input className="mt-1 block w-full p-2 rounded bg-white/5" {...register('phone')} />
        </div>
      </div>

      <div>
        <label className="block text-sm">Hizmet İlgisi</label>
        <select className="mt-1 block w-full p-2 rounded bg-white/5" {...register('service')}>
          <option value="">Seçiniz</option>
          <option value="danismanlik">Danışmanlık</option>
          <option value="analiz">Analiz</option>
          <option value="raporlama">Raporlama</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">Açıklama</label>
        <textarea className="mt-1 block w-full p-2 rounded bg-white/5" rows={5} {...register('message')}></textarea>
      </div>

      <div>
        <label className="block text-sm">PDF Dosyaları (max 4)</label>
        <input type="file" accept="application/pdf" multiple onChange={onFiles} className="mt-1" />
        {files.length > 0 && (
          <ul className="mt-2 text-sm text-gray-300">
            {files.map((f, i) => <li key={i}>{f.name} ({Math.round(f.size/1024)} KB)</li>)}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="px-4 py-2 bg-cyan-500 text-navy rounded font-semibold">Başvuruyu Gönder</button>
        {status && <div className="text-sm text-gray-300">{status}</div>}
      </div>
    </form>
  )
}
