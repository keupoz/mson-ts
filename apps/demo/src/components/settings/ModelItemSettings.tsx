import { saveAs } from 'file-saver';
import { GLTFExporter, OBJExporter } from 'three/addons';
import type { ModelItem } from '@demo/models/createModelItem';
import { MODELS } from '@demo/models/collection';
import { getAppState } from '@demo/state/appState';
import { updateModel } from '@demo/state/updateModel';
import { TEXTURES } from '@demo/textures/collection';
import { Button, ComboboxWithLabel, Separator } from '@repo/ui';

const modelKeys = Object.keys(MODELS);
const textureKeys = Object.keys(TEXTURES);

export interface ModelItemSettingsProps {
  modelItem: ModelItem;
}

export function ModelItemSettings({ modelItem }: ModelItemSettingsProps) {
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

      <ComboboxWithLabel
        label="Model"
        options={modelKeys}
        value={modelItem.modelId}
        onChange={modelId => updateModel(modelItem.id, { modelId })}
      />

      <ComboboxWithLabel
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
