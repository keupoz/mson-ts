import { useAppState } from '@demo/state/appState'

export function SceneLight() {
  const enableLight = useAppState(state => state.enableLight)

  return (
    <>
      <ambientLight intensity={(enableLight ? 0.5 : 1) * Math.PI} />

      <group visible={enableLight}>
        <directionalLight intensity={0.25 * Math.PI} position={[0, 1, 1]} />
        <directionalLight intensity={0.25 * Math.PI} position={[0, 1, -1]} />
      </group>
    </>
  )
}
