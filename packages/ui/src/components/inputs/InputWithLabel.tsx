import type { PropsWithChildren } from 'react'
import { ClipboardCopyIcon } from '@radix-ui/react-icons'
import { copy } from 'clipboard'
import clsx from 'clsx'
import { Label } from '@ui/shadcn/components/ui/label'

export interface InputWithLabelProps extends PropsWithChildren {
  label: string
  id: string
  valueToCopy?: string
  wideLabel?: boolean
}

export function InputWithLabel({
  label,
  id,
  valueToCopy,
  wideLabel,
  children,
}: InputWithLabelProps) {
  return (
    <div className="grid h-8 grid-cols-12 items-center gap-2">
      <div
        className={clsx(
          'flex grow gap-2',
          wideLabel ? 'col-span-10' : 'col-span-4',
        )}
      >
        <Label className="grow" htmlFor={id}>
          {label}
        </Label>

        <button
          type="button"
          className={clsx('opacity-50 hover:opacity-100', {
            hidden: !valueToCopy,
          })}
          title="Copy to clipboard"
          onClick={valueToCopy ? () => copy(valueToCopy) : undefined}
        >
          <ClipboardCopyIcon />
        </button>
      </div>

      {children}
    </div>
  )
}
