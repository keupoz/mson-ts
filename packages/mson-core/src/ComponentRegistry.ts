import type { z, ZodType } from 'zod'
import type { ComponentContext } from './ComponentContext'

export type ParseComponent<Schema extends ZodType<unknown>, Result> = (
  context: ComponentContext,
  name: string,
  json: z.infer<Schema>,
) => Promise<Result>

export interface ComponentType<T> {
  type: string
  schema: ZodType<unknown>
  parse: ParseComponent<ZodType<unknown>, T>
}

export function createComponentType<Schema extends ZodType<unknown>, Result>(
  type: string,
  schema: Schema,
  parse: ParseComponent<Schema, Result>,
): ComponentType<Result> {
  return {
    type,
    schema,
    parse: parse as ParseComponent<ZodType<unknown>, Result>,
  }
}

export class ComponentRegistry<T> {
  private readonly types: Record<string, ComponentType<T>> = {}

  public register(...types: ComponentType<T>[]) {
    for (const type of types) {
      this.types[type.type] = type
    }
  }

  public async parseComponent(
    type: string,
    context: ComponentContext,
    name: string,
    raw: unknown,
  ) {
    const entry = this.types[type]

    if (!entry) {
      console.warn(`Unsupported component type "${type}"`)

      return null
    }

    const json = entry.schema.parse(raw)
    const result = await entry.parse(context, name, json)

    return result
  }
}
