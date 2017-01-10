// @flow

import type THREE from './three';

export type RenderingState = {
  scene: THREE.Scene,
  camera: THREE.Camera,
  geometries: {[key: string]: THREE.Geometry},
  textureAssets: {[key: string]: Object},
  materials: {[key: string]: THREE.Material},
  meshes: {[key: string]: THREE.Mesh},
};
