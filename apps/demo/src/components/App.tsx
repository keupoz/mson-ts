import { AppShell, Burger, Group, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ColorThemeSwitcher } from '@demo/ui/ColorThemeSwitcher'
import { HighlightInfo } from './HighlightInfo'
import { Preview } from './preview/Preview'
import { Settings } from './Settings'

export function App() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 56 }}
      aside={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header px="md">
        <Group h="100%" justify="space-between">
          <Text component="span" fw={700} size="xl">Mson Viewer</Text>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Aside p="sm">
        <Stack gap="md">
          <ColorThemeSwitcher />

          <Settings />
        </Stack>
      </AppShell.Aside>

      <AppShell.Main h="100dvh">
        <HighlightInfo />
        <Preview />
      </AppShell.Main>
    </AppShell>
  )
}
