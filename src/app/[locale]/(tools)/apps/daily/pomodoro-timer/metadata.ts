// src/app/[locale]/(tools)/apps/pomodoro-tool/metadata.ts
import type { Metadata } from "next";

export async function generatePomodoroMetadata(
  locale: string
): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Pomodoro Timer Online – Fokus 25 Menit, Istirahat 5 Menit"
      : "Online Pomodoro Timer – Focus 25min, Break 5min";

  const description =
    locale === "id"
      ? "Tingkatkan produktivitas dengan teknik Pomodoro: 25 menit fokus, 5 menit istirahat. Tanpa instalasi, gratis, dan berjalan sepenuhnya di browser Anda."
      : "Boost your productivity with the Pomodoro Technique: 25 minutes focus, 5 minutes break. No installation, free, and runs entirely in your browser.";

  const keywords = [
    // English
    "pomodoro timer",
    "focus timer",
    "productivity timer",
    "pomodoro technique",
    "online pomodoro",
    "study timer",
    "work timer",

    // Indonesian
    "timer pomodoro",
    "teknik pomodoro",
    "timer fokus",
    "alat produktivitas",
    "pomodoro online",
    "timer belajar",
    "timer kerja",
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
