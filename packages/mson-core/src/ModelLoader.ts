import type { ChildInfo, CuboidInfo, ModelInfo } from './ModelFoundry'
import type { Locals } from './schemas/locals'
import type { Component, ComponentObject, Root } from './schemas/root'
import type { Texture } from './schemas/texture'
import { ComponentContext } from './ComponentContext'
import { ComponentRegistry } from './ComponentRegistry'
import { MsonBox } from './components/box'
import { MsonCompound } from './components/compound'
import { MsonCone } from './components/cone'
import { MsonImport } from './components/import'
import { MsonPlanar } from './components/planar'
import { MsonPlane } from './components/plane'
import { MsonQuads } from './components/quads'
import { MsonSlot } from './components/slot'
import { RootSchema } from './schemas/root'

interface InitContextResult {
  context: ComponentContext
  data: Record<string, Component>
}

export type ModelLoaderFetch = (modelId: string) => Promise<unknown>

export class ModelLoader {
  public readonly childTypes = new ComponentRegistry<ChildInfo>()
  public readonly cuboidTypes = new ComponentRegistry<CuboidInfo>()

  public readonly fetch: ModelLoaderFetch

  private readonly modelCache = new Map<string, ModelInfo>()

  constructor(fetch: ModelLoaderFetch) {
    this.fetch = fetch

    this.childTypes.register(MsonCompound, MsonPlanar, MsonSlot, MsonImport)
    this.cuboidTypes.register(MsonBox, MsonCone, MsonPlane, MsonQuads)
  }

  public async load(modelId: string) {
    const cache = this.modelCache.get(modelId)

    if (cache) {
      return cache
    }

    const raw = await this.fetch(modelId)
    const result = await this.parse(modelId, raw)

    this.modelCache.set(modelId, result)

    return result
  }

  public async parse(
    name: string,
    raw: unknown,
    locals?: Locals,
    texture?: Texture,
  ) {
    const json = RootSchema.parse(raw)
    const contextInfo = await this.initContext(json)

    let context = contextInfo.context
    const data = contextInfo.data

    if (locals || texture) {
      context = context.extend(locals ?? {}, texture ?? {}, [0, 0, 0], [])
    }

    const result: ModelInfo = {
      type: 'model',
      name,
      context,
      texture: context.getTexture(),
      children: [],
    }

    for (const name in data) {
      const raw = data[name]

      if (!raw) {
        continue
      }

      const child = await this.resolveModelPart(context, name, raw, data)

      if (child) {
        result.children.push(child)
      }
    }

    return result
  }

  private async initContext(json: Root): Promise<InitContextResult> {
    if (json.parent) {
      const parentRaw = await this.fetch(json.parent)
      const parent = RootSchema.parse(parentRaw)
      const parentInit = await this.initContext(parent)

      return {
        context: parentInit.context.extend(
          json.locals ?? {},
          json.texture ?? {},
          [0, 0, 0],
          [],
        ),
        data: { ...parentInit.data, ...json.data },
      }
    }

    return {
      context: ComponentContext.create(
        this,
        json.locals ?? {},
        json.texture ?? {},
      ),

      data: json.data ?? {},
    }
  }

  public resolveModelPart(
    context: ComponentContext,
    name: string,
    raw: Component,
    components: Record<string, Component>,
  ): Promise<ChildInfo | null> {
    if (typeof raw === 'string') {
      const refName = raw.slice(1)
      const component = components[refName]

      if (!component) {
        throw new Error(`No component "${raw}" in local scope`)
      }

      if (component === raw) {
        throw new Error(`Cyclical component reference: "${raw}"`)
      }

      return this.resolveModelPart(context, name, component, components)
    }

    const type = !raw.type && raw.data ? 'mson:slot' : raw.type ?? 'mson:compound'

    return this.childTypes.parseComponent(type, context, name, raw)
  }

  public resolveCuboid(
    context: ComponentContext,
    name: string,
    raw: ComponentObject,
  ) {
    const type = raw.type ?? 'mson:box'

    return this.cuboidTypes.parseComponent(type, context, name, raw)
  }
}
