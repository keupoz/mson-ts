import type { Vertex } from './vertex';
import { remapVertex } from './vertex';

export type VertexTuple = [Vertex, Vertex, Vertex, Vertex, ...Vertex[]];

export interface Quad {
  vertices: VertexTuple;
}

export function quad(
  vertices: VertexTuple,
  u1: number,
  v1: number,
  u2: number,
  v2: number,
  textureWidth: number,
  textureHeight: number,
  flip: boolean,
): Quad {
  vertices = [...vertices];

  vertices[0] = remapVertex(vertices[0], u2 / textureWidth, v1 / textureHeight);
  vertices[1] = remapVertex(vertices[1], u1 / textureWidth, v1 / textureHeight);
  vertices[2] = remapVertex(vertices[2], u1 / textureWidth, v2 / textureHeight);
  vertices[3] = remapVertex(vertices[3], u2 / textureWidth, v2 / textureHeight);

  if (flip) {
    const i = vertices.length;

    for (let j = 0; j < i / 2; ++j) {
      const k = i - 1 - j;

      const vertex1 = vertices[j];
      const vertex2 = vertices[k];

      if (vertex1 === undefined || vertex2 === undefined) {
        throw new Error('One of vertices to swap is undefined');
      }

      vertices[j] = vertex2;
      vertices[k] = vertex1;
    }
  }

  return { vertices };
}
