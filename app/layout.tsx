import type { Metadata } from 'next'

import AuthContext from '@/context/authContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'K-HTML-KNU',
  description: 'K-HTML-KNU next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  )
}
