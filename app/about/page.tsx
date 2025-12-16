import type { Metadata } from "next";

import CodeVerse from "../_components/CodeVerse";

export const metadata: Metadata = {
  title: "About • CodeVerse3D",
  description: "What CodeVerse3D is and why it exists.",
};

export default function AboutPage() {
  return <CodeVerse initialBeat="about" />;
}
