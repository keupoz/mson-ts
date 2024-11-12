import { CameraControls, Canvas } from '@keupoz/r3f-utils'
import { LoadingOverlay } from '@mantine/core'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorDisplay } from '@demo/components/ErrorAlert'
import { SceneGrid } from './scene/SceneGrid'
import { SceneLight } from './scene/SceneLight'
import { SceneModels } from './scene/SceneModels'

export function Preview() {
  return (
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <Suspense fallback={<LoadingOverlay visible />}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[32, 8, 32]} />
          <CameraControls makeDefault minDistance={1} draggingSmoothTime={0} />

          <SceneLight />
          <SceneGrid />

          <SceneModels />
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  )
}
