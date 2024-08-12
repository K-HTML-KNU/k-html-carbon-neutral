import type { Metadata } from 'next'

import './globals.css'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

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
      <body className="max-w-[640px] mx-auto my-0 w-[100%] box-content min-h-[100vh]">
        <Header />
        <main>
          {children}
        </main>
        <Navigation />
      </body>
    </html >
  )
}
