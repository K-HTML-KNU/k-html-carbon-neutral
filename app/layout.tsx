import type { Metadata } from 'next'

import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'k-html carbon neutral',
  description: 'A carbon neutral website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ maxWidth: '640px', margin: '0 auto', width: '100%', boxSizing: 'content-box' }}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html >
  )
}
