// src/app/[locale]/(tools)/apps/filter/metadata.ts
import type { Metadata } from "next";

export async function generateFilterMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Filter Gambar Online – Edit & Terapkan Efek Secara Instan"
      : "Online Image Filter – Apply Photo Effects Instantly";

  const description =
    locale === "id"
      ? "Terapkan filter foto seperti grayscale, sepia, blur, dan lainnya langsung di browser. Gratis, cepat, dan 100% privat — tidak ada data yang dikirim ke server."
      : "Apply photo filters like grayscale, sepia, blur, and more directly in your browser. Free, fast, and 100% private — no data ever leaves your device.";

  const keywords = [
    // English
    "image filter tool",
    "photo filter online",
    "apply image effects",
    "online photo editor",
    "grayscale image",
    "sepia filter",
    "blur image online",
    "free image filter",
    "browser-based image filter",

    // Indonesian
    "filter gambar online",
    "edit foto dengan filter",
    "efek gambar online",
    "editor foto gratis",
    "ubah ke hitam putih",
    "filter sepia online",
    "blur gambar",
    "alat filter gambar",
    "edit gambar di browser",
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
