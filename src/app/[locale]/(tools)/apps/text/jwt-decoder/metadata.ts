// src/app/[locale]/(tools)/apps/jwt-decoder/metadata.ts
import type { Metadata } from "next";

export async function generateJwtDecoderMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "JWT Decoder Online – Decode Token Secara Instan"
      : "Online JWT Decoder – Decode Tokens Instantly";

  const description =
    locale === "id"
      ? "Decode token JWT Anda secara langsung di browser. Lihat isi header dan payload dalam format JSON yang mudah dibaca. 100% gratis, aman, dan tidak menyimpan data Anda."
      : "Decode your JWT tokens instantly in the browser. View header and payload in human-readable JSON format. 100% free, secure, and no data is stored.";

  const keywords = [
    // English
    "jwt decoder",
    "decode jwt token",
    "jwt token analyzer",
    "online jwt tool",
    "jwt header payload",
    "jwt debugger",
    "free jwt decoder",

    // Indonesian
    "decoder jwt",
    "decode token jwt",
    "analisis token jwt",
    "alat jwt online",
    "header dan payload jwt",
    "debugger jwt",
    "decoder jwt gratis",
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
