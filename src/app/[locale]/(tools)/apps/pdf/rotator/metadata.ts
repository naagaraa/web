// src/app/[locale]/(tools)/apps/pdf-rotate/metadata.ts
import type { Metadata } from "next";

export async function generatePdfRotateMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Putar PDF Online – Atur Rotasi Halaman PDF (0°, 90°, 180°, 270°)"
      : "Rotate PDF Online – Adjust Page Rotation (0°, 90°, 180°, 270°)";

  const description =
    locale === "id"
      ? "Putar halaman PDF sesuai kebutuhan — 0°, 90°, 180°, atau 270°. Semua proses terjadi di browser, aman dan gratis tanpa upload ke server."
      : "Rotate individual PDF pages to 0°, 90°, 180°, or 270° as needed. All processing happens in your browser — secure, private, and free.";

  const keywords = [
    // EN
    "rotate pdf",
    "pdf page rotation",
    "flip pdf page",
    "adjust pdf orientation",
    "online pdf rotator",
    "pdf rotate tool",
    "change pdf page direction",

    // ID
    "putar pdf",
    "rotasi halaman pdf",
    "balik orientasi pdf",
    "atur arah pdf",
    "putar pdf online",
    "alat putar pdf",
    "ganti arah halaman pdf",
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
