import type { Quad } from './3d/quad';
import type {
  ChildInfo,
  CuboidInfo,
  ModelInfo,
  ModelPartInfo,
} from './ModelFoundry';

const COLORS: Record<number, string> = {
  0: 'red',
  1: 'green',
  2: 'blue',
  3: 'cyan',
  4: 'yellow',
  5: 'violet',
};

export class TemplateGenerator {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(canvas = document.createElement('canvas')) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to create canvas context');
    }

    this.ctx = ctx;
  }

  public generate(modelInfo: ModelInfo, scale = 1) {
    this.ctx.canvas.width = modelInfo.texture.w * scale;
    this.ctx.canvas.height = modelInfo.texture.h * scale;

    this.ctx.save();
    this.ctx.scale(this.ctx.canvas.width, this.ctx.canvas.height);

    this.processModel(modelInfo);

    this.ctx.restore();

    return this.ctx.canvas;
  }

  private processModel(model: ModelInfo) {
    for (const child of model.children) {
      this.processChild(child);
    }
  }

  private processChild(child: ChildInfo) {
    switch (child.type) {
      case 'model':
        this.processModel(child);
        break;

      case 'part':
        this.processModelPart(child);
        break;
    }
  }

  private processModelPart(modelPart: ModelPartInfo) {
    for (const child of modelPart.children) {
      this.processChild(child);
    }

    for (const cube of modelPart.cubes) {
      this.processCuboid(cube);
    }
  }

  protected processCuboid(cuboid: CuboidInfo) {
    cuboid.quads.forEach((quad, i) => {
      this.processQuad(quad, i);
    });
  }

  protected processQuad(quad: Quad, index: number) {
    this.ctx.fillStyle = COLORS[index] ?? 'gray';

    this.ctx.beginPath();

    for (const vertex of quad.vertices) {
      this.ctx.lineTo(vertex.u, vertex.v);
    }

    this.ctx.closePath();

    this.ctx.fill();
  }
}
