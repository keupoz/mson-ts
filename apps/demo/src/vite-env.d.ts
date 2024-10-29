/// <reference types="vite/client" />

declare module '*.md' {
  // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
  import type React from 'react'

  const ReactComponent: React.VFC

  // Modify below per your usage
  export default ReactComponent
}
