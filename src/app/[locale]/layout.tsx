import type { Metadata } from "next";
import "../favicon.ico";
import "./globals.css";
import "swiper/css";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/src/components/layout/Header";
import { SkeletonTheme } from "react-loading-skeleton";
import { Hanken_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";

export const metadata: Metadata = {
  title: "Eka Jaya Nagara - Software Developer",
  description: "Freelance and Software Developer based in Bekasi",
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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={hanken.className}>
        <NextIntlClientProvider>
          <Header />
          <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
            <main className="justify-center min-h-screen gap-10 mt-24">
              <Toaster position="top-center" />
              {children}
            </main>
          </SkeletonTheme>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
