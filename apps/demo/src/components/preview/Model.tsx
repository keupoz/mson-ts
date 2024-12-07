import { useEffect } from 'react'
import { useModel } from '@demo/hooks/useModel'
import { setAppState } from '@demo/state/appState'

export interface ModelProps {
  modelId: string
  textureUrl: string
}

export function Model({ modelId, textureUrl }: ModelProps) {
  const model = useModel(modelId, textureUrl)

  useEffect(() => {
    setAppState((draft) => {
      draft.objects[modelId] = model
    })

    return () => {
      setAppState((draft) => {
        delete draft.objects[modelId]
      })
    }
  }, [model, modelId])

  return <primitive object={model} />
}
