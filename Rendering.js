// @flow

import Exponent from 'exponent';
import THREEView from './THREEView';
import {
  Dimensions,
} from 'react-native';
import type {
  GameState,
} from './GameTypes';
import type {WorldState} from './WorldTypes';
import type {RenderingState} from './RenderingTypes';
import {CELL_SIZE} from './constants';

const THREE = require('./three');

const ORIENTATIONS = [
  new THREE.Vector2(1, 0),
  new THREE.Vector2(0, 1),
  new THREE.Vector2(-1, 0),
  new THREE.Vector2(0, -1),
];

const TOP_LEFT = new THREE.Vector2(-150, -50);
const SWAP_POS = new THREE.Vector2(-100, -100);

export default class Rendering {
  static async init(world: WorldState): Promise<RenderingState> {
    const scene = new THREE.Scene();
    const {height, width} = Dimensions.get('window');

    const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    camera.position.z = 1000;

    const geometries = {};
    geometries['tile'] = new THREE.PlaneGeometry(CELL_SIZE, CELL_SIZE, 1);

    const textureAssets = {};
    textureAssets['curve'] = Exponent.Asset.fromModule(
      require('./images/curve.png')
    );
    textureAssets['straight'] = Exponent.Asset.fromModule(
      require('./images/straight.png')
    );
    await Promise.all(
      Object.keys(textureAssets).map(name =>
        textureAssets[name].downloadAsync()
      )
    );
    const materials = {};
    materials['curve'] = new THREE.MeshBasicMaterial({
      map: THREEView.textureFromAsset(textureAssets['curve']),
    });
    materials['straight'] = new THREE.MeshBasicMaterial({
      map: THREEView.textureFromAsset(textureAssets['straight']),
    });

    const meshes = {};

    world.tiles.forEach((tile) => {
      const mesh = new THREE.Mesh(geometries['tile'], materials[tile.type]);
      mesh.rotation.z = ORIENTATIONS[tile.orient].angle();
      meshes[String(tile.id)] = mesh;
    });

    Rendering.updateMeshes(world, meshes);

    Object.keys(meshes).forEach(key => {
      scene.add(meshes[key]);
    });

    return {
      scene,
      camera,
      geometries,
      textureAssets,
      materials,
      meshes,
    };
  }

  static updateMeshes(
    world: WorldState,
    meshes: {[key: string]: THREE.Mesh},
  ) {
    world.boardTiles.forEach((tile, index) => {
      const y = Math.floor(index / world.boardLength);
      const x = index % world.boardLength;
      const mesh = meshes[String(tile.id)];
      mesh.position.x = x * CELL_SIZE + TOP_LEFT.x;
      mesh.position.y = y * CELL_SIZE + TOP_LEFT.y;
    });

    {
      const tile = world.swapTile;
      const mesh = meshes[String(tile.id)];
      mesh.position.x = SWAP_POS.x;
      mesh.position.y = SWAP_POS.y;
    }
  }

  static tick(
    gameState: GameState,
    dt: number,
  ) {
    const {
      world,
      rendering,
    } = gameState;
    const {
      meshes,
    } = rendering;

    Rendering.updateMeshes(world, meshes);
  }
}
