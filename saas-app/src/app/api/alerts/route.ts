import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const methodOverride = url.searchParams.get('_method') ?? (await req.formData().then(fd => fd.get('_method') as string | null))
  if (methodOverride === 'DELETE') {
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    await prisma.alert.delete({ where: { id } })
    return NextResponse.redirect(new URL('/dashboard/alerts', url), 303)
  }

  const fd = await req.formData()
  const query = (fd.get('query') as string | null) || undefined
  const minScore = fd.get('minScore') ? Number(fd.get('minScore')) : undefined
  const tld = (fd.get('tld') as string | null) || undefined

  await prisma.alert.create({ data: { userId: session.user.id, query, minScore, tld } })
  return NextResponse.redirect(new URL('/dashboard/alerts', url), 303)
}
