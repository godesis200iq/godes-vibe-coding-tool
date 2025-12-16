import {
  Group,
  PerspectiveCamera,
  Vector2,
  Vector3,
  type Object3D,
} from "three";
import type { Sizes } from "@/src/utils/Sizes";

export class Camera {
  rig: Group;
  parallaxGroup: Group;
  instance: PerspectiveCamera;

  private sizes: Sizes;
  private pointerTarget: Vector2;
  private pointerCurrent: Vector2;

  constructor(sizes: Sizes) {
    this.sizes = sizes;

    this.rig = new Group();
    this.parallaxGroup = new Group();

    this.instance = new PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      200
    );
    this.instance.position.set(0, 0.2, 12);

    this.rig.add(this.parallaxGroup);
    this.parallaxGroup.add(this.instance);

    this.pointerTarget = new Vector2(0, 0);
    this.pointerCurrent = new Vector2(0, 0);

    this.instance.lookAt(new Vector3(0, 0, 0));
  }

  setLookAt(target: Vector3 | Object3D) {
    if (target instanceof Vector3) this.instance.lookAt(target);
    else this.instance.lookAt(target.position);
  }

  setPointer(normalizedX: number, normalizedY: number) {
    this.pointerTarget.set(normalizedX, normalizedY);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update(deltaMs: number) {
    const damp = 1 - Math.pow(0.001, deltaMs / 16);
    this.pointerCurrent.lerp(this.pointerTarget, damp);

    this.parallaxGroup.position.x = this.pointerCurrent.x * 0.35;
    this.parallaxGroup.position.y = this.pointerCurrent.y * 0.25;
  }
}
