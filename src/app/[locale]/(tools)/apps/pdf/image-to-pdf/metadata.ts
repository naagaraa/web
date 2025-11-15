// src/app/[locale]/(tools)/apps/image-to-pdf/metadata.ts
import type { Metadata } from "next";

export async function generateImageToPdfMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Konversi Gambar ke PDF Online – Gratis & Aman"
      : "Image to PDF Converter – Free & Secure Online";

  const description =
    locale === "id"
      ? "Ubah JPG, PNG, WebP jadi PDF dalam hitungan detik. 100% di browser, tidak ada upload ke server, dan hasil langsung diunduh."
      : "Convert JPG, PNG, or WebP images to PDF instantly. 100% client-side, no server upload, download result immediately.";

  const keywords = [
    // EN
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "webp to pdf",
    "online image to pdf",
    "free pdf converter",
    "photo to pdf",

    // ID
    "gambar ke pdf",
    "jpg ke pdf",
    "png ke pdf",
    "webp ke pdf",
    "konversi gambar ke pdf",
    "pengubah gambar ke pdf",
    "foto ke pdf",
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
      siteName: locale === "id" ? "ToolsDev.com" : "DevTools.io",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
