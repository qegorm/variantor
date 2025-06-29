import {
  FocusEvent,
  ChangeEvent,
  ComponentProps,
  useEffect,
  useState,
} from 'react'
import { cn } from '@/utils'

const isValidNumericInput = (value: string) => {
  return /^\d*(?:[.,]\d*)?$/.test(value)
}

export const Input = ({
  className,
  type,
  value,
  numeric,
  onChange,
  onBlur,
  ...props
}: ComponentProps<'input'> & { numeric?: boolean }) => {
  const [internalValue, setInternalValue] = useState(
    numeric ? value?.toString() || '' : '',
  )

  useEffect(() => {
    if (numeric) {
      setInternalValue(value?.toString() || '')
    }
  }, [value, numeric])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (numeric && !isValidNumericInput(newValue)) return

    setInternalValue(newValue)
    onChange?.(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (numeric) {
      if (
        internalValue === '' ||
        internalValue === ',' ||
        internalValue === '.'
      ) {
        setInternalValue('0')
        onChange?.({
          ...e,
          target: {
            ...e.target,
            value: 0,
          },
        } as unknown as ChangeEvent<HTMLInputElement>)
      } else {
        setInternalValue(internalValue.replace(',', '.'))
      }
    }
    onBlur?.(e)
  }

  return (
    <div className="relative flex h-8 items-center rounded-md border border-[var(--figma-color-border)] text-xs focus-within:border-[var(--figma-color-border-selected)]">
      <input
        type={type}
        value={numeric ? internalValue : value}
        className={cn(
          'h-full w-full px-2 outline-none',
          type === 'color' &&
            'absolute inset-0 h-full w-full appearance-none opacity-0',
          className,
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={numeric ? 4 : undefined}
        {...props}
      />
      {type === 'color' && (
        <div className="flex gap-2 px-2">
          <div
            className="h-4 w-4 rounded border border-[var(--figma-color-border)]"
            style={{
              background: typeof value === 'string' ? value : undefined,
            }}
          />
          <p>{value}</p>
        </div>
      )}
    </div>
  )
}
