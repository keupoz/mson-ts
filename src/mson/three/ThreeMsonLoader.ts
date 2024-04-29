import type {
  Object3D,
} from 'three';

import {
  FileLoader,
  Loader,
  LoaderUtils,
  MeshStandardMaterial,
} from 'three';

import { ModelLoader } from '../ModelLoader';
import { ThreeModelFoundry } from './ThreeModelFoundry';

export class ThreeMsonLoader extends Loader {
  private readonly material = new MeshStandardMaterial({ name: 'default' });
  private readonly foundry = new ThreeModelFoundry(() => this.material);

  public readonly modelLoader = new ModelLoader((modelId) => {
    return this.loadFileAsync(modelId);
  });

  private loadFile(
    modelId: string,
    onLoad: (data: unknown) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (err: unknown) => void,
  ): void {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);

    loader.load(
      modelId,
      (data) => {
        let json;

        try {
          if (data instanceof ArrayBuffer) {
            data = LoaderUtils.decodeText(data);
          }

          json = JSON.parse(data);
        } catch (error) {
          onError?.(error);
          console.error(
            `ThreeMsonLoader: Can't parse model "${modelId}".`,
            error,
          );
          return;
        }

        onLoad(json);
      },
      onProgress,
      onError,
    );
  }

  private loadFileAsync(
    modelId: string,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
  ) {
    return new Promise((resolve, reject) => {
      this.loadFile(modelId, resolve, onProgress, reject);
    });
  }

  public load(
    modelId: string,
    onLoad: (data: Object3D) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (err: unknown) => void,
  ): void {
    this.loadFile(
      modelId,
      (data) => {
        this.parse(modelId, data).then(onLoad);
      },
      onProgress,
      onError,
    );
  }

  public loadAsync(
    modelId: string,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
  ) {
    return new Promise<Object3D>((resolve, reject) => {
      this.load(modelId, resolve, onProgress, reject);
    });
  }

  public async parse(name: string, data: unknown) {
    const modelInfo = await this.modelLoader.parse(name, data);
    const object = this.foundry.createModel(modelInfo);

    return object;
  }
}
