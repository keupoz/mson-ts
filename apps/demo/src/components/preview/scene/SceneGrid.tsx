import { Grid } from '@keupoz/r3f-utils'
import { useComputedColorScheme, useMantineTheme } from '@mantine/core'
import { useAppState } from '@demo/state/appState'

export function SceneGrid() {
  const showGrid = useAppState(state => state.showGrid)
  const colorScheme = useComputedColorScheme()
  const { colors } = useMantineTheme()
  const color = colorScheme === 'dark' ? colors.dark[5] : colors.gray[4]

  if (!showGrid) return null

  return <Grid color={color} />
}
