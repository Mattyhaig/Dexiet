import '../styles/globals.css'
import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4">
          {children}
        </div>
      </body>
    </html>
  )
}
