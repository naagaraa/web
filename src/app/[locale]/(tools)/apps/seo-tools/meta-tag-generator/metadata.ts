// src/app/[locale]/(tools)/apps/meta-tag-generator/metadata.ts
import type { Metadata } from "next";

export async function generateMetaTagMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Generator Meta Tag Gratis – Optimalkan SEO Website Anda"
      : "Free Meta Tag Generator – Optimize Your Website SEO";

  const description =
    locale === "id"
      ? "Buat meta tag SEO (title, description, Open Graph, Twitter) dengan cepat dan mudah. Preview langsung, salin kode HTML, dan tingkatkan visibilitas website Anda di Google dan media sosial."
      : "Generate SEO meta tags (title, description, Open Graph, Twitter) in seconds. Preview instantly, copy HTML code, and boost your site’s visibility on Google and social media.";

  const keywords = [
    // English
    "meta tag generator",
    "seo meta tags",
    "open graph generator",
    "twitter card generator",
    "html meta tags",
    "website seo tool",
    "free meta tag tool",
    "meta description generator",

    // Indonesian
    "generator meta tag",
    "meta tag seo",
    "pembuat meta tag",
    "alat seo gratis",
    "meta description",
    "open graph indonesia",
    "kartu twitter",
    "optimasi seo website",
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
