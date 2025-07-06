import type { Face } from '../schemas/components/plane'
import type { Texture } from '../schemas/texture'
import type { Tuple2, Tuple3 } from '../types/tuple'
import type { VertexTuple } from './quad'
import { generateCuboidVertices } from './generateCuboidVertices'
import { quad } from './quad'

export function createPlane(
  face: Face,
  size: Tuple2<number>,
  dilate: Tuple3<number>,
  mirror: Tuple2<boolean>,
  texture: Required<Texture>,
) {
  const size3 = resolve(face, size, 0)
  const mirror3 = resolve(face, mirror, false)

  dilate = [
    dilate[0],
    applyFixtures(face, dilate[1]),
    dilate[2],
  ]

  const { wds, eds, eus, wus, wdn, edn, eun, wun } = generateCuboidVertices(
    size3,
    dilate,
    mirror3,
    0,
  )

  const v1 = texture.u
  const v2 = v1 + size[0]

  const u1 = texture.v
  const u2 = u1 + size[1]

  const anyMirror = mirror3.some(Boolean)

  let vertices: VertexTuple

  // prettier-ignore
  switch (face) {
    case 'EAST':
      vertices = [edn, eds, eus, eun]
      break

    case 'WEST':
      vertices = [wds, wdn, wun, wus]
      break

    case 'UP':
      vertices = [eus, wus, wun, eun]
      break

    case 'DOWN':
      vertices = [edn, wdn, wds, eds]
      break

    case 'SOUTH':
      vertices = [wdn, edn, eun, wun]
      break

    case 'NORTH':
      vertices = [eds, wds, wus, eus]
      break
  }

  return quad(vertices, v1, u1, v2, u2, texture.w, texture.h, anyMirror)
}

const Axis = {
  X: [-1, 1, 0],
  Y: [0, -1, 1],
  Z: [0, 1, -1],
} satisfies Record<string, Tuple3<number>>

const Faces: Record<Face, Tuple3<number>> = {
  UP: Axis.Y,
  DOWN: Axis.Y,
  WEST: Axis.X,
  EAST: Axis.X,
  NORTH: Axis.Z,
  SOUTH: Axis.Z,
}

function resolve<T>(face: Face, tuple: Tuple2<T>, defaultValue: T): Tuple3<T> {
  const axis = Faces[face]

  const x = tuple[axis[0]] ?? defaultValue
  const y = tuple[axis[1]] ?? defaultValue
  const z = tuple[axis[2]] ?? defaultValue

  return [x, y, z]
}

function applyFixtures(face: Face, value: number) {
  const axis = Faces[face]
  return axis === Axis.Y ? -value : value
}
