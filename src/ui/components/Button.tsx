import type { ComponentProps } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-xs font-medium focus-visible:outline focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'default':
          'bg-[var(--figma-color-bg-brand)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-brand-hover)] focus-visible:outline-[var(--figma-color-bg-brand)] active:bg-[var(--figma-color-bg-brand-pressed)]',
        'danger':
          'bg-[var(--figma-color-bg-danger)] text-[var(--figma-color-text-ondanger)] hover:bg-[var(--figma-color-bg-danger-hover)] focus-visible:outline-[var(--figma-color-bg-danger)] active:bg-[var(--figma-color-bg-danger-pressed)]',
        'danger-secondary':
          'bg-[var(--figma-color-bg-danger-tertiary)]/80 text-[var(--figma-color-text-danger)] hover:bg-[var(--figma-color-bg-danger-hover)]/15 focus-visible:outline-[var(--figma-color-border-danger-strong)] active:bg-[var(--figma-color-bg-danger-pressed)]/15',
      },
      size: {
        default: 'h-8 px-3',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export const Button = ({
  className,
  variant,
  size,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
