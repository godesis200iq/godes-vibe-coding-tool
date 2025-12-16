import type { Metadata } from "next";

import CodeVerse from "../_components/CodeVerse";

export const metadata: Metadata = {
  title: "Mission • CodeVerse3D",
  description: "Join the mission in CodeVerse3D.",
};

export default function MissionPage() {
  return <CodeVerse initialBeat="mission" />;
}
