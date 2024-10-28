import { Switch } from '@mantine/core'
import { type AppState, setAppState, useAppState } from '@demo/state/appState'
import type { PickByType } from '@demo/utils/types'

export interface StateSwitchProps {
  label: string
  stateProp: keyof PickByType<AppState, boolean>
}

export function StateSwitch({ label, stateProp }: StateSwitchProps) {
  const value = useAppState(state => state[stateProp])

  return (
    <Switch
      label={label}
      checked={value}
      onChange={e => setAppState({ [stateProp]: e.currentTarget.checked })}
    />
  )
}
