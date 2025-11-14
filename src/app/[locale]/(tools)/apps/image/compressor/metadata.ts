import type { Metadata } from "next";

export async function generateCompressorMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Kompres Gambar Online – Kurangi Ukuran File"
      : "Image Compressor Online – Reduce File Size";

  const description =
    locale === "id"
      ? "Kompres gambar tanpa kehilangan kualitas berlebihan. Proses 100% di browser, gratis, dan privat — tidak ada unggahan ke server."
      : "Compress images without heavy quality loss. Processed 100% in your browser — free, private, and no uploads.";

  return {
    title,
    description,
    keywords: [
      "image compressor",
      "compress image online",
      "reduce image size",
      "jpg compressor",
      "png compressor",
      "webp compressor",
      "online image tool",
      "free image compressor",
      "browser-based image compression",
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
