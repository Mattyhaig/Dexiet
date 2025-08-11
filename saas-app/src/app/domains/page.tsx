import { Suspense } from 'react'
import DomainsSearch from './search'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { isUserPro } from '@/lib/subscription'

export default async function DomainsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/api/auth/signin')
  const allowed = await isUserPro(session.user.id)
  if (!allowed) redirect('/pricing')

  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold">Expired Domains</h1>
      <p className="mt-2 text-gray-600">AI-enhanced search for expired domain names. Filter by score, TLD, and more.</p>
      <Suspense>
        <DomainsSearch />
      </Suspense>
    </main>
  )
}
