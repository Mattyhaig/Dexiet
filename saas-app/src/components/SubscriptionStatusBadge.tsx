type Props = { status?: string | null }

export default function SubscriptionStatusBadge({ status }: Props) {
  const normalized = (status ?? 'none').toLowerCase()
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-800 border-green-200',
    trialing: 'bg-blue-100 text-blue-800 border-blue-200',
    incomplete: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    past_due: 'bg-orange-100 text-orange-900 border-orange-200',
    canceled: 'bg-gray-100 text-gray-800 border-gray-200',
    unpaid: 'bg-red-100 text-red-800 border-red-200',
    none: 'bg-gray-100 text-gray-800 border-gray-200',
  }
  const cls = styles[normalized] ?? styles.none
  return (
    <span className={`inline-flex items-center gap-2 rounded border px-3 py-1 text-sm ${cls}`}>
      {normalized}
    </span>
  )
}