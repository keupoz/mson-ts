import { useAppState } from '@demo/state/appState'
import { CameraControls } from '../CameraControls'

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
