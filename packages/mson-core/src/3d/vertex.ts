export interface Vertex {
  x: number
  y: number
  z: number
  u: number
  v: number
}

export function vertex(
  x: number,
  y: number,
  z: number,
  u: number,
  v: number,
): Vertex {
  return { x, y, z, u, v }
}

export function remapVertex(vertex: Vertex, u: number, v: number): Vertex {
  return { ...vertex, u, v }
}
