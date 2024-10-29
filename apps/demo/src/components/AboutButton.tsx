import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, TypographyStylesProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AboutMD from '@demo/contents/about.md'

export function AboutButton() {
  const [opened, { open, close }] = useDisclosure()

  return (
    <>
      <Button
        variant="default"
        leftSection={<FontAwesomeIcon icon={faCircleInfo} />}
        onClick={open}
      >
        About
      </Button>

      <Modal opened={opened} onClose={close} title="About">
        <TypographyStylesProvider>
          <AboutMD />
        </TypographyStylesProvider>
      </Modal>
    </>
  )
}
