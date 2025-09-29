// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
});

// Export the type for use in components
export type Locale = (typeof routing.locales)[number];
