// src/app/[locale]/(tools)/apps/pdf-compress/metadata.ts
import type { Metadata } from "next";

export async function generatePdfCompressMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Kompres PDF Online – Perkecil Ukuran File PDF Gratis"
      : "Compress PDF Online – Reduce PDF File Size for Free";

  const description =
    locale === "id"
      ? "Kurangi ukuran file PDF hingga 90% tanpa kehilangan kualitas penting. Semua proses terjadi di browser — aman, cepat, dan gratis."
      : "Reduce your PDF file size by up to 90% without losing essential quality. All processing happens in your browser — secure, fast, and free.";

  const keywords = [
    // EN
    "compress pdf",
    "reduce pdf size",
    "pdf compressor",
    "small pdf file",
    "online pdf compressor",
    "free pdf compression",
    "optimize pdf",

    // ID
    "kompres pdf",
    "perkecil ukuran pdf",
    "kompresi pdf",
    "pdf ukuran kecil",
    "kompres pdf online",
    "kompresi pdf gratis",
    "optimasi pdf",
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
