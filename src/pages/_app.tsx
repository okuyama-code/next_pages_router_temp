import "@/styles/globals.css";
import { UIProvider, createColorModeManager } from "@yamada-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { cookies } = pageProps
  const colorModeManager = createColorModeManager("ssr", cookies)

  return (
    <UIProvider colorModeManager={colorModeManager}>
      <Component {...pageProps} />
    </UIProvider>
  )
}
