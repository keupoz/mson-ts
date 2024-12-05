import type { CuboidInfo, ImplementableSlots, ModelInfo, ModelPartInfo } from '@keupoz/mson-core'
import type { Material } from 'three'
import { ModelFoundry } from '@keupoz/mson-core'
import { Group, Mesh } from 'three'
import { createGeometry } from './createGeometry'

export type GetMaterial = (name: string) => Material

export class ThreeModelFoundry extends ModelFoundry<Group, Group, Mesh> {
  private readonly getMaterial: GetMaterial

  constructor(getMaterial: GetMaterial) {
    super()

    this.getMaterial = getMaterial
  }

  public createRoot(info: ModelInfo, implementableSlots: ImplementableSlots<Group>): Group {
    const group = new Group()
    const children = info.children.map((child) => {
      return this.createChild(child, implementableSlots)
    })

    group.name = info.name

    if (children.length) {
      group.add(...children)
    }

    return group
  }

  public createModelPart(info: ModelPartInfo, implementableSlots: ImplementableSlots<Group>): Group {
    const group = new Group()

    group.name = info.name
    group.visible = info.visible

    const [x, y, z] = info.position
    const [rx, ry, rz] = info.rotation

    group.position.set(x, -y, -z)
    group.rotation.set(rx, -ry, -rz)

    const children = info.children.map((child) => {
      return this.createChild(child, implementableSlots)
    })

    const cubes = info.cubes.map(child => this.createCuboid(child))

    if (children.length) {
      group.add(...children)
    }

    if (cubes.length) {
      group.add(...cubes)
    }

    return group
  }

  public createCuboid(info: CuboidInfo): Mesh {
    const geometry = createGeometry(info.quads)
    const mesh = new Mesh(geometry, this.getMaterial(info.name))

    mesh.name = info.name

    return mesh
  }
}
