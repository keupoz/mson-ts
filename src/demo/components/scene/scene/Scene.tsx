import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { LinearSRGBColorSpace, NoToneMapping } from 'three';

import { FixedRaycaster } from '../../../utils/FixedRaycaster';
import { HighlightInfo } from '../../HighlightInfo';
import { SceneControls } from './SceneControls';
import { SceneGrid } from './SceneGrid';
import { SceneLight } from './SceneLight';
import { SceneModels } from './SceneModels';

export function Scene() {
  return (
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
  );
}
