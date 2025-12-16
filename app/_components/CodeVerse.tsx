"use client";

import { useCallback, useEffect, useRef } from "react";

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

  const scrollToBeat = useCallback((beat: "start" | "curriculum" | "about") => {
    const yByBeat: Record<"start" | "curriculum" | "about", number> = {
      start: 0,
      curriculum: window.innerHeight * 4,
      about: window.innerHeight * 7.5,
    };

    window.scrollTo({ top: yByBeat[beat], behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-[1000vh] bg-black">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full"
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <header className="pointer-events-none fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-white">
        <button
          type="button"
          className="pointer-events-auto text-xs tracking-[0.25em] text-white/80"
          onClick={() => scrollToBeat("start")}
        >
          CODEVERSE3D
        </button>
        <nav className="pointer-events-auto flex items-center gap-6 text-xs text-white/70">
          <button
            type="button"
            className="hover:text-white"
            onClick={() => scrollToBeat("start")}
          >
            Start
          </button>
          <button
            type="button"
            className="hover:text-white"
            onClick={() => scrollToBeat("curriculum")}
          >
            Curriculum
          </button>
          <button
            type="button"
            className="hover:text-white"
            onClick={() => scrollToBeat("about")}
          >
            About
          </button>
        </nav>
      </header>

      <div className="pointer-events-none absolute inset-x-0 top-[75vh] z-20 mx-auto flex max-w-md flex-col items-center gap-3 px-6 text-center text-white/60">
        <div className="text-[11px] uppercase tracking-[0.35em]">
          Scroll
        </div>
        <div className="h-px w-24 bg-white/20" />
      </div>

      <footer className="pointer-events-none fixed bottom-6 left-6 z-20 text-[10px] tracking-[0.22em] text-white/50">
        REALTIME 3D • THREE.JS • GSAP
      </footer>
    </div>
  );
}
