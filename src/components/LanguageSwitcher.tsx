"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const LANGUAGES: Language[] = [
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  const switchLanguage = useCallback(
    (newLocale: string) => {
      if (newLocale === currentLocale) return;
      const segments = pathname.split("/");
      segments[1] = newLocale;
      router.replace(segments.join("/"));
      setIsOpen(false);
    },
    [currentLocale, pathname, router]
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch language"
      >
        <span aria-hidden="true">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.name}</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown — responsive positioning */}
      {isOpen && (
        <div
          className="absolute left-0 top-full z-10 mt-2 w-full min-w-[12rem] sm:w-48 sm:right-0 sm:left-auto origin-top-left sm:origin-top-right divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="listbox"
          aria-label="Language options"
        >
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              role="option"
              aria-selected={lang.code === currentLocale}
              tabIndex={0}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition cursor-pointer ${
                lang.code === currentLocale
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => switchLanguage(lang.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  switchLanguage(lang.code);
                }
              }}
            >
              <span aria-hidden="true" className="text-lg">
                {lang.flag}
              </span>
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
