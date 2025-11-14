// src/app/[locale]/(tools)/apps/qr-code-reader/metadata.ts
import type { Metadata } from "next";

export async function generateQrReaderMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "QR Code Reader Online – Scan dengan Kamera atau Upload Gambar"
      : "Online QR Code Reader – Scan with Camera or Upload Image";

  const description =
    locale === "id"
      ? "Baca QR code langsung dari kamera atau upload gambar. Semua diproses di browser Anda — cepat, aman, dan 100% privat."
      : "Read QR codes from your camera or by uploading an image. All processing happens in your browser — fast, secure, and 100% private.";

  const keywords = [
    // English
    "qr code reader",
    "scan qr code",
    "online qr scanner",
    "qr code scanner",
    "read qr code online",
    "camera qr scanner",
    "upload qr image",

    // Indonesian
    "pembaca qr code",
    "scan qr code",
    "pemindai qr online",
    "scanner qr code",
    "baca qr code online",
    "pemindai qr kamera",
    "upload gambar qr",
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
