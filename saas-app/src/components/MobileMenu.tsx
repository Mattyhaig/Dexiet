'use client'
import { useState } from 'react'
import Link from 'next/link'
import { getButtonClasses } from '@/components/ui/Button'

export default function MobileMenu({ isAuthed }: { isAuthed: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sm:hidden">
      <button className={getButtonClasses({ variant: 'ghost', size: 'sm' })} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">Menu</button>
      {open && (
        <div className="mt-2 flex flex-col gap-2 border p-3">
          <Link href="/domains" onClick={() => setOpen(false)}>Domains</Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          {isAuthed && <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
        </div>
      )}
    </div>
  )
}
