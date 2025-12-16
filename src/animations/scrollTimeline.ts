import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MeshStandardMaterial } from "three";

import type { Camera } from "@/src/canvas/Camera";
import type { Renderer } from "@/src/canvas/Renderer";
import type { About3D } from "@/src/objects/About3D";
import type { CallToAction3D } from "@/src/objects/CallToAction3D";
import type { Curriculum3D } from "@/src/objects/Curriculum3D";
import type { Environment } from "@/src/objects/Environment";
import type { Particles } from "@/src/objects/Particles";
import type { Typography3D } from "@/src/objects/Typography3D";

export const SCROLL_PAGES = 10;
export const TIMELINE_TOTAL = 12;

export const BEATS = {
  start: 0,
  tools: 2,
  curriculum: 4,
  about: 7.5,
  mission: 10,
} as const;

export type Beat = keyof typeof BEATS;

export type ScrollTimelineTargets = {
  camera: Camera;
  environment: Environment;
  particles: Particles;
  typography: Typography3D;
  curriculum: Curriculum3D;
  about: About3D;
  cta: CallToAction3D;
  renderer: Renderer;
};

export const initScrollTimeline = ({
  camera,
  environment,
  particles,
  typography,
  curriculum,
  about,
  cta,
  renderer,
}: ScrollTimelineTargets) => {
  gsap.registerPlugin(ScrollTrigger);

  const total = TIMELINE_TOTAL;

  const intro = BEATS.start;
  const tools = BEATS.tools;
  const lessons = BEATS.curriculum;
  const aboutBeat = BEATS.about;
  const finale = BEATS.mission;

  const curriculumPanels = curriculum.items.map(
    (item) => item.panel.material as MeshStandardMaterial
  );

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: () => `+=${window.innerHeight * SCROLL_PAGES}`,
      scrub: true,
    },
  });

  tl.to(environment.material.uniforms.uProgress, { value: 1, duration: total }, 0);
  tl.to(particles.material.uniforms.uProgress, { value: 1, duration: total }, 0);

  tl.to(
    renderer.bloomPass,
    {
      strength: 1.05,
      radius: 0.7,
      threshold: 0.15,
      duration: total,
    },
    0
  );

  tl.to(
    camera.rig.position,
    { z: -8, x: 0.9, y: 0.2, duration: 2 },
    intro
  );
  tl.to(camera.rig.rotation, { y: -0.22, x: 0.04, duration: 2 }, intro);
  tl.to(typography.title, { fillOpacity: 1, duration: 0.6 }, intro + 0.1);
  tl.to(typography.line1, { fillOpacity: 1, duration: 0.7 }, intro + 0.6);

  tl.to(
    camera.rig.position,
    { z: -30, x: -1.05, y: 0.35, duration: 2 },
    tools
  );
  tl.to(camera.rig.rotation, { y: 0.26, x: -0.05, duration: 2 }, tools);
  tl.to(typography.line2, { fillOpacity: 1, duration: 0.6 }, tools + 0.4);
  tl.to(typography.line1, { fillOpacity: 0, duration: 0.4 }, tools + 0.8);

  tl.to(
    camera.rig.position,
    { z: -72, x: 0.35, y: 0.25, duration: 3 },
    lessons
  );
  tl.to(camera.rig.rotation, { y: -0.08, x: -0.02, duration: 3 }, lessons);
  tl.to(typography.line2, { fillOpacity: 0, duration: 0.5 }, lessons);

  tl.to(curriculum.heading, { fillOpacity: 1, duration: 0.6 }, lessons + 0.2);

  curriculumPanels.forEach((material, index) => {
    tl.to(material, { opacity: 0.72, duration: 0.6 }, lessons + 0.6 + index * 0.6);
  });

  curriculum.items.forEach((item, index) => {
    tl.to(item.title, { fillOpacity: 1, duration: 0.5 }, lessons + 0.75 + index * 0.6);
    tl.to(item.body, { fillOpacity: 1, duration: 0.5 }, lessons + 0.9 + index * 0.6);
  });

  tl.to(curriculum.heading, { fillOpacity: 0, duration: 0.4 }, aboutBeat - 0.4);
  tl.to(
    curriculum.items.map((item) => item.title),
    { fillOpacity: 0, duration: 0.4 },
    aboutBeat - 0.35
  );
  tl.to(
    curriculum.items.map((item) => item.body),
    { fillOpacity: 0, duration: 0.4 },
    aboutBeat - 0.35
  );
  tl.to(
    curriculumPanels,
    { opacity: 0, duration: 0.45 },
    aboutBeat - 0.35
  );

  tl.to(
    camera.rig.position,
    { z: -98, x: -0.25, y: 0.3, duration: 2.5 },
    aboutBeat
  );
  tl.to(camera.rig.rotation, { y: 0.14, x: -0.03, duration: 2.5 }, aboutBeat);
  tl.to(about.heading, { fillOpacity: 1, duration: 0.5 }, aboutBeat + 0.3);
  tl.to(about.body, { fillOpacity: 1, duration: 0.7 }, aboutBeat + 0.6);

  tl.to(
    camera.rig.position,
    { z: -122, x: 0, y: 0.5, duration: 2 },
    finale
  );
  tl.to(camera.rig.rotation, { y: 0, x: -0.02, duration: 2 }, finale);

  tl.to(about.heading, { fillOpacity: 0, duration: 0.35 }, finale);
  tl.to(about.body, { fillOpacity: 0, duration: 0.35 }, finale);

  tl.to(cta.heading, { fillOpacity: 1, duration: 0.6 }, finale + 0.25);
  tl.to(cta.body, { fillOpacity: 1, duration: 0.6 }, finale + 0.6);

  tl.to(renderer.bloomPass, { strength: 1.35, duration: 0.8 }, finale + 0.8);

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
};
