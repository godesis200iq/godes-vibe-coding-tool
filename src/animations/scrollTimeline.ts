import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Camera } from "@/src/canvas/Camera";
import type { Environment } from "@/src/objects/Environment";
import type { Particles } from "@/src/objects/Particles";
import type { Typography3D } from "@/src/objects/Typography3D";

export type ScrollTimelineTargets = {
  camera: Camera;
  environment: Environment;
  particles: Particles;
  typography: Typography3D;
};

export const initScrollTimeline = ({
  camera,
  environment,
  particles,
  typography,
}: ScrollTimelineTargets) => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: () => `+=${window.innerHeight * 5.5}`,
      scrub: true,
    },
  });

  tl.to(environment.material.uniforms.uProgress, { value: 1 }, 0);
  tl.to(particles.material.uniforms.uProgress, { value: 1 }, 0);

  tl.to(typography.title, { fillOpacity: 1, duration: 0.15 }, 0.02);

  tl.to(
    camera.rig.position,
    {
      z: -2,
      x: 0.8,
      y: 0.15,
      duration: 0.35,
    },
    0
  );
  tl.to(
    camera.rig.rotation,
    {
      y: -0.25,
      x: 0.04,
      duration: 0.35,
    },
    0
  );

  tl.to(typography.line1, { fillOpacity: 1, duration: 0.2 }, 0.28);

  tl.to(
    camera.rig.position,
    {
      z: -14,
      x: -1.1,
      y: 0.3,
      duration: 0.35,
    },
    0.38
  );
  tl.to(
    camera.rig.rotation,
    {
      y: 0.28,
      x: -0.05,
      duration: 0.35,
    },
    0.38
  );

  tl.to(typography.line2, { fillOpacity: 1, duration: 0.2 }, 0.62);

  tl.to(
    camera.rig.position,
    {
      z: -28,
      x: 0,
      y: 0.55,
      duration: 0.32,
    },
    0.68
  );
  tl.to(
    camera.rig.rotation,
    {
      y: 0,
      x: -0.02,
      duration: 0.32,
    },
    0.68
  );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
};
