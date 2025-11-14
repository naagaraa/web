import type { Metadata } from "next";

export async function generateCropMetadata(locale: string): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Crop Gambar Online – Potong & Sesuaikan Ukuran"
      : "Image Cropper Online – Crop & Resize Images";

  const description =
    locale === "id"
      ? "Potong gambar secara presisi langsung di browser. Bebas iklan, gratis, dan 100% privat — tidak ada data yang dikirim ke server."
      : "Crop images with precision directly in your browser. Free, no ads, and 100% private — no data ever leaves your device.";

  return {
    title,
    description,
    keywords: [
      "image cropper",
      "crop image online",
      "free image crop tool",
      "photo crop",
      "resize and crop image",
      "online image editor",
      "browser-based image cropper",
      "png crop",
      "jpg crop tool",
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
