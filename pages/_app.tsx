import React from "react"

import { ColorMode, NativeBaseProvider, StorageManager } from "native-base"
import type { AppProps } from "next/app"
import { SWRConfig } from "swr"

import "../styles/globals.css"

const colorModeManager: StorageManager = {
  get: async () => {
    const val = localStorage.getItem("@color-mode")
    return val === "dark" ? "dark" : "light"
  },
  set: async (value: ColorMode) => {
    const strValue = value ? value.toString() : ""
    localStorage.setItem("@color-mode", strValue)
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NativeBaseProvider
      isSSR
      colorModeManager={colorModeManager}
    >
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </NativeBaseProvider>
  )
}

export default MyApp
