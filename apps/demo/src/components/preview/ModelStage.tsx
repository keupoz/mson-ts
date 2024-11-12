import type { OnCenterCallbackProps } from '@react-three/drei'
import type { PropsWithChildren } from 'react'
import type { Mesh } from 'three'
import { FocusControls, setFocus } from '@keupoz/r3f-utils'
import { Center, ContactShadows } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { useState } from 'react'
import { setAppState } from '@demo/state/appState'

export function ModelStage({ children }: PropsWithChildren) {
  const controls = useThree(ctx => ctx.controls)
  const [radius, setRadius] = useState(0)

  function onHighlight(object: Mesh | null) {
    setAppState({ currentObject: object })
  }

  function onCentered(props: OnCenterCallbackProps) {
    if (controls instanceof CameraControls) {
      requestAnimationFrame(() => setFocus(controls, props.container))
    }

    setRadius(props.boundingSphere.radius)
  }

  return (
    <>
      <FocusControls resetToChildren onHighlight={onHighlight}>
        <Center top onCentered={onCentered}>
          {children}
        </Center>
      </FocusControls>

      <ContactShadows scale={radius * 4} far={radius} blur={2} />
    </>
  )
}
