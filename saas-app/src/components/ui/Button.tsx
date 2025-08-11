import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'default' | 'outline' | 'destructive' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-12 px-6',
}

export function getButtonClasses(options?: { variant?: ButtonVariant; size?: ButtonSize; className?: string }) {
  const variant = options?.variant ?? 'default'
  const size = options?.size ?? 'md'
  return clsx(baseClasses, variantClasses[variant], sizeClasses[size], options?.className)
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  return <button className={getButtonClasses({ variant, size, className })} {...props} />
}