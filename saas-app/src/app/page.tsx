import Link from 'next/link'
import { getButtonClasses } from '@/components/ui/Button'

export default function Page(){
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">SaaS Starter</h1>
      <div className="mt-4 flex gap-3">
        <Link href="/pricing" className={getButtonClasses()}>Pricing</Link>
        <Link href="/api/auth/signin" className={getButtonClasses()}>Sign in</Link>
        <Link href="/api/auth/signout" className={getButtonClasses({ variant: 'outline' })}>Sign out</Link>
        <Link href="/dashboard" className={getButtonClasses({ variant: 'ghost' })}>Dashboard</Link>
      </div>
    </main>
  )
}
