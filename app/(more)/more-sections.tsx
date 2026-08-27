import Link from 'next/link'

export default function Page() {
  return (
    <div>
      {/* Hero is in app/page.tsx already; keep minimal here */}
      <main className="max-w-6xl mx-auto p-8">
        {/* How it works */}
        <section className="py-12">
          <h2 className="text-2xl font-semibold mb-6">Nasıl Çalışır?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-xl shadow">
              <h4 className="font-semibold">1. Başvuru</h4>
              <p className="text-sm text-gray-300 mt-2">Formu doldurun ve gerekli belgeleri yükleyin.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl shadow">
              <h4 className="font-semibold">2. Ön Değerlendirme</h4>
              <p className="text-sm text-gray-300 mt-2">Uzman ekibimiz belgelerinizi değerlendirir.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl shadow">
              <h4 className="font-semibold">3. Raporlama</h4>
              <p className="text-sm text-gray-300 mt-2">Analiz sonuçları ve öneriler tarafınıza iletilir.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-white/3 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Risk Analizi Başlatın</h3>
              <p className="text-gray-300 mt-2">Kurumsal ihtiyaçlarınıza özel analizlerle risklerinizi yönetin.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/apply" className="px-6 py-3 bg-cyan-500 text-navy rounded font-semibold">Başvuru Yap</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <h2 className="text-2xl font-semibold mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <details className="bg-white/5 p-4 rounded">
              <summary className="font-semibold">Hangi belgeleri yüklemeliyim?</summary>
              <p className="mt-2 text-sm text-gray-300">Finansal tablolar, kredi/portföy bilgileriniz ve varsa önceki raporlarınızı yükleyebilirsiniz.</p>
            </details>
            <details className="bg-white/5 p-4 rounded">
              <summary className="font-semibold">Başvuru sonrası ne kadar sürede dönüş sağlanır?</summary>
              <p className="mt-2 text-sm text-gray-300">Genelde 3-5 iş günü içinde ön değerlendirme ve iletişim sağlanır.</p>
            </details>
          </div>
        </section>
      </main>
    </div>
  )
}
