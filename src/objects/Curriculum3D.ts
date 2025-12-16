import {
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  type Scene,
} from "three";
import { Text } from "troika-three-text";

export type CurriculumItem = {
  panel: Mesh;
  title: Text;
  body: Text;
};

export class Curriculum3D {
  group: Group;
  heading: Text;
  items: CurriculumItem[];

  constructor(scene: Scene) {
    this.group = new Group();

    this.heading = new Text();
    this.heading.text = "CURRICULUM";
    this.heading.fontSize = 0.52;
    this.heading.letterSpacing = 0.08;
    this.heading.color = 0xb7f7ff;
    this.heading.outlineWidth = 0.008;
    this.heading.outlineColor = 0x2a6cff;
    this.heading.fillOpacity = 0;
    this.heading.position.set(0, 1.1, -36);
    this.heading.anchorX = "center";
    this.heading.anchorY = "middle";

    this.items = [];
    this.items.push(
      this.createItem({
        title: "01 — FOUNDATIONS",
        body: "JavaScript • Git • Debugging",
        x: -1.5,
        y: 0.2,
        z: -45,
      })
    );
    this.items.push(
      this.createItem({
        title: "02 — THREE.JS",
        body: "Scene graph • Lights • Materials",
        x: 1.4,
        y: -0.2,
        z: -57,
      })
    );
    this.items.push(
      this.createItem({
        title: "03 — SHADERS",
        body: "GLSL • Noise • Particles",
        x: -1.2,
        y: 0.1,
        z: -69,
      })
    );

    this.group.add(this.heading);
    for (const item of this.items) this.group.add(item.panel, item.title, item.body);

    scene.add(this.group);

    this.heading.sync();
    for (const item of this.items) {
      item.title.sync();
      item.body.sync();
    }
  }

  private createItem({
    title,
    body,
    x,
    y,
    z,
  }: {
    title: string;
    body: string;
    x: number;
    y: number;
    z: number;
  }): CurriculumItem {
    const panelGeometry = new PlaneGeometry(4.4, 2.2, 1, 1);
    const panelMaterial = new MeshStandardMaterial({
      color: new Color("#050a14"),
      metalness: 0.15,
      roughness: 0.85,
      transparent: true,
      opacity: 0,
    });

    const panel = new Mesh(panelGeometry, panelMaterial);
    panel.position.set(x, y, z);
    panel.castShadow = true;
    panel.receiveShadow = true;

    const titleText = new Text();
    titleText.text = title;
    titleText.fontSize = 0.22;
    titleText.letterSpacing = 0.04;
    titleText.color = 0xeef6ff;
    titleText.fillOpacity = 0;
    titleText.position.set(x, y + 0.4, z + 0.01);
    titleText.anchorX = "center";
    titleText.anchorY = "middle";

    const bodyText = new Text();
    bodyText.text = body;
    bodyText.fontSize = 0.18;
    bodyText.letterSpacing = 0.02;
    bodyText.color = 0x88a6ff;
    bodyText.fillOpacity = 0;
    bodyText.position.set(x, y - 0.25, z + 0.01);
    bodyText.anchorX = "center";
    bodyText.anchorY = "middle";

    return {
      panel,
      title: titleText,
      body: bodyText,
    };
  }

  dispose() {
    this.heading.dispose();

    for (const item of this.items) {
      item.panel.geometry.dispose();
      (item.panel.material as MeshStandardMaterial).dispose();
      item.title.dispose();
      item.body.dispose();
    }
  }
}
