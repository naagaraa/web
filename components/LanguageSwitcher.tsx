"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function onSelectLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale; // Ganti locale di URL
    const newPath = segments.join("/");
    router.replace(newPath);
  }

  return (
    <select
      onChange={onSelectLanguage}
      value={currentLocale}
      className="p-2 rounded border"
    >
      <option value="id">🇮🇩 Indonesia</option>
      <option value="en">🇺🇸 English</option>
    </select>
  );
}
