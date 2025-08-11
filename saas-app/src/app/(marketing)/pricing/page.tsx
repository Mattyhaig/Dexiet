import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import SubscriptionStatusBadge from '@/components/SubscriptionStatusBadge'

export default async function PricingPage() {
  const session = await getServerSession(authOptions)
  const sub = session?.user?.id
    ? await prisma.subscription.findFirst({ where: { userId: session.user.id } })
    : null

  const isActive = sub?.status === 'active'

  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="text-3xl font-bold">Pricing</h1>

      {session?.user?.id && (
        <div className="mt-4">
          <SubscriptionStatusBadge status={sub?.status ?? 'none'} />
        </div>
      )}

      <div className="mt-6 grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Basic</h2>
          <p className="mt-2 text-muted-foreground">All the essentials to get started.</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl font-bold">$9</span>
            <span className="text-sm opacity-70">/month</span>
          </div>

          {!session?.user?.id && (
            <a className="btn mt-6 inline-block" href="/api/auth/signin">Sign in to subscribe</a>
          )}

          {session?.user?.id && !isActive && (
            <form action="/api/stripe/checkout" method="POST" className="mt-6">
              <button className="btn" type="submit">Subscribe</button>
            </form>
          )}

          {session?.user?.id && isActive && (
            <form action="/api/stripe/portal" method="POST" className="mt-6">
              <button className="btn" type="submit">Manage billing</button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
