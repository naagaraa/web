"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const onSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale; // replace locale in path
    router.replace(segments.join("/"));
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={onSelectLanguage}
        value={currentLocale}
        className="appearance-none bg-white border border-gray-300 text-sm px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
      >
        <option value="id">🇮🇩 Indonesia</option>
        <option value="en">🇺🇸 English</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
        ▼
      </div>
    </div>
  );
}
