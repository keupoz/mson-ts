import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Button, Divider, Group, Select, SimpleGrid, Stack } from '@mantine/core'
import { saveAs } from 'file-saver'
import { useCallback } from 'react'
import { GLTFExporter, OBJExporter } from 'three/addons'
import { MODELS } from '@demo/models/collection'
import type { ModelItem } from '@demo/models/createModelItem'
import { getAppState, setAppState } from '@demo/state/appState'
import { updateModel } from '@demo/state/updateModel'
import { TEXTURES } from '@demo/textures/collection'

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
      // TODO Replace with UI library alternative. But do I actually need to?..
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

  function removeModel() {
    setAppState(state => ({ models: state.models.filter(model => model.id !== modelItem.id) }))
  }

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

        <Group gap="xs">
          <Button.Group flex="1">
            <SimpleGrid cols={2} spacing={0} flex="1">
              <Button variant="default" onClick={exportGLTF}>Export GLTF</Button>
              <Button variant="default" onClick={exportOBJ}>Export OBJ</Button>
            </SimpleGrid>
          </Button.Group>

          <ActionIcon aria-label="Remove model" variant="filled" color="red" size="input-sm" onClick={removeModel}>
            <FontAwesomeIcon icon={faTrashCan} />
          </ActionIcon>
        </Group>
      </Stack>
    </>
  )
}
