import Link from 'next/link'
import Navbar from '../components/ui/Navbar'

export default function Page() {
  return (
    <div>
      <Navbar />

      <main className="max-w-6xl mx-auto p-8">
        <section className="py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight text-white">RiskAnaliz Pro — Finansal Risk Yönetiminde Güven</h1>
              <p className="mt-4 text-gray-200">Kurumsal ölçekli finansal analiz, uyum ve risk yönetimi çözümleri. Strateji, raporlama ve teknolojik entegrasyon ile kurumunuzu güçlendirin.</p>

              <div className="mt-6 flex gap-4">
                <Link href="/apply" className="px-5 py-3 bg-cyan-500 text-navy font-semibold rounded-lg shadow-lg">Risk Analizi Başlat</Link>
                <Link href="/services" className="px-5 py-3 bg-transparent border border-gray-700 rounded-lg">Hizmetlerimiz</Link>
              </div>
            </div>
            <div>
              <div className="bg-white/5 p-8 rounded-xl backdrop-blur-md shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Hızlı Başvuru</h3>
                <p className="text-sm text-gray-300">Başvuru formumuzu kullanarak hızlıca bize ulaşın. Belgelerinizi yükleyin, size geri dönüş sağlayalım.</p>
                <div className="mt-4">
                  <Link href="/apply" className="block px-4 py-2 bg-cyan-600 text-white rounded">Başvuru Yap</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-12">
          <h2 className="text-2xl font-semibold mb-6">Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-xl shadow">
              <h4 className="font-semibold">Danışmanlık</h4>
              <p className="text-sm text-gray-300 mt-2">Risk yönetimi politikaları ve süreç tasarımı.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl shadow">
              <h4 className="font-semibold">Analiz</h4>
              <p className="text-sm text-gray-300 mt-2">Portföy, kredi ve piyasa riski analizi.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl shadow">
              <h4 className="font-semibold">Raporlama</h4>
              <p className="text-sm text-gray-300 mt-2">Düzenleyici ve iç raporlama çözümleri.</p>
            </div>
          </div>
        </section>

      </main>

    </div>
  )
}
