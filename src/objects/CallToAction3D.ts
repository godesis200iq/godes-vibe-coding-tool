import { Group, type Scene } from "three";
import { Text } from "troika-three-text";

export class CallToAction3D {
  group: Group;
  heading: Text;
  body: Text;

  constructor(scene: Scene) {
    this.group = new Group();

    this.heading = new Text();
    this.heading.text = "JOIN THE MISSION";
    this.heading.fontSize = 0.62;
    this.heading.letterSpacing = 0.08;
    this.heading.color = 0xb7f7ff;
    this.heading.outlineWidth = 0.01;
    this.heading.outlineColor = 0x2a6cff;
    this.heading.fillOpacity = 0;
    this.heading.position.set(0, 1.05, -112);
    this.heading.anchorX = "center";
    this.heading.anchorY = "middle";

    this.body = new Text();
    this.body.text = "Build. Ship. Level up.";
    this.body.fontSize = 0.28;
    this.body.letterSpacing = 0.06;
    this.body.color = 0xeef6ff;
    this.body.fillOpacity = 0;
    this.body.position.set(0, 0.2, -118);
    this.body.anchorX = "center";
    this.body.anchorY = "middle";

    this.group.add(this.heading, this.body);
    scene.add(this.group);

    this.heading.sync();
    this.body.sync();
  }

  dispose() {
    this.heading.dispose();
    this.body.dispose();
  }
}
