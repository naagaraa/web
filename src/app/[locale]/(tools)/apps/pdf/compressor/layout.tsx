// src/app/[locale]/(tools)/apps/pdf-compress/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generatePdfCompressMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generatePdfCompressMetadata(params.locale);
}

export default function PdfCompressLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
