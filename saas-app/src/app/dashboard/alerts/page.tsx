import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/Button'

export default async function AlertsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/api/auth/signin')

  const alerts = await prisma.alert.findMany({ where: { userId: session.user.id } })

  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold">Alerts</h1>
      <form action="/api/alerts" method="POST" className="mt-4 flex flex-wrap gap-3">
        <input name="query" placeholder="contains…" className="h-10 rounded border px-3" />
        <input name="minScore" placeholder="min score" type="number" className="h-10 w-32 rounded border px-3" />
        <input name="tld" placeholder="tld (com)" className="h-10 w-32 rounded border px-3" />
        <Button type="submit">Add alert</Button>
      </form>

      <ul className="mt-6 space-y-2">
        {alerts.map((a) => (
          <li key={a.id} className="flex items-center justify-between rounded border p-3">
            <span>{a.query ?? 'Any'} — score ≥ {a.minScore ?? 0} {a.tld ? `— .${a.tld}` : ''}</span>
            <form action={`/api/alerts?id=${a.id}`} method="POST">
              <input type="hidden" name="_method" value="DELETE" />
              <Button type="submit" variant="outline">Delete</Button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  )
}
