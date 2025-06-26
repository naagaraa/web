"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

type NavItem = {
  label: string;
  href?: string;
  submenus?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "About me", href: "/about" },
  // { label: "Tech Stack", href: "/about" },
  {
    label: "Project",
    submenus: [
      { label: "Academic project", href: "/project/academic" },
      { label: "Open source project", href: "/project/open-source" },
      { label: "Paid project", href: "/project/paid" },
      { label: "Profesional project", href: "/project/profesional" },
    ],
  },
  { label: "Sponsorship", href: "/sponsorship" },
];

export default function NavTabs() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations("About.Story");

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-semibold text-gray-800">
            {t("title")}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 relative">
            {navItems.map(({ label, href, submenus }) =>
              submenus ? (
                <div key={label} className="relative">
                  <button
                    onClick={() => toggleDropdown(label)}
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
                  >
                    {label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === label && (
                    <div className="absolute top-full mt-2 w-44 bg-white border shadow-lg rounded-lg z-50">
                      <ul className="py-2">
                        {submenus.map(({ label, href }) => (
                          <li key={label}>
                            <a
                              href={href}
                              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            >
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {label}
                </a>
              )
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => toggleDropdown("mobile")}
              className="text-gray-700 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {openDropdown === "mobile" && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map(({ label, href, submenus }) => (
              <div key={label}>
                {submenus ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(label)}
                      className="w-full flex justify-between items-center text-gray-800 font-medium py-2"
                    >
                      {label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === label && (
                      <ul className="pl-4 space-y-2 text-sm text-gray-600">
                        {submenus.map(({ label, href }) => (
                          <li key={label}>
                            <a
                              href={href}
                              className="block py-1 hover:text-blue-600"
                            >
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href={href}
                    className="block text-gray-800 font-medium py-2 hover:text-blue-600"
                  >
                    {label}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
