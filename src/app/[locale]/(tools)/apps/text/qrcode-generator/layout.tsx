// src/app/[locale]/(tools)/apps/qr-code-generator/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateQrCodeMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateQrCodeMetadata(params.locale);
}

export default function QrCodeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
