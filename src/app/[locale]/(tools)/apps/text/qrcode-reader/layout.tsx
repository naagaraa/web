// src/app/[locale]/(tools)/apps/qr-code-reader/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateQrReaderMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateQrReaderMetadata(params.locale);
}

export default function QrReaderLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
