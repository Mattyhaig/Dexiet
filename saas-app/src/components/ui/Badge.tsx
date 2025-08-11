import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'muted'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-900 border-yellow-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
  muted: 'bg-gray-100 text-gray-800 border-gray-200',
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  const variant = (props as any).variant as BadgeVariant | undefined
  const classes = clsx('inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium', variantClasses[variant ?? 'default'], className)
  const { variant: _variant, ...rest } = props as any
  return <span className={classes} {...rest} />
}