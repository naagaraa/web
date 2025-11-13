// src/app/[locale]/(tools)/apps/editor/components/SearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { searchableItems, SearchableItem } from "../../lib/searchData";

interface SearchBarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function SearchBar({
  isMobile = false,
  onClose,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);

  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";

  // Real-time search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const results = searchableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );

    setSearchResults(results.slice(0, 8)); // max 8 results
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const first = searchResults[0];
      setSearchQuery("");
      setSearchResults([]);
      onClose?.();
      router.push(`/${locale}/${first.slug}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-gray-900 font-medium">Search Tools</h2>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, categories..."
              autoFocus
              className="w-full rounded-lg border border-gray-200 py-3 px-4 pr-10 text-gray-800 outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery && searchResults.length > 0 && (
            <div className="mt-3 max-h-60 overflow-auto">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/${item.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="relative w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full rounded-full bg-white/70 border border-gray-200/50 py-2 pl-4 pr-10 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:bg-white focus:border-gray-300 focus:ring-0 transition-all backdrop-blur-sm"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {searchQuery && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-auto">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/${item.slug}`}
                onClick={clearSearch}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-500">{item.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">No results.</div>
          )}
        </div>
      )}
    </div>
  );
}
