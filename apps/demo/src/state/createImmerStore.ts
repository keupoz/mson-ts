import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export function createImmerStore<T>(initState: () => T) {
  return create<T>()(immer(initState))
}
