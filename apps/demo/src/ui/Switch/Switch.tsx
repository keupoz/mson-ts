import { Switch as MantineSwitch, type SwitchProps } from '@mantine/core'
import { forwardRef } from 'react'
import classes from './Switch.module.scss'

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  return <MantineSwitch ref={ref} classNames={classes} labelPosition="left" {...props} />
})
