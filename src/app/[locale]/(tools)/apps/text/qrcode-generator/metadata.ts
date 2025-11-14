// src/app/[locale]/(tools)/apps/qr-code-generator/metadata.ts
import type { Metadata } from "next";

export async function generateQrCodeMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Generator QR Code Kustom – Gratis dengan Logo & Warna"
      : "Custom QR Code Generator – Free with Logo & Colors";

  const description =
    locale === "id"
      ? "Buat QR code kustom dengan logo, warna, bingkai, dan bentuk sesuai brand Anda. Semua diproses di browser — 100% gratis dan aman."
      : "Create custom QR codes with your logo, colors, frame, and shape. All processing happens in your browser — 100% free and secure.";

  const keywords = [
    // English
    "qr code generator",
    "custom qr code",
    "qr code with logo",
    "branded qr code",
    "free qr code",
    "online qr generator",
    "colored qr code",

    // Indonesian
    "generator qr code",
    "qr code kustom",
    "qr code dengan logo",
    "qr code branded",
    "qr code gratis",
    "pembuat qr online",
    "qr code berwarna",
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
