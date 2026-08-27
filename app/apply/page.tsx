'use client'
import { useState } from 'react'
import ApplicationForm from '../../components/application/ApplicationForm'
import Navbar from '../../components/ui/Navbar'

export default function ApplyPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Kurumsal Başvuru Formu</h1>
        <p className="text-gray-300 mb-6">Lütfen formu eksiksiz doldurun. En fazla 4 PDF yükleyebilirsiniz. Her dosya en fazla 10MB olmalıdır.</p>
        <ApplicationForm />
      </main>
    </div>
  )
}
