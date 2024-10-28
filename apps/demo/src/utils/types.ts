export type Require<T, K extends keyof T> = T & Required<Pick<T, K>>

export type PickByType<T, Value> = {
  [K in keyof T as T[K] extends Value ? K : never]: T[K]
}
