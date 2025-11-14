// src/app/[locale]/(tools)/apps/countdown-tool/metadata.ts
import type { Metadata } from "next";

export async function generateCountdownMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Timer Hitung Mundur Online – Gratis & Tanpa Instalasi"
      : "Online Countdown Timer – Free & No Installation";

  const description =
    locale === "id"
      ? "Atur hitung mundur untuk olahraga, memasak, rapat, atau fokus kerja. Dengan alarm suara dan tampilan besar — semua berjalan di browser Anda."
      : "Set a countdown for workouts, cooking, meetings, or focus sessions. With alarm sound and large display — all running in your browser.";

  const keywords = [
    // English
    "countdown timer",
    "online timer",
    "free countdown",
    "browser timer",
    "workout timer",
    "cooking timer",
    "focus countdown",

    // Indonesian
    "timer hitung mundur",
    "hitung mundur online",
    "alarm waktu",
    "timer masak",
    "timer olahraga",
    "alat fokus waktu",
    "pengingat waktu",
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
