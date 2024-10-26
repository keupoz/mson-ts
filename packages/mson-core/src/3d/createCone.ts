import type { Texture } from '../schemas/texture'
import type { Tuple, Tuple3 } from '../types/tuple'
import type { Quad } from './quad'
import { generateCuboidVertices } from './generateCuboidVertices'
import { quad } from './quad'

export function createCone(
  position: Tuple3<number>,
  size: Tuple3<number>,
  dilate: Tuple3<number>,
  mirror: Tuple3<boolean> | boolean,
  texture: Required<Texture>,
  tipInset: number,
) {
  let anyMirror = false

  if (typeof mirror === 'boolean') {
    anyMirror = mirror
    mirror = [mirror, false, false]
  } else {
    anyMirror = mirror.some(Boolean)
  }

  const { wds, eds, eus, wus, wdn, edn, eun, wun } = generateCuboidVertices(
    position,
    size,
    dilate,
    mirror,
    tipInset,
  )

  const v1 = texture.u
  const v2 = v1 + size[2]
  const v3 = v2 + size[0]
  const v4 = v3 + size[0]
  const v5 = v3 + size[2]
  const v6 = v4 + size[0]

  const u1 = texture.v
  const u2 = u1 + size[2]
  const u3 = u2 + size[1]

  return [
    quad([edn, wdn, wds, eds], v2, u1, v3, u2, texture.w, texture.h, anyMirror),
    quad([eus, wus, wun, eun], v3, u2, v4, u1, texture.w, texture.h, anyMirror),
    quad([wds, wdn, wun, wus], v1, u2, v2, u3, texture.w, texture.h, anyMirror),
    quad([eds, wds, wus, eus], v2, u2, v3, u3, texture.w, texture.h, anyMirror),
    quad([edn, eds, eus, eun], v3, u2, v5, u3, texture.w, texture.h, anyMirror),
    quad([wdn, edn, eun, wun], v5, u2, v6, u3, texture.w, texture.h, anyMirror),
  ] as Tuple<Quad, 6>
}
