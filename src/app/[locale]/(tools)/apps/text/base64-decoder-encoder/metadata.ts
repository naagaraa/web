// src/app/[locale]/(tools)/apps/base64-tool/metadata.ts
import type { Metadata } from "next";

export async function generateBase64Metadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Encoder & Decoder Base64 Online – Konversi Teks Secara Instan"
      : "Online Base64 Encoder & Decoder – Instant Text Conversion";

  const description =
    locale === "id"
      ? "Encode teks ke format Base64 atau decode Base64 kembali ke teks asli. Semua diproses di browser Anda — cepat, gratis, dan 100% privat."
      : "Encode text to Base64 or decode Base64 back to plain text. All processing happens in your browser — fast, free, and 100% private.";

  const keywords = [
    // English
    "base64 encoder",
    "base64 decoder",
    "encode to base64",
    "decode base64",
    "online base64 tool",
    "text to base64",
    "base64 converter",

    // Indonesian
    "encoder base64",
    "decoder base64",
    "encode ke base64",
    "decode base64",
    "alat base64 online",
    "teks ke base64",
    "konverter base64",
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
