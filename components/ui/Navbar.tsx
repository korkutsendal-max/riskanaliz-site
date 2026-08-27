'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white/5 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">RiskAnaliz</Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/">Ana Sayfa</Link>
          <Link href="/services">Hizmetler</Link>
          <Link href="/">Risk Analizi</Link>
          <Link href="/apply">Başvuru</Link>
          <Link href="/contact">İletişim</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/apply" className="px-4 py-2 bg-cyan-500 text-navy rounded font-semibold">Risk Analizi Başlat</Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          <Menu />
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-3">
            <Link href="/">Ana Sayfa</Link>
            <Link href="/services">Hizmetler</Link>
            <Link href="/">Risk Analizi</Link>
            <Link href="/apply">Başvuru</Link>
            <Link href="/contact">İletişim</Link>
            <Link href="/apply" className="mt-2 px-4 py-2 bg-cyan-500 text-navy rounded">Risk Analizi Başlat</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
