import { NextRequest, NextResponse } from 'next/server'
import { mockScrape, upsertDomains } from '@/lib/scraper'
import { prisma } from '@/lib/prisma'
import { analyzeDomains } from '@/lib/scraper/analyzer'
import { sendAlertEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const header = req.headers.get('x-cron-secret')
  if (!secret || header !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const raw = await mockScrape()
  const analyzed = analyzeDomains(raw)
  await upsertDomains(analyzed)

  const since = new Date(Date.now() - 60 * 60 * 1000)
  const activeAlerts = await prisma.alert.findMany({ where: { isActive: true } })
  for (const alert of activeAlerts) {
    const user = await prisma.user.findUnique({ where: { id: alert.userId } })
    if (!user?.email) continue

    const domains = await prisma.domain.findMany({
      where: {
        createdAt: { gte: since },
        AND: [
          alert.query ? { name: { contains: alert.query } } : {},
          alert.tld ? { tld: alert.tld } : {},
          alert.minScore != null ? { score: { gte: alert.minScore } } : {},
        ],
      },
      orderBy: { score: 'desc' },
      take: 20,
    })

    if (domains.length > 0) {
      await sendAlertEmail(user.email, domains)
    }
  }

  return NextResponse.json({ inserted: raw.length })
}
