import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, Alert, Button, Code, Group, Stack } from '@mantine/core'
import { setAppState } from '@demo/state/appState'
import type { DropResult } from '@demo/utils/parseDroppedFiles'

export interface DropResultDisplayProps {
  dropResult: DropResult | null
  onConfirm: () => void
}

export function DropResultDisplay({ dropResult, onConfirm }: DropResultDisplayProps) {
  if (!dropResult) {
    return null
  }

  const errors = Object.entries(dropResult.errors)

  const recognizedModels = Object.keys(dropResult.models)
  const recognizedTextures = Object.keys(dropResult.textures)

  function confirmFiles() {
    if (!dropResult) {
      return
    }

    setAppState((state) => {
      state.userModels = { ...state.userModels, ...dropResult.models }
      state.userTextures = { ...state.userTextures, ...dropResult.textures }
    })

    onConfirm()
  }

  return (
    <Stack>
      {errors.length > 0 && (
        <Alert
          color="red"
          icon={<FontAwesomeIcon icon={faExclamationCircle} />}
          title="Can't continue due to found errors"
        />
      )}

      <Accordion defaultValue={errors.length ? 'errors' : 'models'}>
        <Accordion.Item value="errors">
          <Accordion.Control>Found errors</Accordion.Control>
          <Accordion.Panel>
            {errors.length
              ? (
                  <ul>
                    {errors.map(([modelId, error]) => (
                      <li key={modelId}>
                        <Code>{modelId}</Code>
                        <span>: </span>
                        <span>{error instanceof Error ? error.message : String(error)}</span>
                      </li>
                    ))}
                  </ul>
                )
              : 'None found'}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="models">
          <Accordion.Control>Recognized models</Accordion.Control>
          <Accordion.Panel>
            {recognizedModels.length
              ? (
                  <ul>
                    {recognizedModels.map(value => (
                      <li key={value}>
                        {value}
                      </li>
                    ))}
                  </ul>
                )
              : 'None recognized'}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="textures">
          <Accordion.Control>Recognized textures</Accordion.Control>
          <Accordion.Panel>
            {recognizedTextures.length
              ? (
                  <ul>
                    {recognizedTextures.map(value => (
                      <li key={value}>
                        {value}
                      </li>
                    ))}
                  </ul>
                )
              : 'None recognized'}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Group justify="flex-end">
        <Button disabled={errors.length > 0} onClick={confirmFiles}>
          Continue
        </Button>
      </Group>
    </Stack>
  )
}
