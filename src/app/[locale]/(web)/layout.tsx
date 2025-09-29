import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/ui/footer";
import { Toaster } from "react-hot-toast";
import { Hanken_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";

const hanken = Hanken_Grotesk({ weight: "400", subsets: ["latin"] });

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
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="justify-center min-h-screen gap-10">
        <Toaster position="top-center" />
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
