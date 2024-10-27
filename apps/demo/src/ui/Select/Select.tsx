import { Select as MantineSelect, type SelectProps, Text } from '@mantine/core'
import { forwardRef, memo } from 'react'
import classes from './Select.module.scss'

const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
  <Text span lineClamp={2} inherit title={option.label}>
    {option.label}
  </Text>
)

export const Select = memo(forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  return (
    <MantineSelect
      ref={ref}
      classNames={classes}
      searchable
      nothingFoundMessage="Nothing found"
      placeholder="Pick value"
      renderOption={renderSelectOption}
      {...props}
    />
  )
}))
