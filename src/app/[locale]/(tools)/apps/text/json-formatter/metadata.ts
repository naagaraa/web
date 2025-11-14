// src/app/[locale]/(tools)/apps/json-formatter/metadata.ts
import type { Metadata } from "next";

export async function generateJsonFormatterMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Formatter JSON Online – Format & Minify JSON Secara Instan"
      : "Online JSON Formatter – Beautify & Minify JSON Instantly";

  const description =
    locale === "id"
      ? "Format ulang (beautify) atau perkecil (minify) kode JSON Anda secara langsung di browser. Validasi otomatis, salin hasil, dan 100% gratis tanpa menyimpan data Anda."
      : "Beautify or minify your JSON code instantly in the browser. Auto-validate, copy result, and 100% free with no data storage.";

  const keywords = [
    // English
    "json formatter",
    "beautify json",
    "minify json",
    "json validator",
    "online json tool",
    "json pretty print",
    "free json formatter",

    // Indonesian
    "formatter json",
    "format json",
    "perkecil json",
    "validasi json",
    "alat json online",
    "json rapi",
    "formatter json gratis",
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
