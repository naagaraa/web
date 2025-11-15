// src/app/[locale]/(tools)/apps/pdf-merge/metadata.ts
import type { Metadata } from "next";

export async function generatePdfMergeMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Gabung PDF Online – Satukan Banyak File PDF Jadi Satu"
      : "Merge PDF Online – Combine Multiple PDFs into One";

  const description =
    locale === "id"
      ? "Gabungkan beberapa file PDF menjadi satu dokumen dalam hitungan detik. Semua proses terjadi di browser — aman, cepat, dan gratis tanpa upload ke server."
      : "Combine multiple PDF files into a single document in seconds. All processing happens in your browser — secure, fast, and free with no server upload.";

  const keywords = [
    // EN
    "merge pdf",
    "combine pdf",
    "join pdf files",
    "pdf merger",
    "online pdf merge",
    "free pdf combiner",
    "unite pdf",

    // ID
    "gabung pdf",
    "satukan pdf",
    "gabung file pdf",
    "penggabung pdf",
    "gabung pdf online",
    "kombinasi pdf",
    "satukan dokumen pdf",
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
