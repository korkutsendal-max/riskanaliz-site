import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">RiskAnaliz</h1>
          <nav className="space-x-4">
            <Link href="/">Ana Sayfa</Link>
            <Link href="/about">Hakkımızda</Link>
            <Link href="/services">Hizmetlerimiz</Link>
            <Link href="/contact">İletişim</Link>
            <Link href="/apply" className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">Başvuru</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="py-12">
          <h2 className="text-3xl font-semibold mb-4">Finansal Risk Yönetimi ve Analiz</h2>
          <p className="text-gray-700 leading-relaxed">Kurumsal ölçekli finansal analiz, uyum ve risk yönetimi hizmetleri sunuyoruz. Profesyonel ekibimizle süreçlerinizi iyileştirip, raporlama ve düzenleyici uyumda destek sağlıyoruz.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">Danışmanlık</h3>
            <p className="text-sm text-gray-600">Risk yönetimi politikaları, süreç tasarımı ve uygulama desteği.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">Analiz</h3>
            <p className="text-sm text-gray-600">Portföy ve kredi risk analizi, stres testleri.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">Raporlama</h3>
            <p className="text-sm text-gray-600">Düzenleyici raporlar, iç raporlama çözümleri.</p>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto p-6 text-sm text-gray-600">© {new Date().getFullYear()} RiskAnaliz</div>
      </footer>
    </div>
  )
}
