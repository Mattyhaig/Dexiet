import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getStripeAdmin } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const priceId = process.env.STRIPE_PRICE_ID_BASIC
  if (!priceId) {
    return NextResponse.json({ error: 'Server not configured: STRIPE_PRICE_ID_BASIC' }, { status: 500 })
  }

  const url = new URL(req.nextUrl)
  const base = `${url.protocol}//${url.host}`

  const stripe = getStripeAdmin()

  let sub = await prisma.subscription.findFirst({ where: { userId: session.user.id } })

  let customerId = sub?.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({ email: session.user.email ?? undefined })
    customerId = customer.id
    sub = await prisma.subscription.create({
      data: { userId: session.user.id, stripeCustomerId: customerId, status: 'incomplete' },
    })
  }

  const checkout = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${base}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/pricing`,
    metadata: { userId: session.user.id },
  })

  return NextResponse.redirect(checkout.url!, { status: 303 })
}
