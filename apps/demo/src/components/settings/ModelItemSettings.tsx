import { Button, Divider, SimpleGrid, Stack } from '@mantine/core'
import { saveAs } from 'file-saver'
import { useCallback } from 'react'
import { GLTFExporter, OBJExporter } from 'three/addons'
import { MODELS } from '@demo/models/collection'
import type { ModelItem } from '@demo/models/createModelItem'
import { getAppState } from '@demo/state/appState'
import { updateModel } from '@demo/state/updateModel'
import { TEXTURES } from '@demo/textures/collection'
import { Select } from '@demo/ui/Select'

const modelKeys = Object.keys(MODELS)
const textureKeys = Object.keys(TEXTURES)

export interface ModelItemSettingsProps {
  modelItem: ModelItem
}

export function ModelItemSettings({ modelItem }: ModelItemSettingsProps) {
  function exportGLTF() {
    const object = getAppState().objects[modelItem.modelId]

    if (!object) {
      return
    }

    const exporter = new GLTFExporter()

    exporter.parse(
      object,
      (gltf) => {
        let data
        let extension

        if (gltf instanceof ArrayBuffer) {
          data = gltf
          extension = 'glb'
        } else {
          data = JSON.stringify(gltf)
          extension = 'gltf'
        }

        const filename = `${modelItem.modelId}.${extension}`

        saveAs(new Blob([data]), filename)
      },
      // TODO Replace with Shadcn alternative
      // eslint-disable-next-line no-alert
      () => alert('Failed to export model'),
    )
  }

  function exportOBJ() {
    const object = getAppState().objects[modelItem.modelId]

    if (!object) {
      return
    }

    const exporter = new OBJExporter()
    const result = exporter.parse(object)
    const filename = `${modelItem.modelId}.obj`

    saveAs(new Blob([result]), filename)
  }

  const updateModelId = useCallback((modelId: string | null) => {
    if (modelId) {
      updateModel(modelItem.id, { modelId })
    }
  }, [modelItem.id])

  const updateTextureId = useCallback((textureId: string | null) => {
    if (textureId) {
      updateModel(modelItem.id, { textureId })
    }
  }, [modelItem.id])

  return (
    <>
      <Divider />

      <Stack gap="xs">
        <Select
          label="Model"
          data={modelKeys}
          value={modelItem.modelId}
          onChange={updateModelId}
        />

        <Select
          label="Texture"
          data={textureKeys}
          value={modelItem.textureId}
          onChange={updateTextureId}
        />

        <SimpleGrid cols={2} spacing="xs">
          <Button variant="default" onClick={exportGLTF}>Export GLTF</Button>
          <Button variant="default" onClick={exportOBJ}>Export OBJ</Button>
        </SimpleGrid>
      </Stack>
    </>
  )
}
