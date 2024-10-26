import { useComputedColorScheme, useMantineTheme } from '@mantine/core'
import { Grid } from '@react-three/drei'
import { DoubleSide } from 'three'
import { useAppState } from '@demo/state/appState'

export function SceneGrid() {
  const showGrid = useAppState(state => state.showGrid)
  const colorScheme = useComputedColorScheme()
  const { colors } = useMantineTheme()
  const dividerColor = colorScheme === 'dark' ? colors.dark[2] : colors.gray[2]

  return (
    <Grid
      visible={showGrid}
      args={[10, 10]}
      cellSize={1}
      cellThickness={1}
      cellColor={dividerColor}
      sectionSize={10}
      sectionThickness={1.5}
      sectionColor={dividerColor}
      fadeDistance={256}
      infiniteGrid
      side={DoubleSide}
      position-y={-0.1}
      renderOrder={-1}
    />
  )
}
