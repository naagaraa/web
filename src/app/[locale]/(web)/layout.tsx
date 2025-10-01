// src/app/[locale]/layout.tsx
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/ui/footer";
import { Toaster } from "react-hot-toast";

import type { ReactNode } from "react";
import { HeroObserverProvider } from "@/src/context/HeroObserverContext"; // ✅
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HeroObserverProvider>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </HeroObserverProvider>
    </NextIntlClientProvider>
  );
}
