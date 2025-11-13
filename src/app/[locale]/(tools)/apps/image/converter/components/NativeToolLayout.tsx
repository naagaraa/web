// src/app/[locale]/(tools)/apps/components/NativeToolLayout.tsx
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
  topControls?: ReactNode; // ✅ DITAMBAHKAN
}

export default function NativeToolLayout({
  children,
  title,
  onBack,
  actionButton,
  topControls, // ✅ DITAMBAHKAN
}: NativeToolLayoutProps) {
  const { setHidden } = useBottomNav();

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/20">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
      <div className="relative w-full h-screen flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
          <button
            onClick={onBack}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Batal
          </button>
          <span className="text-sm font-medium text-gray-800">{title}</span>
          {actionButton ? (
            <button
              onClick={actionButton.onClick}
              disabled={actionButton.disabled}
              className={`text-sm font-medium ${
                actionButton.disabled ? "text-gray-400" : "text-blue-600"
              }`}
            >
              {actionButton.loading ? "Memproses..." : actionButton.label}
            </button>
          ) : (
            <div className="w-14" />
          )}
        </div>

        {/* ✅ Top Controls (opsional) */}
        {topControls && (
          <div className="px-4 py-2 border-b border-gray-100">
            {topControls}
          </div>
        )}

        {/* Konten */}
        <div className="flex-1 flex items-center justify-center p-2 bg-gray-50 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
