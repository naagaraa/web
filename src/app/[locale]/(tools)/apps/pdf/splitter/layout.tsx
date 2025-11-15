// src/app/[locale]/(tools)/apps/pdf-split/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generatePdfSplitMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generatePdfSplitMetadata(params.locale);
}

export default function PdfSplitLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
