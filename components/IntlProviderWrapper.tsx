"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export default function IntlProviderWrapper({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
