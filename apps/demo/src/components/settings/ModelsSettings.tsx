import { useAppState } from '@demo/state/appState'
import { ModelItemSettings } from './ModelItemSettings'

export function ModelsSettings() {
  const models = useAppState(state => state.models)

  return models.map(item => (
    <ModelItemSettings key={item.id} modelItem={item} />
  ))
}
