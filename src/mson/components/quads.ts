import type { VertexTuple } from '../3d/quad';
import type { CuboidInfo } from '../ModelFoundry';

import { quad as createQuad } from '../3d/quad';
import { vertex as createVertex } from '../3d/vertex';
import { createComponentType } from '../ComponentRegistry';
import { QuadsSchema } from '../schemas/components/quads';

const ID = 'mson:slot';

export const MsonCone = createComponentType(
  ID,
  QuadsSchema,
  async (context, name, json) => {
    console.warn(
      `Component type "${ID}" is experimental. It may be removed in the future.`,
    );

    const texture = context.getTexture();

    const vertices = json.vertices.map((vertex) => {
      let x, y, z, u, v;

      if (Array.isArray(vertex)) {
        [x, y, z, u, v] = vertex;
      } else {
        ({ x, y, z, u, v } = vertex);
      }

      return createVertex(x, y, z, u, v);
    });

    const quads = json.quads.map((quad) => {
      const u1 = quad.x;
      const v1 = quad.y;
      const u2 = u1 + quad.w;
      const v2 = v1 + quad.h;

      const verts = quad.vertices.map((index) => {
        const vertex = vertices[index];

        if (!vertex) {
          throw new Error(`No vertex at index ${index}`);
        }

        return vertex;
      });

      if (verts.length < 4) {
        throw new Error(`Too few quad vertices (${verts.length})`);
      }

      return createQuad(
        verts as VertexTuple,
        u1,
        v1,
        u2,
        v2,
        texture.w,
        texture.h,
        context.getMirror()[0],
      );
    });

    const result: CuboidInfo = { type: 'cuboid', name, quads };

    return result;
  },
);
