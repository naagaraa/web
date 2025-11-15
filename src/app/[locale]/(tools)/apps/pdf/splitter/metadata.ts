// src/app/[locale]/(tools)/apps/pdf-split/metadata.ts
import type { Metadata } from "next";

export async function generatePdfSplitMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Pisah PDF Online – Ekstrak Halaman Tertentu dari Dokumen PDF"
      : "Split PDF Online – Extract Specific Pages from a PDF Document";

  const description =
    locale === "id"
      ? "Pisahkan atau ekstrak halaman tertentu dari file PDF Anda menjadi dokumen baru. Semua proses terjadi di browser — aman, gratis, dan tanpa mengunggah data ke server."
      : "Split or extract specific pages from your PDF into a new document. All processing happens in your browser — secure, free, and no file uploads to any server.";

  const keywords = [
    // EN
    "split pdf",
    "extract pdf pages",
    "pdf page extractor",
    "separate pdf pages",
    "online pdf splitter",
    "pdf page selector",
    "remove pdf pages",

    // ID
    "pisah pdf",
    "ekstrak halaman pdf",
    "pengambil halaman pdf",
    "pisahkan halaman pdf",
    "pemisah pdf online",
    "pilih halaman pdf",
    "hapus halaman pdf",
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
