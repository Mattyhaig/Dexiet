import { NextResponse } from 'next/server'
import { mockScrape, upsertDomains } from '@/lib/scraper'

// In production, secure with a CRON secret header
export async function POST() {
  const data = await mockScrape()
  await upsertDomains(data)
  return NextResponse.json({ inserted: data.length })
}
