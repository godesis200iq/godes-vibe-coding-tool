"use client";

import { useEffect, useRef } from "react";

import { Experience } from "@/src/canvas/Experience";

export default function CodeVerse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const experience = new Experience({ canvas });

    return () => {
      experience.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-[600vh] bg-black">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full"
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <header className="pointer-events-none fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-white">
        <div className="pointer-events-auto text-xs tracking-[0.25em] text-white/80">
          CODEVERSE3D
        </div>
        <nav className="pointer-events-auto flex items-center gap-6 text-xs text-white/70">
          <a className="hover:text-white" href="#">
            Start
          </a>
          <a className="hover:text-white" href="#">
            Curriculum
          </a>
          <a className="hover:text-white" href="#">
            About
          </a>
        </nav>
      </header>

      <div className="pointer-events-none absolute inset-x-0 top-[75vh] z-20 mx-auto flex max-w-md flex-col items-center gap-3 px-6 text-center text-white/60">
        <div className="text-[11px] uppercase tracking-[0.35em]">
          Scroll
        </div>
        <div className="h-px w-24 bg-white/20" />
      </div>
    </div>
  );
}
