import { initScrollTimeline } from "@/src/animations/scrollTimeline";
import { Camera } from "@/src/canvas/Camera";
import { Lights } from "@/src/canvas/Lights";
import { Renderer } from "@/src/canvas/Renderer";
import { Scene } from "@/src/canvas/Scene";
import { About3D } from "@/src/objects/About3D";
import { CallToAction3D } from "@/src/objects/CallToAction3D";
import { Curriculum3D } from "@/src/objects/Curriculum3D";
import { Environment } from "@/src/objects/Environment";
import { Particles } from "@/src/objects/Particles";
import { Typography3D } from "@/src/objects/Typography3D";
import { Sizes } from "@/src/utils/Sizes";
import { Time } from "@/src/utils/Time";

export class Experience {
  sizes: Sizes;
  time: Time;

  scene: Scene;
  camera: Camera;
  renderer: Renderer;
  lights: Lights;

  environment: Environment;
  particles: Particles;
  typography: Typography3D;
  curriculum: Curriculum3D;
  about: About3D;
  cta: CallToAction3D;

  private cleanups: Array<() => void>;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.cleanups = [];

    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new Scene();
    this.camera = new Camera(this.sizes);
    this.scene.instance.add(this.camera.rig);

    this.lights = new Lights(this.scene.instance);

    this.environment = new Environment(this.scene.instance);
    this.particles = new Particles(this.scene.instance, this.sizes);
    this.typography = new Typography3D(this.scene.instance);
    this.curriculum = new Curriculum3D(this.scene.instance);
    this.about = new About3D(this.scene.instance);
    this.cta = new CallToAction3D(this.scene.instance);

    this.renderer = new Renderer({
      canvas,
      scene: this.scene.instance,
      camera: this.camera.instance,
      sizes: this.sizes,
    });

    this.setupScrollTimeline();
    this.setupResizeHandling();
    this.setupPointer();
    this.setupTick();
  }

  private setupScrollTimeline() {
    const dispose = initScrollTimeline({
      camera: this.camera,
      environment: this.environment,
      particles: this.particles,
      typography: this.typography,
      curriculum: this.curriculum,
      about: this.about,
      cta: this.cta,
      renderer: this.renderer,
    });

    this.cleanups.push(dispose);
  }

  private setupResizeHandling() {
    const onResize = () => {
      this.camera.resize();
      this.renderer.resize();
      this.particles.resize();
    };

    this.sizes.addEventListener("resize", onResize);
    this.cleanups.push(() => this.sizes.removeEventListener("resize", onResize));
  }

  private setupPointer() {
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / this.sizes.width - 0.5) * 2;
      const y = (event.clientY / this.sizes.height - 0.5) * 2;
      this.camera.setPointer(x, -y);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    this.cleanups.push(() => window.removeEventListener("pointermove", onPointerMove));
  }

  private setupTick() {
    const onTick = () => {
      this.camera.update(this.time.delta);
      this.lights.update(this.time.elapsed);
      this.environment.update(this.time.elapsed);
      this.particles.update(this.time.elapsed);
      this.renderer.update();
    };

    this.time.addEventListener("tick", onTick);
    this.cleanups.push(() => this.time.removeEventListener("tick", onTick));
  }

  dispose() {
    for (const cleanup of this.cleanups.splice(0)) cleanup();

    this.environment.dispose();
    this.particles.dispose();
    this.typography.dispose();
    this.curriculum.dispose();
    this.about.dispose();
    this.cta.dispose();

    this.renderer.dispose();
    this.time.dispose();
    this.sizes.dispose();
  }
}
