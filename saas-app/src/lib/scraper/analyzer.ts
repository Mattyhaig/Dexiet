import type { Prisma } from '@prisma/client'

type RawDomain = { name: string; tld?: string; score?: number; backlinks?: number; traffic?: number; listedAt?: string | Date; data?: any }

export function analyzeDomains(raw: RawDomain[]): RawDomain[] {
  return raw.map((d) => {
    const score = (d.score ?? 0) + (d.backlinks ?? 0) * 0.05 + (d.traffic ?? 0) * 0.02
    const aiSummary = `Potentially valuable domain in ${d.tld ?? 'various'} niche. Estimated score ${score.toFixed(1)} based on backlinks and traffic.`
    return { ...d, score, data: { ...(d.data ?? {}), aiSummary } }
  })
}
