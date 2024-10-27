import type { ThreeEvent } from '@react-three/fiber'
import type { PropsWithChildren } from 'react'
import type { Group, Object3D } from 'three'
import { useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { useCallback, useRef } from 'react'
import { Box3, Vector3 } from 'three'
import { ResetFocusProvider } from './ResetFocusContext'

export function FocusSelect({ children }: PropsWithChildren) {
  const controls = useThree(ctx => ctx.controls)
  const groupRef = useRef<Group>(null)

  function setFocus(object: Object3D) {
    if (controls instanceof CameraControls) {
      const box = new Box3()
      box.setFromObject(object)
      const target = box.getCenter(new Vector3())

      controls.setTarget(target.x, target.y, target.z, true)
    }
  }

  function updateFocus(e: ThreeEvent<MouseEvent>) {
    const object = e.intersections[0]?.object

    if (object) {
      setFocus(object)
    }
  }

  // Memoized for the context value
  const resetFocus = useCallback(() => {
    const group = groupRef.current

    if (group && controls instanceof CameraControls) {
      requestAnimationFrame(() => {
        controls.fitToSphere(group, true)
      })
    }
  }, [controls])

  function handleMissed(e: MouseEvent) {
    if (e.type === 'dblclick') {
      resetFocus()
    }
  }

  return (
    <ResetFocusProvider value={resetFocus}>
      <group
        ref={groupRef}
        onDoubleClick={updateFocus}
        onPointerMissed={handleMissed}
      >
        {children}
      </group>
    </ResetFocusProvider>
  )
}
