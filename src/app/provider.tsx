'use client'

import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: '2lWnkVtmuxLRKn5RkVx8',
        region: 'eu',
      }}
    >
      {children}
    </FpjsProvider>
  )
}
