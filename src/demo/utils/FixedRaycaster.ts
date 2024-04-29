import type { Intersection, Object3D, Raycaster } from 'three';

// Devs decided raycaster shouldn't ignore invisible objects not allowing to enable it so we fix it
// LAYERS IS NOT CONVENIENT WAY
export const FixedRaycaster: Partial<Raycaster> = {
  intersectObject(this: Raycaster, object, recursive = true, intersects = []) {
    intersect(object, this, intersects, recursive);

    intersects.sort(ascSort);

    return intersects;
  },

  intersectObjects(
    this: Raycaster,
    objects,
    recursive = true,
    intersects = [],
  ) {
    for (const object of objects) {
      intersect(object, this, intersects, recursive);
    }

    intersects.sort(ascSort);

    return intersects;
  },
};

function ascSort(a: Intersection<Object3D>, b: Intersection<Object3D>) {
  return a.distance - b.distance;
}

function intersect<TIntersected extends Object3D>(
  object: Object3D,
  raycaster: Raycaster,
  intersects: Intersection<TIntersected>[],
  recursive: boolean,
) {
  if (!object.visible) {
    return;
  }

  if (object.layers.test(raycaster.layers)) {
    object.raycast(raycaster, intersects);
  }

  if (recursive === true) {
    for (const child of object.children) {
      intersect(child, raycaster, intersects, true);
    }
  }
}
