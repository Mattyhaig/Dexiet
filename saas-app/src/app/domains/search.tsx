import 'server-only'
import { Button } from '@/components/ui/Button'

async function fetchDomains(params: { q?: string; minScore?: number; tld?: string }) {
  const url = new URL('/api/domains/search', 'http://localhost:3000')
  if (params.q) url.searchParams.set('q', params.q)
  if (params.minScore != null) url.searchParams.set('minScore', String(params.minScore))
  if (params.tld) url.searchParams.set('tld', params.tld)
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to search')
  return res.json() as Promise<{ domains: Array<{ name: string; tld: string | null; score: number; backlinks: number | null; traffic: number | null }> }>
}

export default async function DomainsSearch() {
  const { domains } = await fetchDomains({})
  return (
    <section className="mt-6">
      <form action="/domains" method="GET" className="flex flex-wrap gap-3">
        <input name="q" placeholder="Search domains" className="h-10 rounded border px-3" />
        <input name="minScore" placeholder="Min score" type="number" className="h-10 w-32 rounded border px-3" />
        <input name="tld" placeholder="TLD (e.g., com)" className="h-10 w-40 rounded border px-3" />
        <Button type="submit">Search</Button>
      </form>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((d) => (
          <a key={d.name} href={`https://www.${d.name}`} target="_blank" className="block rounded border p-4 hover:shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium">{d.name}</span>
              <span className="text-xs text-gray-600">{d.tld ?? ''}</span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-700">
              <span>Score: <b>{d.score}</b></span>
              {d.backlinks != null && <span>Backlinks: <b>{d.backlinks}</b></span>}
              {d.traffic != null && <span>Traffic: <b>{d.traffic}</b></span>}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
