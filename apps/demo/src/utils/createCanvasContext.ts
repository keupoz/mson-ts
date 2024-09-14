export function createCanvasContext(canvas = document.createElement('canvas')) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to create canvas context');
  }

  return ctx;
}
