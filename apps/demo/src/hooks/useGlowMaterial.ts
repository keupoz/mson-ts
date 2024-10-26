import { useLayoutEffect } from 'react'
import {
  AddEquation,
  CustomBlending,
  LessEqualDepth,
  MeshBasicMaterial,
  OneFactor,
  SrcAlphaFactor,
} from 'three'
import { setupMaterial } from '../utils/setupMaterial'
import { useConst } from './useConst'

export function useGlowMaterial(img: HTMLImageElement) {
  const glowMaterial = useConst(() => {
    return setupMaterial(
      new MeshBasicMaterial({
        opacity: 0.4,

        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: SrcAlphaFactor,
        blendDst: OneFactor,

        colorWrite: true,
        depthWrite: false,

        depthTest: true,
        depthFunc: LessEqualDepth,
      }),
      'glow',
    )
  })

  useLayoutEffect(() => {
    const ctx = document.createElement('canvas').getContext('2d')

    if (ctx) {
      ctx.canvas.width = 4
      ctx.canvas.height = 2

      ctx.drawImage(img, 0, 0)

      const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 1, 1, 1, { colorSpace: 'srgb' }).data

      glowMaterial.color.set(r / 0xFF, g / 0xFF, b / 0xFF)
    }
  }, [glowMaterial.color, img])

  return glowMaterial
}
