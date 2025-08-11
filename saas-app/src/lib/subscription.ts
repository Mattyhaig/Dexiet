import { prisma } from '@/lib/prisma'

export async function isUserPro(userId: string): Promise<boolean> {
  const [user, sub] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.subscription.findFirst({ where: { userId } }),
  ])
  if (user?.role === 'admin') return true
  return sub?.status === 'active'
}
