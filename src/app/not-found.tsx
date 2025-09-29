"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const path = query.trim();
    if (!path) return;
    router.push(path.startsWith("/") ? path : `/${path}`);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg space-y-8 text-center">
        {/* Header: Back button + error tag */}
        <div className="flex items-center justify-start gap-3">
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:shadow-md active:scale-95 transition"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <span className="text-sm text-slate-500">Error · 404</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Halaman tidak ditemukan
        </h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Link mungkin sudah tidak berlaku atau halaman ini sudah dipindahkan.
          Coba kembali ke beranda atau gunakan pencarian.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          {/* <Link
            href="/"
            className="block w-full px-5 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            Kembali ke Home
          </Link> */}
          <Link
            href="/en/apps"
            className="block w-full px-5 py-3 rounded-lg border border-black-200 bg-white text-slate-800 font-medium hover:bg-slate-50 transition"
          >
            Buka Dashboard
          </Link>
        </div>

        {/* Search box */}
        <form onSubmit={handleSearchSubmit} className="mt-6 flex gap-2 w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari route... mis: apps/bmi"
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="px-4 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
          >
            Go
          </button>
        </form>

        {/* Illustration */}
        <div className="mt-10 flex justify-center">
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-64 h-auto"
            aria-hidden
          >
            <rect width="400" height="300" rx="20" fill="#f1f5f9" />
            <circle cx="140" cy="120" r="50" fill="#dbeafe" />
            <path
              d="M110 160c15-20 55-20 80 0"
              stroke="#93c5fd"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect
              x="200"
              y="80"
              width="150"
              height="100"
              rx="12"
              fill="#fff"
              stroke="#e2e8f0"
            />
            <rect
              x="220"
              y="100"
              width="110"
              height="16"
              rx="6"
              fill="#f1f5f9"
            />
            <rect
              x="220"
              y="130"
              width="90"
              height="12"
              rx="6"
              fill="#e2e8f0"
            />
          </svg>
        </div>

        {/* Support link */}
        <p className="text-sm text-slate-500">
          Masih ada masalah?{" "}
          <a
            href="mailto:support@example.com?subject=404%20Report"
            className="underline"
          >
            Hubungi Support
          </a>
        </p>
      </div>
    </div>
  );
}
