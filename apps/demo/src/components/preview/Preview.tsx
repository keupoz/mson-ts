import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LinearSRGBColorSpace, NoToneMapping } from 'three'
import { FixedRaycaster } from '@demo/utils/FixedRaycaster'
import { ErrorDisplay } from '@repo/ui'
import { HighlightInfo } from '../HighlightInfo'
import { SceneControls } from './scene/SceneControls'
import { SceneGrid } from './scene/SceneGrid'
import { SceneLight } from './scene/SceneLight'
import { SceneModels } from './scene/SceneModels'

function Loader() {
  return <div className="p-3">Loading ...</div>
}

export function Preview() {
  return (
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <Suspense fallback={<Loader />}>
        <div className="relative h-full">
          <HighlightInfo />

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
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
