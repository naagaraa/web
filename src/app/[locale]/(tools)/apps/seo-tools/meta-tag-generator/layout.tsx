// src/app/[locale]/(tools)/apps/meta-tag-generator/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateMetaTagMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateMetaTagMetadata(params.locale);
}

export default function MetaTagLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
