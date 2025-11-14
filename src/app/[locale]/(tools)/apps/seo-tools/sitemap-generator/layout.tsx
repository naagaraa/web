import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateSitemapMetadata } from "./metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return generateSitemapMetadata(params.locale);
}

export default function SitemapLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
