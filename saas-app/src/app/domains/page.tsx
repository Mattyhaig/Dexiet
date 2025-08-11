import { Suspense } from 'react'
import DomainsSearch from './search'

export default function DomainsPage() {
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
