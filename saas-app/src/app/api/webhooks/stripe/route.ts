import { NextRequest, NextResponse } from 'next/server'
import { getStripeAdmin } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const stripe = getStripeAdmin()
  const sig = req.headers.get('stripe-signature')
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !whSecret) return NextResponse.json({ error: 'Missing signature/secret' }, { status: 400 })

  const raw = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret)
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${(err as Error).message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session
        const subscriptionId = typeof s.subscription === 'string' ? s.subscription : s.subscription?.id
        if (s.customer && typeof s.customer === 'string') {
          const customerId = s.customer
          const priceId = (s.line_items?.data?.[0]?.price?.id || s.metadata?.priceId) as string | undefined
          await prisma.subscription.updateMany({
            where: { stripeCustomerId: customerId },
            data: { stripeSubscriptionId: subscriptionId ?? null, status: 'active', priceId: priceId ?? null },
          })
        }
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: {
            status: sub.status,
            priceId: typeof sub.items.data[0]?.price?.id === 'string' ? sub.items.data[0].price.id : null,
            currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
          },
        })
        break
      }
      default:
        break
    }
  } catch (e) {
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
