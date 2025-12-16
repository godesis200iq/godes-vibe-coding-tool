export class Sizes extends EventTarget {
  width: number;
  height: number;
  pixelRatio: number;

  private handleResize: () => void;

  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.handleResize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.dispatchEvent(new Event("resize"));
    };

    window.addEventListener("resize", this.handleResize, { passive: true });
  }

  dispose() {
    window.removeEventListener("resize", this.handleResize);
  }
}
