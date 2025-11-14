// src/app/[locale]/(tools)/apps/base64-tool/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateBase64Metadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateBase64Metadata(params.locale);
}

export default function Base64Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
