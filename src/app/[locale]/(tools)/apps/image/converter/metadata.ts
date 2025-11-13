// src/app/[locale]/(tools)/apps/image/converter/metadata.ts
import type { Metadata } from "next";

export async function generateConverterMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id" ? "Konverter Gambar Online" : "Image Converter Online";
  const description =
    locale === "id"
      ? "Ubah format gambar ke PNG, JPEG, WebP langsung di browser. Gratis & privat."
      : "Convert images to PNG, JPEG, WebP directly in your browser. Free & private.";

  return {
    title,
    description,
    keywords: [
      "image converter",
      "png to jpg",
      "webp converter",
      "online image tool",
    ],
    openGraph: { title, description, type: "website" },
  };
}
