'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 'light')

  useEffect(() => {
    try {
      const saved = (localStorage.getItem('theme') as 'light' | 'dark' | null)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial = saved ?? (prefersDark ? 'dark' : 'light')
      setTheme(initial)
      applyTheme(initial)
    } catch {}
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch {}
    applyTheme(next)
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  )
}