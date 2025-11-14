import type { Metadata } from "next";

export async function generateWatermarkMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Tambahkan Watermark ke Gambar Online – Gratis & Privat"
      : "Add Watermark to Images Online – Free & Private";

  const description =
    locale === "id"
      ? "Tambahkan teks atau logo sebagai watermark ke gambar Anda langsung di browser. Gratis, tanpa iklan, dan 100% privat — tidak ada data yang dikirim ke server."
      : "Add text or logo watermarks to your images directly in your browser. Free, no ads, and 100% private — no data ever leaves your device.";

  return {
    title,
    description,
    keywords: [
      "image watermark",
      "add watermark online",
      "watermark gambar",
      "free watermark tool",
      "online image watermark",
      "text watermark",
      "logo watermark",
      "protect image copyright",
      "browser-based watermark tool",
      "jpg watermark",
      "png watermark",
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
