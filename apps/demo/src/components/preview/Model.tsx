import { useEffect, useLayoutEffect } from 'react'
import { useModel } from '@demo/hooks/useModel'
import { setAppState } from '@demo/state/appState'
import { useResetFocus } from './stage/FocusSelect/ResetFocusContext'

export interface ModelProps {
  modelId: string
  textureUrl: string
}

export function Model({ modelId, textureUrl }: ModelProps) {
  const model = useModel(modelId, textureUrl)
  const resetFocus = useResetFocus()

  useLayoutEffect(() => {
    model.traverse((child) => {
      if (child.name === 'corona') {
        child.visible = true
        child.renderOrder = 1
      }
    })
  }, [model])

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

  useEffect(() => {
    resetFocus()
  }, [model, resetFocus])

  return <primitive object={model} />
}
