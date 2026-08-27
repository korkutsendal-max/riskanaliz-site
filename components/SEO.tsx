import Head from 'next/head'

export default function SEO({ title, description }: { title?: string, description?: string }) {
  const siteTitle = title || 'RiskAnaliz Pro'
  const siteDescription = description || 'Kurumsal finansal risk yönetimi ve analiz hizmetleri.'
  const siteUrl = 'https://riskanaliz.com.tr'

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
