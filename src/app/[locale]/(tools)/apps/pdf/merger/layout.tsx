// src/app/[locale]/(tools)/apps/pdf-merge/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generatePdfMergeMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generatePdfMergeMetadata(params.locale);
}

export default function PdfMergeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
