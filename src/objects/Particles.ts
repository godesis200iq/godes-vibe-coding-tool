import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
  type Scene,
} from "three";
import type { Sizes } from "@/src/utils/Sizes";

import particlesShader from "@/src/shaders/particles.glsl";

function splitParticleShader(source: string) {
  const marker = "// @stage fragment";
  const idx = source.indexOf(marker);
  if (idx === -1) return { vertex: source, fragment: source };

  const vertex = source
    .slice(0, idx)
    .replace("// @stage vertex", "")
    .trim();
  const fragment = source.slice(idx + marker.length).trim();

  return { vertex, fragment };
}

export class Particles {
  points: Points;
  material: ShaderMaterial;

  private sizes: Sizes;

  constructor(scene: Scene, sizes: Sizes) {
    this.sizes = sizes;

    const { vertex, fragment } = splitParticleShader(particlesShader);

    const count = 3200;

    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 2.8;

      positions[i3 + 0] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.sin(angle) * radius) / 1.4;
      positions[i3 + 2] = 3 - Math.random() * 150;

      scales[i] = 0.35 + Math.random() * 1.25;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new BufferAttribute(scales, 1));

    this.material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixelRatio: { value: this.sizes.pixelRatio },
        uSize: { value: 44 },
        uColor: { value: new Color("#b7f7ff") },
      },
    });

    this.points = new Points(geometry, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  resize() {
    this.material.uniforms.uPixelRatio.value = this.sizes.pixelRatio;
  }

  update(timeMs: number) {
    this.material.uniforms.uTime.value = timeMs;
  }

  dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}
