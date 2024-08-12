import type { Metadata } from 'next'
import './globals.css'

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
      <body style={{ maxWidth: '640px', margin: '0 auto' }}>{children}</body>
    </html>
  )
}
