"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import {
  BEATS,
  SCROLL_PAGES,
  TIMELINE_TOTAL,
  type Beat,
} from "@/src/animations/scrollTimeline";
import { Experience } from "@/src/canvas/Experience";

export default function CodeVerse({
  initialBeat = "start",
}: {
  initialBeat?: Beat;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const experience = new Experience({ canvas });

    return () => {
      experience.dispose();
    };
  }, []);

  const scrollToBeat = useCallback((beat: Beat, behavior: ScrollBehavior) => {
    const progress = BEATS[beat] / TIMELINE_TOTAL;
    const targetY = progress * window.innerHeight * SCROLL_PAGES;

    window.scrollTo({ top: targetY, behavior });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    requestAnimationFrame(() => {
      scrollToBeat(initialBeat, "auto");
    });
  }, [initialBeat, scrollToBeat]);

  return (
    <div className="relative min-h-[1200vh] bg-black">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full"
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <header className="pointer-events-none fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-white">
        <Link
          href="/"
          className="pointer-events-auto text-xs tracking-[0.25em] text-white/80 hover:text-white"
        >
          CODEVERSE3D
        </Link>
        <nav className="pointer-events-auto flex items-center gap-6 text-xs text-white/70">
          <Link className="hover:text-white" href="/">
            Start
          </Link>
          <Link className="hover:text-white" href="/curriculum">
            Curriculum
          </Link>
          <Link className="hover:text-white" href="/about">
            About
          </Link>
          <Link className="hover:text-white" href="/mission">
            Mission
          </Link>
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

      <div className="sr-only">
        CodeVerse3D is a scroll-driven, real-time 3D coding education experience.
      </div>
    </div>
  );
}
