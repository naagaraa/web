// src/app/[locale]/(web)/layout.tsx
import Header from "@/src/components/layout/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/src/components/ui/footer";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  weight: "400",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // ✅ Load messages for the current locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className={hanken.className}>
        <Header />
        <main className="justify-center min-h-screen gap-10">
          <Toaster position="top-center" />
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
