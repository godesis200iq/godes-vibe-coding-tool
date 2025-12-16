import { LoadingManager, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Loader {
  manager: LoadingManager;
  textures: TextureLoader;
  gltf: GLTFLoader;

  constructor() {
    this.manager = new LoadingManager();
    this.textures = new TextureLoader(this.manager);
    this.gltf = new GLTFLoader(this.manager);
  }
}
