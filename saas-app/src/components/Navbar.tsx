import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getButtonClasses } from '@/components/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold">SaaS</Link>
          <nav className="hidden gap-3 sm:flex">
            <Link href="/pricing" className="text-sm text-gray-700 hover:text-gray-900">Pricing</Link>
            {session?.user?.id && (
              <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900">Dashboard</Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!session?.user?.id ? (
            <Link href="/api/auth/signin" className={getButtonClasses({ variant: 'outline', size: 'sm' })}>Sign in</Link>
          ) : (
            <form action="/api/auth/signout" method="POST">
              <button className={getButtonClasses({ variant: 'outline', size: 'sm' })} type="submit">Sign out</button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}