import { LoadingOverlay } from '@mantine/core'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LinearSRGBColorSpace, NoToneMapping } from 'three'
import { ErrorDisplay } from '@demo/ui/ErrorAlert'
import { FixedRaycaster } from '@demo/utils/FixedRaycaster'
import { SceneControls } from './scene/SceneControls'
import { SceneGrid } from './scene/SceneGrid'
import { SceneLight } from './scene/SceneLight'
import { SceneModels } from './scene/SceneModels'

export function Preview() {
  return (
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <Suspense fallback={<LoadingOverlay visible />}>
        <Canvas
          frameloop="demand"
          raycaster={FixedRaycaster}
          gl={{
            toneMapping: NoToneMapping,
            outputColorSpace: LinearSRGBColorSpace,
          }}
        >
          <PerspectiveCamera makeDefault position={[32, 8, 32]} />

          <SceneControls />
          <SceneLight />
          <SceneGrid />

          <SceneModels />
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  )
}
