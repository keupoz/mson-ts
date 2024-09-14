import type { ReactNode } from 'react';
import { GearIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Button } from '@ui/shadcn/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@ui/shadcn/components/ui/drawer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@ui/shadcn/components/ui/resizable';
import { AppHeader } from './AppHeader';

export interface AppLayoutProps {
  appName: string;
  settingsSlot?: ReactNode;
  previewSlot?: ReactNode;
}

export function AppLayout({ appName, settingsSlot, previewSlot }: AppLayoutProps) {
  const isDesktop = useMediaQuery('(min-width: 900px)');

  settingsSlot = (
    <>
      <AppHeader appName={appName} />
      {settingsSlot}
    </>
  );

  if (isDesktop) {
    return (
      <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="overflow-y-auto"
            defaultSize={25}
            minSize={25}
            maxSize={35}
          >
            {settingsSlot}
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel>
            {previewSlot}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  return (
    <div className="h-screen">
      {previewSlot}

      <Drawer modal={false}>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-8 right-8 size-12 rounded-full p-0">
            <GearIcon className="size-6" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="max-h-svh overflow-auto">
            {settingsSlot}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
