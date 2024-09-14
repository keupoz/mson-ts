# `mson-three`

This package is used to load [Mson](https://github.com/MineLittlePony/Mson) models and create [Three.js](https://threejs.org/) objects from them.

## Installation

```sh
npm install three @keupoz/mson-three
```

## Usage

```typescript
import { ThreeMsonLoader } from '@keupoz/mson-three';
import { LoadingManager, Scene } from 'three';

const loadingManager = new LoadingManager();

loadingManager.setURLModifier((modelId) => {
  const [namespace, path] = modelId.split(':');

  return `path/to/${namespace}/models/${path}`;
});

const msonLoader = new ThreeMsonLoader(loadingManager);
const model = await msonLoader.loadAsync('mson:steve');
const scene = new Scene();

scene.add(model);
```
