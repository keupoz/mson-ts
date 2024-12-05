import type { Group, Object3D } from 'three'
import { ModelLoader, type ModelResult } from '@keupoz/mson-core'
import { FileLoader, Loader, MeshStandardMaterial } from 'three'
import { ThreeModelFoundry } from './ThreeModelFoundry'

export class ThreeMsonLoader extends Loader {
  private readonly material = new MeshStandardMaterial({ name: 'default' })
  private readonly foundry = new ThreeModelFoundry(() => this.material)

  public readonly modelLoader = new ModelLoader((modelId) => {
    return this.loadFileAsync(modelId)
  })

  private loadFile(
    modelId: string,
    onLoad: (data: unknown) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (err: unknown) => void,
  ) {
    const loader = new FileLoader(this.manager)

    loader.setPath(this.path)
    loader.setRequestHeader(this.requestHeader)
    loader.setWithCredentials(this.withCredentials)

    loader.load(
      modelId,
      (data) => {
        let json

        try {
          if (data instanceof ArrayBuffer) {
            const textDecoder = new TextDecoder()
            data = textDecoder.decode(data)
          }

          json = JSON.parse(data)
        } catch (error) {
          onError?.(error)
          console.error(`ThreeMsonLoader: Can't parse model "${modelId}".`, error)
          return
        }

        onLoad(json)
      },
      onProgress,
      onError,
    )
  }

  private loadFileAsync(modelId: string, onProgress?: (event: ProgressEvent<EventTarget>) => void) {
    return new Promise((resolve, reject) => {
      this.loadFile(modelId, resolve, onProgress, reject)
    })
  }

  public override load(
    modelId: string,
    onLoad: (data: ModelResult<Group>) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (err: unknown) => void,
  ) {
    this.loadFile(
      modelId,
      data => this.parse(modelId, data).then(onLoad),
      onProgress,
      onError,
    )
  }

  public override loadAsync(modelId: string, onProgress?: (event: ProgressEvent<EventTarget>) => void) {
    return new Promise<ModelResult<Object3D>>((resolve, reject) => {
      this.load(modelId, resolve, onProgress, reject)
    })
  }

  public async parse(name: string, data: unknown) {
    const modelInfo = await this.modelLoader.parse(name, data)
    return this.foundry.createModel(modelInfo)
  }
}
