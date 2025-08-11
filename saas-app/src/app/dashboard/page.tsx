import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/api/auth/signin')
  }
  const subscription = await prisma.subscription.findFirst({ where: { userId: session.user.id } })
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Signed in as <b>{session?.user?.email}</b></p>
      <div className="mt-6">
        <p>Subscription status: <b>{subscription?.status ?? 'none'}</b></p>
      </div>
    </main>
  )
}
