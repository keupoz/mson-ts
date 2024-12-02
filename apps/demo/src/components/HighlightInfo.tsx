import type { Material, Object3D, Vector3Like } from 'three'
import { Affix, Paper } from '@mantine/core'
import { Euler, MathUtils, Quaternion, Vector3 } from 'three'
import { useAppState } from '@demo/state/appState'

export function HighlightInfo() {
  const currentObject = useAppState(state => state.currentObject)

  const hidden = currentObject ? !currentObject.visible : 'N/A'
  const path = currentObject ? objectPath(currentObject) : 'N/A'

  currentObject?.geometry.computeBoundingBox()

  const size = currentObject?.geometry.boundingBox?.getSize(new Vector3())
  const position = currentObject?.getWorldPosition(new Vector3())
  const quaternion = currentObject?.getWorldQuaternion(new Quaternion())

  return (
    <Affix position={{ left: 8, bottom: 8 }} zIndex={100}>
      <Paper withBorder pr="md">
        <pre>
          <ul>
            <li>{`Hidden: ${hidden}`}</li>
            <li>{`Path: ${path}`}</li>
            <li>{`Material: ${materialsString(currentObject?.material)}`}</li>
            <li>{`Boundary box:   ${vectorString(size)}`}</li>
            <li>{`World position: ${vectorString(position)}`}</li>
            <li>{`World rotation: ${rotationString(quaternion)}`}</li>
          </ul>
        </pre>
      </Paper>
    </Affix>
  )
}

function objectPath(object: Object3D, path = object.name) {
  if (object.parent?.name) {
    path = `${object.parent.name}.${path}`

    if (!object.parent.visible) {
      path = `!${path}`
    }

    return objectPath(object.parent, path)
  }

  return path
}

function materialString(material: Material) {
  return `${JSON.stringify(material.name)} (${material.type})`
}

function materialsString(material: Material | Material[] | undefined) {
  if (!material) return 'N/A'

  if (Array.isArray(material)) {
    return material.map(materialString).join(', ')
  }

  return materialString(material)
}

function vectorString(vector: Vector3Like | undefined) {
  if (!vector) return 'N/A'

  const x = vector.x.toFixed(2).padStart(7, ' ')
  const y = vector.y.toFixed(2).padStart(7, ' ')
  const z = vector.z.toFixed(2).padStart(7, ' ')

  return [x, y, z].join(', ')
}

function rotationString(quaternion: Quaternion | undefined) {
  if (!quaternion) return 'N/A'

  const euler = new Euler().setFromQuaternion(quaternion)

  const x = MathUtils.radToDeg(euler.x)
  const y = MathUtils.radToDeg(euler.y)
  const z = MathUtils.radToDeg(euler.z)

  return vectorString({ x, y, z })
}
