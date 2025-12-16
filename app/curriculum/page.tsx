import type { Metadata } from "next";

import CodeVerse from "../_components/CodeVerse";

export const metadata: Metadata = {
  title: "Curriculum • CodeVerse3D",
  description: "Explore the CodeVerse3D learning path inside the cinematic experience.",
};

export default function CurriculumPage() {
  return <CodeVerse initialBeat="curriculum" />;
}
