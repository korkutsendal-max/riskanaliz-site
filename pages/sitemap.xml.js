// Dynamic sitemap.xml generator for Next.js

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://riskanaliz.com.tr'
  const staticPages = ['', 'about', 'services', 'contact', 'apply']

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((page) => {
        const path = page === '' ? '' : `/${page}`
        return `<url>
          <loc>${baseUrl}${path}</loc>
          <changefreq>weekly</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>`
      })
      .join('\n')}
  </urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default function Sitemap() {
  // getServerSideProps will handle the response
  return null
}
