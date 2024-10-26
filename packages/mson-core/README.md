# `mson-core`

This the core package of [Mson](https://github.com/MineLittlePony/Mson) TypeScript port used to load and parse Mson files.

## Installation

```sh
npm install @keupoz/mson-core
```

## Usage

```typescript
import { ModelLoader } from '@keupoz/mson-core'

/**
 * Get actual model url. See `src/demo/modelLoader.ts` for example from demo
 */
function getModelUrl(modelId: string) {
  const [namespace, path] = modelId.split(':')

  return `path/to/${namespace}/models/${path}`
}

const modelLoader = new ModelLoader(async (modelId) => {
  const url = getModelUrl(modelId)

  const r = await fetch(url)
  const json = await r.json()

  return json
})

const parsedModel = await modelLoader.load('mson:steve')

console.log(parsedModel)
```
