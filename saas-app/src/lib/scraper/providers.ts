import { analyzeDomains } from '@/lib/scraper/analyzer'

export type RawDomain = { name: string; tld?: string; score?: number; backlinks?: number; traffic?: number; listedAt?: string | Date; data?: any }

async function fetchExpiredDomainsCsv(): Promise<RawDomain[]> {
  const url = process.env.EXPIRED_DOMAINS_URL
  if (!url) return []
  const res = await fetch(url)
  if (!res.ok) return []
  const text = await res.text()
  // naive CSV: name,tld,score,backlinks,traffic
  const rows = text.trim().split(/\r?\n/).slice(1)
  const out: RawDomain[] = []
  for (const r of rows) {
    const [name, tld, score, backlinks, traffic] = r.split(',')
    if (!name) continue
    out.push({ name, tld, score: Number(score) || undefined, backlinks: Number(backlinks) || undefined, traffic: Number(traffic) || undefined })
  }
  return analyzeDomains(out)
}

export async function loadSources(): Promise<RawDomain[]> {
  const sources = (process.env.DEXIET_SOURCES ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  let all: RawDomain[] = []
  for (const s of sources) {
    if (s === 'expiredDomains') {
      all = all.concat(await fetchExpiredDomainsCsv())
    }
  }
  return all
}
