import {
  AmbientLight,
  DirectionalLight,
  PointLight,
  type Scene,
} from "three";

export class Lights {
  constructor(scene: Scene) {
    const ambient = new AmbientLight("#6f8cff", 0.35);
    scene.add(ambient);

    const key = new DirectionalLight("#c7f0ff", 1.2);
    key.position.set(4, 6, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 50;
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 10;
    key.shadow.camera.bottom = -10;
    scene.add(key);

    const rim = new PointLight("#6a1bff", 6, 25, 2);
    rim.position.set(-2, 1.5, 2);
    scene.add(rim);
  }
}
