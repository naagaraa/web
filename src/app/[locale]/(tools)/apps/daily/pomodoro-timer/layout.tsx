// src/app/[locale]/(tools)/apps/pomodoro-tool/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generatePomodoroMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generatePomodoroMetadata(params.locale);
}

export default function PomodoroLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
