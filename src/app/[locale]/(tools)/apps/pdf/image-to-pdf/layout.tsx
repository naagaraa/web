// src/app/[locale]/(tools)/apps/image-to-pdf/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateImageToPdfMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateImageToPdfMetadata(params.locale);
}

export default function ImageToPdfLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
