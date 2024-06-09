import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <link rel="stylesheet" href="https://use.typekit.net/llw7vki.css"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}