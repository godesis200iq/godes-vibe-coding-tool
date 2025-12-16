import {
  AmbientLight,
  DirectionalLight,
  PointLight,
  type Scene,
} from "three";

export class Lights {
  ambient: AmbientLight;
  key: DirectionalLight;
  rim: PointLight;

  constructor(scene: Scene) {
    this.ambient = new AmbientLight("#6f8cff", 0.35);
    scene.add(this.ambient);

    this.key = new DirectionalLight("#c7f0ff", 1.2);
    this.key.position.set(4, 6, 6);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(1024, 1024);
    this.key.shadow.camera.near = 0.1;
    this.key.shadow.camera.far = 80;
    this.key.shadow.camera.left = -12;
    this.key.shadow.camera.right = 12;
    this.key.shadow.camera.top = 12;
    this.key.shadow.camera.bottom = -12;
    scene.add(this.key);

    this.rim = new PointLight("#6a1bff", 7, 35, 2);
    this.rim.position.set(-2, 1.5, 2);
    scene.add(this.rim);
  }

  update(timeMs: number) {
    const t = timeMs * 0.00035;
    this.rim.position.x = -2 + Math.sin(t) * 0.9;
    this.rim.position.y = 1.4 + Math.cos(t * 1.1) * 0.35;
    this.rim.intensity = 6.5 + Math.sin(t * 1.6) * 1.0;
  }
}
