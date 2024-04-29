import { Suspense } from 'react';

import { useAppState } from '@/demo/store';
import { getTextureUrl } from '@/demo/textureLoader';

import { Model } from '../Model';
import { ModelStage } from '../stage/ModelStage';

export function SceneModels() {
  const models = useAppState(state => state.models);

  if (!models.length) {
    return null;
  }

  const key = models.map(({ id }) => id).join(';');

  return (
    <Suspense>
      <ModelStage key={key}>
        {models.map(item => (
          <Model
            key={item.id}
            modelId={item.modelId}
            textureUrl={getTextureUrl(item.textureId)}
          />
        ))}
      </ModelStage>
    </Suspense>
  );
}
