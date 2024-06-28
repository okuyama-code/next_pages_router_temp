import '@/styles/globals.css'
import { UIProvider, createColorModeManager } from '@yamada-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { session, ...pageProps} }: AppProps) {
  const { cookies } = pageProps
  const colorModeManager = createColorModeManager('ssr', cookies)

  return (
    <SessionProvider session={session}>
      <UIProvider colorModeManager={colorModeManager}>
        <Component {...pageProps} />
      </UIProvider>
    </SessionProvider>

  )
}
