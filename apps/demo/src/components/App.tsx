import { AppShell, Burger, Divider, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { HighlightInfo } from './HighlightInfo'
import { Preview } from './preview/Preview'
import { ColorThemeSwitcher } from './settings/ColorThemeSwitcher'
import { ModelsSettings } from './settings/ModelsSettings'
import { PresetsSelect } from './settings/PresetsSelect'
import { StateSwitch } from './settings/StateSwitch'

// This magically enables memoization
const AppContent = (
  <>
    <AppShell.Aside p="sm">
      <ScrollArea>
        <Stack gap="md">
          <ColorThemeSwitcher />

          <StateSwitch label="Smooth camera" stateProp="smoothCamera" />
          <StateSwitch label="Show grid" stateProp="showGrid" />
          <StateSwitch label="Enable light" stateProp="enableLight" />

          <Divider />

          <PresetsSelect />
          <ModelsSettings />
        </Stack>
      </ScrollArea>
    </AppShell.Aside>

    <AppShell.Main h="100dvh">
      <HighlightInfo />
      <Preview />
    </AppShell.Main>
  </>
)

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

      {AppContent}
    </AppShell>
  )
}
