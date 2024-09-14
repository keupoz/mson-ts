import { useAppState } from '@demo/state/appState';
import { getTextureUrl } from '@demo/textures/getTextureUrl';
import { Model } from '../Model';
import { ModelStage } from '../stage/ModelStage';

export function SceneModels() {
  const models = useAppState(state => state.models);

  if (!models.length) {
    return null;
  }

  const key = models.map(({ id }) => id).join(';');

  return (
    <ModelStage key={key}>
      {models.map(item => (
        <Model
          key={item.id}
          modelId={item.modelId}
          textureUrl={getTextureUrl(item.textureId)}
        />
      ))}
    </ModelStage>
  );
}
