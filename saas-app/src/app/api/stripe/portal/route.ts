import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getStripeAdmin } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sub = await prisma.subscription.findFirst({ where: { userId: session.user.id } })
  if (!sub?.stripeCustomerId) return NextResponse.json({ error: 'No subscription' }, { status: 400 })

  const url = new URL(req.nextUrl)
  const base = `${url.protocol}//${url.host}`

  const stripe = getStripeAdmin()
  const portal = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${base}/dashboard`,
  })

  return NextResponse.redirect(portal.url, { status: 303 })
}
