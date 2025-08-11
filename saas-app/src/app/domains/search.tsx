import 'server-only'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

export default async function DomainsSearch({ q, minScore, tld }: { q?: string; minScore?: number; tld?: string } = {}) {
  const domains = await prisma.domain.findMany({
    where: {
      AND: [
        q ? { name: { contains: q } } : {},
        tld ? { tld } : {},
        minScore != null ? { score: { gte: minScore } } : {},
      ],
    },
    orderBy: { score: 'desc' },
    take: 60,
  })

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
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span>Score: <b>{d.score.toFixed(1)}</b></span>
              {d.backlinks != null && <span>Backlinks: <b>{d.backlinks}</b></span>}
              {d.traffic != null && <span>Traffic: <b>{d.traffic}</b></span>}
            </div>
            {typeof d.data === 'object' && d.data && (d.data as any).aiSummary && (
              <p className="mt-2 text-sm text-gray-600">{(d.data as any).aiSummary}</p>
            )}
          </a>
        ))}
      </div>
    </section>
  )
}
