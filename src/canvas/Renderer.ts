import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
  type Scene,
  type Camera,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import type { Sizes } from "@/src/utils/Sizes";

export class Renderer {
  instance: WebGLRenderer;
  composer: EffectComposer;
  bloomPass: UnrealBloomPass;

  private sizes: Sizes;

  constructor({ canvas, scene, camera, sizes }: { canvas: HTMLCanvasElement; scene: Scene; camera: Camera; sizes: Sizes }) {
    this.sizes = sizes;

    this.instance = new WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });

    this.instance.outputColorSpace = SRGBColorSpace;
    this.instance.toneMapping = ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.1;

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = PCFSoftShadowMap;

    this.composer = new EffectComposer(this.instance);
    this.composer.addPass(new RenderPass(scene, camera));

    this.bloomPass = new UnrealBloomPass(
      new Vector2(this.sizes.width, this.sizes.height),
      0.8,
      0.9,
      0.2
    );
    this.composer.addPass(this.bloomPass);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);

    this.composer.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.composer.render();
  }

  dispose() {
    this.composer.dispose();
    this.instance.dispose();
  }
}
