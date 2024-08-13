import type { Metadata } from 'next'

import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import { Toaster } from '@/components/ui/toaster'
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
      <body className="max-w-[640px] mx-auto my-0 w-[100%] box-content min-h-[100vh] flex flex-col ">
        <Header />
        <main className="px-[16px] py-[16px] my-[12px] border border-red-600 flex-1">
          <AuthContext>{children}</AuthContext>
          <Toaster />
        </main>
        <Navigation />
      </body>
    </html>
  )
}
