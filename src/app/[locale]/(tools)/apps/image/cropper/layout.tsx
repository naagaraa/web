// src/app/[locale]/(tools)/apps/image/converter/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateCropMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateCropMetadata(params.locale);
}

export default function ConverterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
