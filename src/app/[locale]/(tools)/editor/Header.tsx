// src/app/[locale]/(tools)/apps/editor/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { User, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/dev-to.svg";
import SearchBar from "./components/search/SearchBar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-colors duration-200
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
            : "bg-transparent"
        }
      `}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="font-semibold text-gray-900 text-base">MyTools</span>
        </Link>

        {/* Desktop Search */}
        <div className="flex-1 mx-4 max-w-lg hidden md:block">
          <SearchBar />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Profile */}
          <button className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <SearchBar isMobile onClose={() => setIsSearchOpen(false)} />
      )}
    </header>
  );
}
