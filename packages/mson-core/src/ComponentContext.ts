import type { ModelLoader } from './ModelLoader'
import type { Expression, Local, Locals, Operator } from './schemas/locals'
import type { Texture } from './schemas/texture'
import type { Token } from './schemas/token'
import type { Tuple, Tuple3 } from './types/tuple'

const DEFAULT_TEXTURE: Required<Texture> = { u: 0, v: 0, w: 64, h: 32 }

type Operation = (one: number, two: number) => number

const OPERATIONS: Record<Operator, Operation> = {
  '+': (one, two) => one + two,
  '-': (one, two) => one - two,
  '*': (one, two) => one * two,
  '/': (one, two) => one / two,
  '%': (one, two) => one % two,
  '^': (one, two) => one ** two,
}

export class ComponentContext {
  public readonly loader: ModelLoader

  private readonly parent?: ComponentContext
  private readonly locals: Locals
  private readonly texture: Required<Texture>

  private readonly dilate: Tuple3<number>
  private readonly mirror: Tuple3<boolean>

  private readonly stack = new Set<string>()

  constructor(
    loader: ModelLoader,
    locals: Locals,
    texture: Required<Texture>,
    dilate: Tuple3<number>,
    mirror: Tuple3<boolean>,
    parent?: ComponentContext,
  ) {
    this.loader = loader

    this.parent = parent

    this.locals = locals
    this.texture = texture

    this.dilate = dilate
    this.mirror = mirror
  }

  public static create(loader: ModelLoader, locals: Locals, texture: Texture) {
    return new ComponentContext(
      loader,
      locals,
      { ...DEFAULT_TEXTURE, ...texture },
      [0, 0, 0],
      [false, false, false],
    )
  }

  public extend(
    locals: Locals,
    texture: Texture,
    dilate: Tuple3<Token>,
    mirror: boolean[],
  ) {
    return new ComponentContext(
      this.loader,
      locals,
      { ...this.texture, ...texture },
      this.getDilation(dilate),
      [
        mirror[0] ?? this.mirror[0],
        mirror[1] ?? this.mirror[1],
        mirror[2] ?? this.mirror[2],
      ],
      this,
    )
  }

  public ref(token: Token) {
    if (typeof token === 'number') {
      return token
    }

    return this.getLocal(token)
  }

  public resolve<T extends Tuple<Token, number>>(tokens: T) {
    type R = Tuple<number, T['length']>

    return tokens.map(token => this.ref(token)) as R
  }

  public getTexture(texture?: Texture): Required<Texture> {
    return { ...this.texture, ...texture }
  }

  public getDilation(dilate: Tuple3<Token>): Tuple3<number> {
    const [dx, dy, dz] = this.resolve(dilate)

    return [this.dilate[0] + dx, this.dilate[1] + dy, this.dilate[2] + dz]
  }

  public getMirror() {
    return this.mirror
  }

  private findLocal(name: string): Local {
    const value = this.locals[name]

    if (value === undefined) {
      if (this.parent === undefined) {
        return 0
      }

      return this.parent.findLocal(name)
    }

    return value
  }

  private getLocal(name: string) {
    if (this.stack.has(name)) {
      console.warn(`Cyclical local request: "${name}"`)

      return 0
    }

    if (!name.startsWith('#')) {
      return 0
    }

    const value = this.findLocal(name.slice(1))

    this.stack.add(name)
    const resolved = this.resolveLocal(value)
    this.stack.delete(name)

    return resolved
  }

  private resolveLocal(local: Local): number {
    if (typeof local === 'number') {
      return local
    }
    if (typeof local === 'string') {
      return this.getLocal(local)
    }

    return this.resolveExpression(local)
  }

  private resolveExpression(expression: Expression): number {
    const [leftOperand, operator, rightOperand] = expression
    const operation = OPERATIONS[operator]

    const left = this.resolveLocal(leftOperand)
    const right = this.resolveLocal(rightOperand)

    return operation(left, right)
  }
}
