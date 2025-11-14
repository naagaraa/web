// src/app/[locale]/(tools)/apps/jwt-decoder/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateJwtDecoderMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateJwtDecoderMetadata(params.locale);
}

export default function JwtDecoderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
