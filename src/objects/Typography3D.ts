import { Group } from "three";
import { Text } from "troika-three-text";
import type { Scene } from "three";

export class Typography3D {
  group: Group;

  title: Text;
  line1: Text;
  line2: Text;

  constructor(scene: Scene) {
    this.group = new Group();

    this.title = new Text();
    this.title.text = "CODEVERSE3D";
    this.title.fontSize = 0.92;
    this.title.letterSpacing = 0.06;
    this.title.color = 0xb7f7ff;
    this.title.outlineWidth = 0.015;
    this.title.outlineColor = 0x2a6cff;
    this.title.fillOpacity = 0;
    this.title.position.set(0, 0.95, 2.2);
    this.title.anchorX = "center";
    this.title.anchorY = "middle";

    this.line1 = new Text();
    this.line1.text = "Scroll to learn\nthrough a cinematic code tunnel";
    this.line1.fontSize = 0.34;
    this.line1.maxWidth = 6;
    this.line1.color = 0xeef6ff;
    this.line1.fillOpacity = 0;
    this.line1.position.set(0, -0.05, -9.5);
    this.line1.anchorX = "center";
    this.line1.anchorY = "middle";

    this.line2 = new Text();
    this.line2.text = "Three.js • GSAP ScrollTrigger • GLSL";
    this.line2.fontSize = 0.26;
    this.line2.letterSpacing = 0.02;
    this.line2.color = 0x88a6ff;
    this.line2.fillOpacity = 0;
    this.line2.position.set(0, 0.55, -24);
    this.line2.anchorX = "center";
    this.line2.anchorY = "middle";

    this.group.add(this.title, this.line1, this.line2);
    scene.add(this.group);

    this.title.sync();
    this.line1.sync();
    this.line2.sync();
  }

  dispose() {
    this.title.dispose();
    this.line1.dispose();
    this.line2.dispose();
  }
}
