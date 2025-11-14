// src/app/[locale]/(tools)/apps/alarm-tool/metadata.ts
import type { Metadata } from "next";

export async function generateAlarmMetadata(locale: string): Promise<Metadata> {
  const title =
    locale === "id"
      ? "Alarm Online Gratis – Setel Alarm di Browser"
      : "Free Online Alarm – Set Browser Timer Alarm";

  const description =
    locale === "id"
      ? "Setel alarm langsung di browser Anda dengan suara kustom dan pengulangan. Tidak perlu instalasi, 100% gratis, dan berjalan sepenuhnya di perangkat Anda."
      : "Set an alarm directly in your browser with custom sound and repeat options. No installation needed — 100% free and runs entirely on your device.";

  const keywords = [
    // English
    "online alarm",
    "browser alarm",
    "set alarm online",
    "free alarm tool",
    "timer alarm",
    "web alarm clock",
    "alarm with sound",

    // Indonesian
    "alarm online",
    "alarm di browser",
    "setel alarm gratis",
    "alat alarm web",
    "jam alarm online",
    "alarm dengan suara",
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
