// src/app/[locale]/(tools)/apps/pdf-rotate/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generatePdfRotateMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generatePdfRotateMetadata(params.locale);
}

export default function PdfRotateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
