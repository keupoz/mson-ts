import { Grid } from '@react-three/drei';
import { DoubleSide } from 'three';
import { useAppState } from '@demo/state/appState';
import { useTheme } from '@repo/ui';

export function SceneGrid() {
  const showGrid = useAppState(state => state.showGrid);
  const { isDark } = useTheme();
  const dividerColor = isDark ? 0x52525B : 0xE4E4E7;

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
  );
}
