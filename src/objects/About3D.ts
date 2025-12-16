import { Group, type Scene } from "three";
import { Text } from "troika-three-text";

export class About3D {
  group: Group;
  heading: Text;
  body: Text;

  constructor(scene: Scene) {
    this.group = new Group();

    this.heading = new Text();
    this.heading.text = "ABOUT";
    this.heading.fontSize = 0.5;
    this.heading.letterSpacing = 0.1;
    this.heading.color = 0xb7f7ff;
    this.heading.fillOpacity = 0;
    this.heading.position.set(0, 1.15, -83);
    this.heading.anchorX = "center";
    this.heading.anchorY = "middle";

    this.body = new Text();
    this.body.text =
      "A premium coding education\nexperience—told as a real-time short film.";
    this.body.fontSize = 0.26;
    this.body.maxWidth = 7;
    this.body.letterSpacing = 0.02;
    this.body.color = 0xeef6ff;
    this.body.fillOpacity = 0;
    this.body.position.set(0, 0.2, -90);
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
