// src/app/[locale]/(tools)/apps/pdf-watermark/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generatePdfWatermarkMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generatePdfWatermarkMetadata(params.locale);
}

export default function PdfWatermarkLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
