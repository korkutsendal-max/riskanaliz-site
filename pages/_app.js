import '../styles/globals.css'
import Head from 'next/head'
import SEO from '../components/SEO'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEO />
      <Component {...pageProps} />
    </>
  )
}
