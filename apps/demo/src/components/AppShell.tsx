import type { PropsWithChildren } from 'react'
import { Burger, Group, AppShell as MantineAppShell, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export function AppShell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <MantineAppShell
      header={{ height: 56 }}
      aside={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <MantineAppShell.Header px="md">
        <Group h="100%" justify="space-between">
          <Text component="span" fw={700} size="xl">Mson Viewer</Text>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </MantineAppShell.Header>

      {children}
    </MantineAppShell>
  )
}
