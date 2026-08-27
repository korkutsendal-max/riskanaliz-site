import Head from 'next/head'

export default function SEO({ title, description, url, image, keywords }) {
  const siteTitle = title || 'RiskAnaliz - Finansal Risk Yönetimi'
  const siteDescription = description || 'RiskAnaliz: Kurumsal finansal risk yönetimi, analiz ve düzenleyici uyum hizmetleri.'
  const siteUrl = url || 'https://riskanaliz.com.tr'
  const siteImage = image || `${siteUrl}/og-image.png`
  const siteKeywords = keywords || 'risk yönetimi, finansal analiz, stres testi, kredi riski, düzenleyici uyum'

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RiskAnaliz',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://www.linkedin.com/company/riskanaliz'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+90-212-000-0000',
        contactType: 'customer service',
        email: 'info@riskanaliz.com.tr'
      }
    ]
  }

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      <link rel="canonical" href={siteUrl} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* Preconnects & performance hints */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
    </Head>
  )
}
