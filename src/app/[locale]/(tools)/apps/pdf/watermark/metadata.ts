// src/app/[locale]/(tools)/apps/pdf-watermark/metadata.ts
import type { Metadata } from "next";

export async function generatePdfWatermarkMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Watermark PDF Online – Tambahkan Teks atau Logo ke Dokumen PDF"
      : "PDF Watermark Online – Add Text or Logo to Your PDF Documents";

  const description =
    locale === "id"
      ? "Tambahkan watermark berupa teks (misal: 'DRAFT', 'RAHASIA') atau logo ke file PDF Anda. Semua proses terjadi di browser — aman, cepat, dan gratis tanpa menyimpan data Anda."
      : "Add a text (e.g., 'CONFIDENTIAL', 'DRAFT') or logo watermark to your PDF files. All processing happens in your browser — secure, fast, and free with no data storage.";

  const keywords = [
    // EN
    "pdf watermark",
    "add watermark to pdf",
    "text watermark pdf",
    "logo watermark pdf",
    "online pdf watermark tool",
    "pdf security stamp",
    "confidential pdf",

    // ID
    "watermark pdf",
    "tambah watermark ke pdf",
    "watermark teks pdf",
    "watermark logo pdf",
    "alat watermark pdf online",
    "stempel keamanan pdf",
    "pdf rahasia",
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
