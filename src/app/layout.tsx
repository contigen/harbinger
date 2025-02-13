import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next'
import { Provider } from './provider'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harbinger',
  description: 'AI-Powered Device Fortune Teller',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
