import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import SubscriptionStatusBadge from '@/components/SubscriptionStatusBadge'
import { Button } from '@/components/ui/Button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/api/auth/signin')
  }
  const subscription = await prisma.subscription.findFirst({ where: { userId: session.user.id } })
  const isActive = subscription?.status === 'active'
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Signed in as <b>{session?.user?.email}</b></p>

      <div className="mt-4">
        <SubscriptionStatusBadge status={subscription?.status ?? 'none'} />
      </div>

      <div className="mt-6 flex gap-3">
        {isActive && (
          <form action="/api/stripe/portal" method="POST">
            <Button type="submit" variant="outline">Manage billing</Button>
          </form>
        )}
        <a href="/dashboard/pro">
          <Button>Pro feature</Button>
        </a>
      </div>
    </main>
  )
}
