import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() ?? ''
  const minScore = Number(searchParams.get('minScore') ?? '0')
  const tld = searchParams.get('tld') ?? undefined
  const take = Math.min(Number(searchParams.get('take') ?? '50'), 200)

  const domains = await prisma.domain.findMany({
    where: {
      AND: [
        q ? { name: { contains: q } } : {},
        tld ? { tld } : {},
        { score: { gte: isNaN(minScore) ? 0 : minScore } },
      ],
    },
    orderBy: { score: 'desc' },
    take,
  })

  return NextResponse.json({ domains })
}
