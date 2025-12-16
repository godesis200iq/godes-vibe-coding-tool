import { Color, FogExp2, Scene as ThreeScene } from "three";

export class Scene {
  instance: ThreeScene;

  constructor() {
    this.instance = new ThreeScene();
    this.instance.background = new Color("#02040a");
    this.instance.fog = new FogExp2("#02040a", 0.04);
  }
}
