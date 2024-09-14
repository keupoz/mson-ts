import type { OnCenterCallbackProps } from '@react-three/drei';
import type { PropsWithChildren } from 'react';
import { Center, ContactShadows } from '@react-three/drei';
import { useState } from 'react';
import { FocusSelect } from './FocusSelect/FocusSelect';
import { Highlighter } from './Highlighter';

export function ModelStage({ children }: PropsWithChildren) {
  const [radius, setRadius] = useState(0);

  function onCentered(props: OnCenterCallbackProps) {
    setRadius(props.boundingSphere.radius);
  }

  return (
    <>
      <Center top onCentered={onCentered}>
        <Highlighter>
          <FocusSelect>{children}</FocusSelect>
        </Highlighter>
      </Center>

      <ContactShadows scale={radius * 4} far={radius} blur={2} />
    </>
  );
}
