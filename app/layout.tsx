import type { Metadata } from 'next'

import AuthContext from '@/context/authContext'
import './globals.css'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

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
      <body className="max-w-[640px] mx-auto my-0 w-[100%] box-content min-h-[100vh]">
        <Header />
        <main className="px-[16px] py-[16px] mt-[12px] border border-red-600">
          <AuthContext>{children}</AuthContext>
        </main>
        <Navigation />
      </body>
    </html>
  )
}
