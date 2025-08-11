import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import SubscriptionStatusBadge from '@/components/SubscriptionStatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

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
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">All the essentials to get started.</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-bold">$9</span>
              <span className="text-sm opacity-70">/month</span>
            </div>

            {!session?.user?.id && (
              <a href="/api/auth/signin" className="mt-6 inline-block">
                <Button>Sign in to subscribe</Button>
              </a>
            )}

            {session?.user?.id && !isActive && (
              <form action="/api/stripe/checkout" method="POST" className="mt-6">
                <Button type="submit">Subscribe</Button>
              </form>
            )}

            {session?.user?.id && isActive && (
              <form action="/api/stripe/portal" method="POST" className="mt-6">
                <Button type="submit" variant="outline">Manage billing</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
