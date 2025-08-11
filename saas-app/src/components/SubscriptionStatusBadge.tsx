import { Badge } from '@/components/ui/Badge'

type Props = { status?: string | null }

export default function SubscriptionStatusBadge({ status }: Props) {
  const normalized = (status ?? 'none').toLowerCase()
  const variant =
    normalized === 'active' ? 'success' :
    normalized === 'trialing' ? 'default' :
    normalized === 'incomplete' ? 'warning' :
    normalized === 'past_due' ? 'warning' :
    normalized === 'canceled' ? 'muted' :
    normalized === 'unpaid' ? 'danger' :
    'muted'

  return <Badge variant={variant as any}>{normalized}</Badge>
}