"use client";

import { ReactNode, useEffect } from "react";
import { useBottomNav } from "@/src/context/BottomNavContext";

interface NativeToolLayoutProps {
  children: ReactNode;
  title: string;
  onBack: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  bottomSlot?: ReactNode;
  // ✅ Tambahkan opsi background
  background?: "black" | "white" | "transparent";
}

export default function NativeToolLayout({
  children,
  title,
  onBack,
  actionButton,
  bottomSlot,
  background = "white", // default putih
}: NativeToolLayoutProps) {
  const { setHidden } = useBottomNav();

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  // Tentukan kelas background
  const bgClass =
    background === "black"
      ? "bg-black text-white"
      : background === "transparent"
      ? "bg-transparent text-gray-900"
      : "bg-white text-gray-900"; // default

  const headerBgClass =
    background === "black"
      ? "bg-gradient-to-b from-black/80 to-transparent"
      : background === "transparent"
      ? "bg-white/80 backdrop-blur-md"
      : "bg-white/90 backdrop-blur-md";

  const buttonClass =
    background === "black" ? "text-white" : "text-blue-600 hover:text-blue-700";

  const bottomBgClass =
    background === "black"
      ? "bg-black/80 backdrop-blur-md"
      : "bg-white/80 backdrop-blur-md";

  return (
    // ✅ Fullscreen: fixed + inset-0
    <main className={`fixed inset-0 z-50 ${bgClass} overflow-hidden`}>
      <div className="relative w-full h-full flex flex-col">
        {/* Header Native (pt-12 untuk safe area notch) */}
        <header
          className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-12 pb-3 ${headerBgClass}`}
        >
          <button
            onClick={onBack}
            className={`${buttonClass} text-base font-medium`}
          >
            Cancel
          </button>
          <h1
            className={`${
              background === "black" ? "text-white" : "text-gray-900"
            } font-semibold text-base`}
          >
            {title}
          </h1>
          {actionButton ? (
            <button
              onClick={actionButton.onClick}
              disabled={actionButton.disabled}
              className={`${buttonClass} font-medium ${
                actionButton.loading ? "opacity-60" : "opacity-100"
              }`}
            >
              {actionButton.loading ? "Processing..." : actionButton.label}
            </button>
          ) : (
            <div className="w-14" />
          )}
        </header>

        {/* Konten Fitur — tetap muncul setelah upload */}
        <div className="flex-1 flex items-center justify-center p-4">
          {children}
        </div>

        {/* Bottom Controls — tetap muncul selama ada */}
        {bottomSlot && (
          <div
            className={`absolute bottom-0 left-0 right-0 z-10 ${bottomBgClass} p-4 pb-6`}
          >
            {bottomSlot}
          </div>
        )}
      </div>
    </main>
  );
}
