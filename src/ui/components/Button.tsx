import type { ComponentProps } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus:outline focus:outline-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'default':
          'bg-[var(--figma-color-bg-brand)] text-[var(--figma-color-text-onbrand)] outline-[var(--figma-color-bg-brand)] hover:bg-[var(--figma-color-bg-brand-hover)] active:bg-[var(--figma-color-bg-brand-pressed)]',
        'danger-outline':
          'border border-[var(--figma-color-border-danger)] text-[var(--figma-color-text-danger)] outline-[var(--figma-color-border-danger)]',
        'danger':
          'bg-[var(--figma-color-bg-danger)] text-[var(--figma-color-text-ondanger)] outline-[var(--figma-color-bg-danger)] hover:bg-[var(--figma-color-bg-danger-hover)] active:bg-[var(--figma-color-bg-danger-pressed)]',
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
