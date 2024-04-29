import type { Tuple3 } from '../utils/tuple';

import { vertex } from './vertex';

export function generateVertices(
  position: Tuple3<number>,
  size: Tuple3<number>,
  dilate: Tuple3<number>,
  mirror: Tuple3<boolean>,
  tipInset: number,
) {
  let xMax = position[0] + size[0] + dilate[0];
  let yMax = position[1] + size[1] + dilate[1];
  let zMax = position[2] + size[2] + dilate[2];

  let xMin = position[0] - dilate[0];
  let yMin = position[1] - dilate[1];
  let zMin = position[2] - dilate[2];

  if (mirror[0]) {
    [xMin, xMax] = [xMax, xMin];
  }
  if (mirror[1]) {
    [yMin, yMax] = [yMax, yMin];
  }
  if (mirror[2]) {
    [zMin, zMax] = [zMax, zMin];
  }

  const tipXmin = xMin + size[0] * tipInset;
  const tipZmin = zMin + size[2] * tipInset;
  const tipXMax = xMax - size[0] * tipInset;
  const tipZMax = zMax - size[2] * tipInset;

  // w:west e:east d:down u:up s:south n:north
  const wds = vertex(tipXmin, yMin, tipZmin, 0, 0);
  const eds = vertex(tipXMax, yMin, tipZmin, 0, 8);
  const eus = vertex(xMax, yMax, zMin, 8, 8);
  const wus = vertex(xMin, yMax, zMin, 8, 0);
  const wdn = vertex(tipXmin, yMin, tipZMax, 0, 0);
  const edn = vertex(tipXMax, yMin, tipZMax, 0, 8);
  const eun = vertex(xMax, yMax, zMax, 8, 8);
  const wun = vertex(xMin, yMax, zMax, 8, 0);

  return { wds, eds, eus, wus, wdn, edn, eun, wun };
}
