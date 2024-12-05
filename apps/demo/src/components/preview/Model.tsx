import { useEffect, useLayoutEffect } from 'react'
import { useModel } from '@demo/hooks/useModel'
import { setAppState } from '@demo/state/appState'

export interface ModelProps {
  modelId: string
  textureUrl: string
}

export function Model({ modelId, textureUrl }: ModelProps) {
  const { model, implementableSlots } = useModel(modelId, textureUrl)

  useLayoutEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`Slots of "${modelId}"`, implementableSlots)

    implementableSlots['com.minelittlepony.client.model.part.UnicornHorn']?.forEach((item) => {
      const corona = item.getObjectByName('corona')

      if (corona) {
        corona.visible = true
        corona.renderOrder = 1
      }
    })
  }, [implementableSlots, modelId])

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
