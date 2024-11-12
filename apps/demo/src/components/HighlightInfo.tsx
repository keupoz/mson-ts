import type { Vector3Like } from 'three'
import { Affix, Paper } from '@mantine/core'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import { useAppState } from '@demo/state/appState'

export function HighlightInfo() {
  const currentObject = useAppState(state => state.currentObject)

  const visible = currentObject?.visible ?? 'N/A'
  let parentName = currentObject?.parent?.name ?? 'N/A'
  const objectName = currentObject?.name ?? 'N/A'
  let materialName = 'N/A'

  const size = currentObject?.geometry.boundingBox?.getSize(new Vector3())
  const position = currentObject?.getWorldPosition(new Vector3())
  const quaternion = currentObject?.getWorldQuaternion(new Quaternion())

  if (currentObject?.parent?.visible !== undefined) {
    parentName += ` (${currentObject.parent.visible ? 'visible' : 'hidden'})`
  }

  if (currentObject?.material) {
    if (Array.isArray(currentObject.material)) {
      materialName = currentObject.material
        .map(({ name, type }) => `${JSON.stringify(name)} (${type})`)
        .join(', ')
    } else {
      materialName = JSON.stringify(currentObject.material.name)
      materialName += ` (${currentObject.material.type})`
    }
  }

  return (
    <Affix position={{ left: 8, bottom: 8 }} zIndex={100}>
      <Paper withBorder pr="md" ff="monospace">
        <ul>
          <li>{`Visible: ${visible}`}</li>
          <li>{`Parent: ${parentName}`}</li>
          <li>{`Name: ${objectName}`}</li>
          <li>{`Material: ${materialName}`}</li>
          <li>{`Geometry size: ${vectorString(size)}`}</li>
          <li>{`World position: ${vectorString(position)}`}</li>
          <li>{`World rotation: ${rotationString(quaternion)}`}</li>
        </ul>
      </Paper>
    </Affix>
  )
}

function vectorString(vector: Vector3Like | undefined) {
  return vector ? `${vector.x} x ${vector.y} x ${vector.z}` : 'N/A'
}

function rotationString(quaternion: Quaternion | undefined) {
  if (!quaternion) {
    return 'N/A'
  }

  const euler = new Euler().setFromQuaternion(quaternion)

  const x = MathUtils.radToDeg(euler.x)
  const y = MathUtils.radToDeg(euler.y)
  const z = MathUtils.radToDeg(euler.z)

  return `x ${x}, y ${y}, z ${z}`
}
