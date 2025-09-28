// src/app/[locale]/(web)/layout.tsx
import type { Metadata } from "next";
import "../../favicon.ico";
import "../../globals.css";
import Header from "@/src/components/layout/Header";
import { Hanken_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/src/components/ui/footer";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "My PWA App",
  description: "Next.js 14 PWA using App Router",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0f172a",
};

const hanken = Hanken_Grotesk({
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // ✅ Load messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={hanken.className}>
        {/* ✅ Wrap everything that might use next-intl hooks in Client Components */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="justify-center min-h-screen gap-10">
            <Toaster position="top-center" />
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
