import { AppShell, Burger, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { HighlightInfo } from './HighlightInfo'
import { Preview } from './preview/Preview'
import { Settings } from './Settings'
import { ColorThemeSwitcher } from './settings/ColorThemeSwitcher'

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
        <ScrollArea>
          <Stack gap="md">
            <ColorThemeSwitcher />

            <Settings />
          </Stack>
        </ScrollArea>
      </AppShell.Aside>

      <AppShell.Main h="100dvh">
        <HighlightInfo />
        <Preview />
      </AppShell.Main>
    </AppShell>
  )
}
