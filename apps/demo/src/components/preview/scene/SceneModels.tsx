import { useAppState } from '@demo/state/appState'
import { getTextureUrl } from '@demo/textures/getTextureUrl'
import { Model } from '../Model'
import { ModelStage } from '../ModelStage'

export function SceneModels() {
  const models = useAppState(state => state.models)
  const userTextures = useAppState(state => state.userTextures)

  if (!models.length) {
    return null
  }

  const key = models.map(({ id }) => id).join(';')

  return (
    <ModelStage key={key}>
      {models.map(item => (
        <Model
          key={item.id}
          modelId={item.modelId}
          textureUrl={getTextureUrl(item.textureId, userTextures)}
        />
      ))}
    </ModelStage>
  )
}
