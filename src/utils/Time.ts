export class Time extends EventTarget {
  start: number;
  current: number;
  elapsed: number;
  delta: number;

  private rafId: number | null;

  constructor() {
    super();

    this.start = performance.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.rafId = null;
    this.tick = this.tick.bind(this);
    this.tick();
  }

  private tick() {
    const now = performance.now();
    this.delta = now - this.current;
    this.current = now;
    this.elapsed = this.current - this.start;

    this.dispatchEvent(new Event("tick"));
    this.rafId = window.requestAnimationFrame(this.tick);
  }

  dispose() {
    if (this.rafId !== null) window.cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
}
