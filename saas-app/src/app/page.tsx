import Link from 'next/link'

export default function Page(){
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">SaaS Starter</h1>
      <div className="mt-4 flex gap-3">
        <Link href="/pricing" className="btn">Pricing</Link>
        <Link href="/api/auth/signin" className="btn">Sign in</Link>
        <Link href="/api/auth/signout" className="btn">Sign out</Link>
        <Link href="/dashboard" className="btn">Dashboard</Link>
      </div>
    </main>
  )
}
