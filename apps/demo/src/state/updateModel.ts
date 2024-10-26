import type { ModelItem } from '@demo/models/createModelItem'
import { setAppState } from './appState'

export function updateModel(id: string, value: Partial<ModelItem>) {
  setAppState((draft) => {
    for (const selection of draft.models) {
      if (selection.id === id) {
        Object.assign(selection, value)
      }
    }
  })
}
