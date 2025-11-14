// src/app/[locale]/(tools)/apps/json-formatter/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateJsonFormatterMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateJsonFormatterMetadata(params.locale);
}

export default function JsonFormatterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
