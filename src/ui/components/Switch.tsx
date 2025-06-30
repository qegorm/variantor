import type { ChangeEvent } from 'react'
import { cn } from '@/utils.ts'

export interface SwitchProps {
  checked?: boolean
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Switch = ({ checked, className, ...props }: SwitchProps) => {
  return (
    <label className="relative">
      <input
        type="checkbox"
        checked={checked}
        className={cn(
          'peer relative h-5 w-8 cursor-pointer appearance-none rounded-full border border-[var(--figma-color-border)] bg-[var(--figma-color-bg-tertiary)] transition-colors outline-none checked:bg-[var(--figma-color-bg-brand)] focus-visible:ring-1 focus-visible:ring-[var(--figma-color-bg-brand)]',
          className,
        )}
        {...props}
      />
      <span
        className={cn(
          'absolute top-1 left-1 h-3 w-3 rounded-full bg-white transition-transform peer-checked:transform-[translateX(12px)]',
        )}
      />
    </label>
  )
}
