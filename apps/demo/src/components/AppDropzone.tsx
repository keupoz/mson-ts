import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Modal, ScrollAreaAutosize, Title } from '@mantine/core'
import { DropzoneFullScreen, type FileWithPath } from '@mantine/dropzone'
import { useState } from 'react'
import { type DropResult, parseDroppedFiles } from '@demo/utils/parseDroppedFiles'
import { DropResultDisplay } from './DropResultDisplay'

export function AppDropzone() {
  const [dropResult, setDropResult] = useState<DropResult | null>(null)

  async function handleDrop(files: FileWithPath[]) {
    const newDropResult = await parseDroppedFiles(files)
    setDropResult(newDropResult)
  }

  return (
    <>
      <DropzoneFullScreen onDrop={handleDrop}>
        <Group justify="center" align="center" mih={220}>
          <FontAwesomeIcon icon={faFile} size="2xl" />
          <Title>Drop files here</Title>
        </Group>
      </DropzoneFullScreen>

      <Modal
        opened={!!dropResult}
        onClose={() => setDropResult(null)}
        title="Files confirmation"
        fullScreen
        scrollAreaComponent={ScrollAreaAutosize}
      >
        <DropResultDisplay dropResult={dropResult} onConfirm={() => setDropResult(null)} />
      </Modal>
    </>
  )
}
