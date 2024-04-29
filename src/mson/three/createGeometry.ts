import { BufferAttribute, BufferGeometry } from 'three';

import type { Quad } from '../3d/quad';

export function createGeometry(quads: Quad[]) {
  const geometry = new BufferGeometry();

  const position: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];

  let lastIndex = 0;

  for (const quad of quads) {
    for (const { x, y, z, u, v } of quad.vertices) {
      position.push(x, -y, -z);
      uv.push(u, 1 - v);
    }

    const a = lastIndex;
    const b = lastIndex + 1;
    const c = lastIndex + 2;
    const d = lastIndex + 3;

    index.push(a, b, d);
    index.push(b, c, d);

    lastIndex += quad.vertices.length;
  }

  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(position), 3),
  );

  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2));
  geometry.setIndex(index);

  geometry.computeVertexNormals();

  return geometry;
}
