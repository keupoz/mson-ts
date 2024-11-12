import { AppShellAside, AppShellMain, Divider, ScrollArea, Stack } from '@mantine/core'
import { AboutButton } from './AboutButton'
import { AppShell } from './AppShell'
import { HighlightInfo } from './HighlightInfo'
import { Preview } from './preview/Preview'
import { ColorThemeSwitcher } from './settings/ColorThemeSwitcher'
import { ModelsSettings } from './settings/ModelsSettings'
import { PresetsSelect } from './settings/PresetsSelect'
import { StateSwitch } from './settings/StateSwitch'

export function App() {
  return (
    <AppShell>
      <AppShellAside p="sm">
        <ScrollArea>
          <Stack gap="md">
            <ColorThemeSwitcher />

            <AboutButton />

            <StateSwitch label="Show grid" stateProp="showGrid" />
            <StateSwitch label="Enable light" stateProp="enableLight" />

            <Divider />

            <PresetsSelect />
            <ModelsSettings />
          </Stack>
        </ScrollArea>
      </AppShellAside>

      <AppShellMain h="100dvh">
        <HighlightInfo />
        <Preview />
      </AppShellMain>
    </AppShell>
  )
}
