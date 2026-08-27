import './globals.css'
import { ReactNode } from 'react'
import SEO from '../components/SEO'

export const metadata = {
  title: 'RiskAnaliz Pro',
  description: 'Kurumsal finansal risk yönetimi ve analiz hizmetleri',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <SEO />
        {children}
      </body>
    </html>
  )
}
