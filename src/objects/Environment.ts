import {
  Color,
  CylinderGeometry,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  ShaderMaterial,
  type Scene,
} from "three";

import vertexShader from "@/src/shaders/vertex.glsl";
import fragmentShader from "@/src/shaders/fragment.glsl";

export class Environment {
  tunnel: Mesh;
  floor: Mesh;
  material: ShaderMaterial;

  constructor(scene: Scene) {
    const tunnelGeometry = new CylinderGeometry(4.25, 4.25, 160, 64, 120, true);
    tunnelGeometry.rotateX(Math.PI / 2);
    tunnelGeometry.translate(0, 0, -55);

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uColorA: { value: new Color("#2a6cff") },
        uColorB: { value: new Color("#b7f7ff") },
      },
    });

    this.tunnel = new Mesh(tunnelGeometry, this.material);
    this.tunnel.frustumCulled = false;
    scene.add(this.tunnel);

    const floorGeometry = new PlaneGeometry(40, 260, 1, 1);
    floorGeometry.rotateX(-Math.PI / 2);
    floorGeometry.translate(0, -2.6, -85);

    const floorMaterial = new MeshStandardMaterial({
      color: new Color("#05070c"),
      metalness: 0.2,
      roughness: 0.85,
    });

    this.floor = new Mesh(floorGeometry, floorMaterial);
    this.floor.receiveShadow = true;
    scene.add(this.floor);
  }

  update(timeMs: number) {
    this.material.uniforms.uTime.value = timeMs;
  }

  dispose() {
    this.tunnel.geometry.dispose();
    this.material.dispose();

    this.floor.geometry.dispose();
    (this.floor.material as MeshStandardMaterial).dispose();
  }
}
