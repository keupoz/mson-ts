import { saveAs } from 'file-saver';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

import type { ModelItem } from '@/demo/store';

import { MODELS } from '@/demo/modelLoader';
import { getAppState, updateModel } from '@/demo/store';
import { TEXTURES } from '@/demo/textureLoader';
import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';

import { SettingsCombobox } from './controls/SettingsCombobox';

const modelKeys = Object.keys(MODELS);
const textureKeys = Object.keys(TEXTURES);

export interface ModelSettingsProps {
  modelItem: ModelItem;
}

export function ModelSettings({ modelItem }: ModelSettingsProps) {
  function exportGLTF() {
    const object = getAppState().objects[modelItem.modelId];

    if (!object) {
      return;
    }

    const exporter = new GLTFExporter();

    exporter.parse(
      object,
      (gltf) => {
        let data;
        let extension;

        if (gltf instanceof ArrayBuffer) {
          data = gltf;
          extension = 'glb';
        } else {
          data = JSON.stringify(gltf);
          extension = 'gltf';
        }

        const filename = `${modelItem.modelId}.${extension}`;

        saveAs(new Blob([data]), filename);
      },
      // TODO Replace with Shadcn alternative
      // eslint-disable-next-line no-alert
      () => alert('Failed to export model'),
    );
  }

  function exportOBJ() {
    const object = getAppState().objects[modelItem.modelId];

    if (!object) {
      return;
    }

    const exporter = new OBJExporter();
    const result = exporter.parse(object);
    const filename = `${modelItem.modelId}.obj`;

    saveAs(new Blob([result]), filename);
  }

  return (
    <>
      <Separator />

      <SettingsCombobox
        label="Model"
        options={modelKeys}
        value={modelItem.modelId}
        onChange={modelId => updateModel(modelItem.id, { modelId })}
      />

      <SettingsCombobox
        label="Texture"
        options={textureKeys}
        value={modelItem.textureId}
        onChange={textureId => updateModel(modelItem.id, { textureId })}
      />

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={exportGLTF}>Export GLTF</Button>
        <Button onClick={exportOBJ}>Export OBJ</Button>
      </div>
    </>
  );
}
