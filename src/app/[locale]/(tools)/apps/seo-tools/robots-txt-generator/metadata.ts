import type { Metadata } from "next";

export async function generateRobotsTxtMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Generator robots.txt Gratis – Atur Crawling Mesin Pencari"
      : "Free robots.txt Generator – Control Search Engine Crawling";

  const description =
    locale === "id"
      ? "Buat file robots.txt secara instan untuk mengatur akses bot mesin pencari ke situs Anda. Preview langsung, salin kode, dan tingkatkan SEO website Anda."
      : "Generate a robots.txt file instantly to control how search engine bots crawl your website. Preview, copy code, and improve your site's SEO in seconds.";

  const keywords = [
    // English
    "robots.txt generator",
    "create robots.txt",
    "seo robots.txt",
    "search engine crawler control",
    "block bots from website",
    "free seo tool",
    "website robots file",

    // Indonesian
    "generator robots.txt",
    "buat robots.txt",
    "atur crawling google",
    "blokir bot mesin pencari",
    "alat seo gratis",
    "file robots untuk website",
    "optimasi robots.txt",
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
