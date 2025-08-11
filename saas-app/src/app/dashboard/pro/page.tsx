import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ProFeaturePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/api/auth/signin')

  const [user, sub] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    prisma.subscription.findFirst({ where: { userId: session.user.id } }),
  ])

  const isPro = user?.role === 'admin' || sub?.status === 'active'
  if (!isPro) redirect('/pricing')

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Pro-only feature</h1>
      <p className="mt-2">Welcome! You have access because you are subscribed or have an elevated role.</p>
    </main>
  )
}
