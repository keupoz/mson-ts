import type { Mesh, Object3D } from 'three';

import { generateUUID } from 'three/src/math/MathUtils.js';

import { createImmerStore } from './utils/createImmerStore';

export const PRESETS: Record<string, ModelItem[]> = {
  'Daring Doo': [
    createModelItem(
      'minelittlepony:races/steve/pegasus',
      'community:textures/Background Ponies/daring_do.png',
    ),
  ],

  'Princess Cadence': [
    createModelItem(
      'minelittlepony:races/steve/alicorn',
      'community:textures/Main Cast/princesses/princess_cadence.png',
    ),
  ],

  'Princess Twilight': [
    createModelItem(
      'minelittlepony:races/steve/alicorn',
      'community:textures/Main Cast/princesses/princess_twilight_sparkle.png',
    ),
  ],

  'Apple Jack + Stetson': [
    createModelItem(
      'minelittlepony:races/steve/earth_pony',
      'community:textures/Main Cast/mane_six/applejack.png',
    ),

    createModelItem(
      'minelittlepony:gear/stetson',
      'minelittlepony:textures/models/stetson.png',
    ),
  ],

  'Derpy': [
    createModelItem(
      'minelittlepony:races/steve/pegasus',
      'community:textures/Background Ponies/derpy_hooves.png',
    ),

    createModelItem(
      'minelittlepony:gear/muffin',
      'minelittlepony:textures/models/muffin.png',
    ),
  ],

  'Armor Pony': [
    createModelItem(
      'minelittlepony:armor/inner_pony_armor',
      'minelittlepony:textures/models/armor/netherite_layer_inner_pony.png',
    ),

    createModelItem(
      'minelittlepony:armor/outer_pony_armor',
      'minelittlepony:textures/models/armor/netherite_layer_outer_pony.png',
    ),
  ],

  'Armor Stand': [
    createModelItem(
      'minelittlepony:armour_stand',
      'minecraft:textures/entity/armorstand/wood.png',
    ),
  ],
};

export interface ModelItem {
  id: string;
  modelId: string;
  textureId: string;
}

export interface AppState {
  smoothCamera: boolean;
  showGrid: boolean;
  enableLight: boolean;

  objects: Record<string, Object3D>;
  currentObject: Mesh | null;

  models: ModelItem[];
}

export const useAppState = createImmerStore<AppState>(() => ({
  smoothCamera: false,
  showGrid: true,
  enableLight: true,

  objects: {},
  currentObject: null,

  models: [
    createModelItem(
      'minelittlepony:races/steve/alicorn',
      'community:textures/Main Cast/princesses/princess_cadence.png',
    ),
  ],
}));

export const setAppState = useAppState.setState.bind(useAppState);
export const getAppState = useAppState.getState.bind(useAppState);

function createModelItem(modelId: string, textureId: string) {
  const model: ModelItem = {
    id: generateUUID(),
    modelId,
    textureId,
  };

  return model;
}

export function updateModel(id: string, value: Partial<ModelItem>) {
  setAppState((draft) => {
    for (const selection of draft.models) {
      if (selection.id === id) {
        Object.assign(selection, value);
      }
    }
  });
}
