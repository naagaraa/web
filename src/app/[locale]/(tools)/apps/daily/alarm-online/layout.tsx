// src/app/[locale]/(tools)/apps/alarm-tool/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateAlarmMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateAlarmMetadata(params.locale);
}

export default function AlarmLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
