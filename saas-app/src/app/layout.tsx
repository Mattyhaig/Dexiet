import '../styles/globals.css'
import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Dexiet — Domain Name Specialists',
  description: 'AI-enhanced expired domain searcher and analyzer for professionals.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
