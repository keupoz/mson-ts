import type { PropsWithChildren } from 'react'
import { Tooltip as MantineTooltip } from '@mantine/core'

export interface TooltipProps extends PropsWithChildren {
  label: string
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <MantineTooltip
      label={label}
      withArrow
      arrowSize={8}
      zIndex={500}
    >
      {children}
    </MantineTooltip>
  )
}
