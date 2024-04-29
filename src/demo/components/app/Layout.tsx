import { GearIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from '@uidotdev/usehooks';

import { Button } from '@/shadcn/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/shadcn/components/ui/drawer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shadcn/components/ui/resizable';

import { Scene } from '../scene/scene/Scene';
import { Settings } from '../settings/Settings';

export function Layout() {
  const isDesktop = useMediaQuery('(min-width: 900px)');

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
            <Settings />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel>
            <Scene />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Scene />

      <Drawer modal={false}>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-8 right-8 size-12 rounded-full p-0">
            <GearIcon className="size-6" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="max-h-svh overflow-auto">
            <Settings />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
