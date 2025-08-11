import { prisma } from '@/lib/prisma'

type RawDomain = { name: string; tld?: string; score?: number; backlinks?: number; traffic?: number; listedAt?: string | Date; data?: any }

export async function upsertDomains(raw: RawDomain[]) {
  for (const d of raw) {
    await prisma.domain.upsert({
      where: { name: d.name },
      update: {
        tld: d.tld,
        length: d.name.length,
        score: d.score ?? 0,
        backlinks: d.backlinks,
        traffic: d.traffic,
        listedAt: d.listedAt ? new Date(d.listedAt) : undefined,
        data: d.data ?? undefined,
      },
      create: {
        name: d.name,
        tld: d.tld,
        length: d.name.length,
        score: d.score ?? 0,
        backlinks: d.backlinks,
        traffic: d.traffic,
        listedAt: d.listedAt ? new Date(d.listedAt) : undefined,
        data: d.data ?? undefined,
      },
    })
  }
}

export async function mockScrape(): Promise<RawDomain[]> {
  const now = new Date().toISOString()
  return [
    { name: 'example-expired.com', tld: 'com', score: 72.3, backlinks: 123, traffic: 540, listedAt: now },
    { name: 'ai-specialist.net', tld: 'net', score: 66.5, backlinks: 88, traffic: 210, listedAt: now },
  ]
}
