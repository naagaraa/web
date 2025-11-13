// src/app/[locale]/(tools)/apps/layout.tsx
import type { Metadata } from "next";
import AppLayoutClient from "../AppLayoutClient";

// Optional: SEO metadata
export const metadata: Metadata = {
  title: "Alat Digital | Home",
  description: "Kumpulan alat produktivitas untuk kesehatan & kerja.",
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayoutClient>{children}</AppLayoutClient>;
}
