import Link from 'next/link'

export default function About() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hakkımızda</h1>
      <p className="text-gray-700">RiskAnaliz, finansal risk yönetimi ve düzenleyici uyum alanında uzman bir danışmanlık firmasıdır. Deneyimli ekibimiz ile kurumlara özelleştirilmiş çözümler sunuyoruz.</p>
      <p className="mt-4">Daha fazla bilgi için <Link href="/contact" className="text-blue-600">iletişim</Link> sayfamızdan bize ulaşabilirsiniz.</p>
    </main>
  )
}
