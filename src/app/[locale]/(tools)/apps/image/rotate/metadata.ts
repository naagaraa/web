// src/app/[locale]/(tools)/apps/rotate/metadata.ts
import type { Metadata } from "next";

export async function generateRotateMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Alat Rotasi & Flip Gambar Online – Gratis & Cepat"
      : "Online Image Rotate & Flip Tool – Free & Fast";

  const description =
    locale === "id"
      ? "Putar, balik, dan sesuaikan gambar Anda secara online tanpa instalasi. Dukungan rotasi 90°, 180°, flip horizontal/vertikal. 100% gratis, aman, dan berbasis browser."
      : "Rotate, flip, and adjust your images online—no installation needed. Supports 90°, 180° rotation and horizontal/vertical flipping. 100% free, secure, and browser-based.";

  const keywords = [
    "image rotate tool",
    "rotate image online",
    "flip image online",
    "image rotation tool",
    "free image editor",
    "rotate photo 90 degrees",
    "flip horizontal vertical image",
    "online image transformer",
    "alat rotasi gambar",
    "putar gambar online",
    "balik gambar online",
    "edit gambar gratis",
    "putar foto 90 derajat",
    "flip horizontal vertikal gambar",
    "alat edit gambar online",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      siteName: locale === "id" ? "ToolsGambar.com" : "ImageTools.dev",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
