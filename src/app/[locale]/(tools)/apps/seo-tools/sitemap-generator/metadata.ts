import type { Metadata } from "next";

export async function generateSitemapMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Generator Sitemap.xml Gratis – Bantu Google Mengindeks Situs Anda"
      : "Free Sitemap.xml Generator – Help Google Index Your Site";

  const description =
    locale === "id"
      ? "Buat file sitemap.xml valid dalam hitungan detik. Tambahkan URL, atur frekuensi pembaruan, dan salin kode XML untuk submit ke Google Search Console."
      : "Generate a valid sitemap.xml file in seconds. Add URLs, set change frequency, and copy the XML code to submit to Google Search Console.";

  const keywords = [
    // English
    "sitemap.xml generator",
    "create sitemap xml",
    "google sitemap generator",
    "xml sitemap tool",
    "website sitemap creator",
    "free sitemap generator",
    "seo sitemap tool",

    // Indonesian
    "generator sitemap.xml",
    "buat sitemap xml",
    "alat sitemap google",
    "pembuat sitemap website",
    "sitemap untuk seo",
    "alat seo gratis",
    "submit sitemap ke google",
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
      siteName: locale === "id" ? "ToolsSEO.com" : "SEOTools.dev",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
