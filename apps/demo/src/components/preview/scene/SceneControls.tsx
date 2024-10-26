import { CameraControls } from '@react-three/drei'
import { useAppState } from '@demo/state/appState'

export function SceneControls() {
  const smoothCamera = useAppState(state => state.smoothCamera)

  return (
    <CameraControls
      makeDefault
      minDistance={1}
      draggingSmoothTime={smoothCamera ? 0.0625 : 0}
    />
  )
}
