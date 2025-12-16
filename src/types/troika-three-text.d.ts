declare module "troika-three-text" {
  import { Mesh } from "three";

  export class Text extends Mesh {
    text: string;
    fontSize: number;
    maxWidth?: number;
    letterSpacing?: number;

    color?: number | string;

    outlineWidth?: number;
    outlineColor?: number | string;

    fillOpacity?: number;

    anchorX?: number | "left" | "center" | "right";
    anchorY?: number | "top" | "middle" | "bottom";

    sync(): void;
    dispose(): void;
  }
}
