import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendAlertEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const header = req.headers.get('x-cron-secret')
  if (!secret || header !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const topDomains = await prisma.domain.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { score: 'desc' },
    take: 50,
  })

  // Find pro users (active subscriptions or admins)
  const admins = await prisma.user.findMany({ where: { role: 'admin' } })
  const activeSubs = await prisma.subscription.findMany({ where: { status: 'active' } })
  const userIds = new Set<string>([...admins.map(u => u.id), ...activeSubs.map(s => s.userId)])
  const users = await prisma.user.findMany({ where: { id: { in: Array.from(userIds) } } })

  const recipients = users.filter(u => !!u.email).map(u => u.email!)
  for (const email of recipients) {
    await sendAlertEmail(email, topDomains.map(d => ({ name: d.name, score: d.score })))
  }

  return NextResponse.json({ sent: recipients.length, domains: topDomains.length })
}
