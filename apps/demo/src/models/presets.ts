import { createModelItem, type ModelItem } from './createModelItem'

export const MODEL_PRESETS: Record<string, ModelItem[]> = {
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
}
