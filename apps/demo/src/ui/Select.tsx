import { Select as MantineSelect, type SelectProps } from '@mantine/core'
import { forwardRef } from 'react'

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  return (
    <MantineSelect
      ref={ref}
      searchable
      nothingFoundMessage="Nothing found"
      placeholder="Pick value"
      {...props}
    />
  )
})
