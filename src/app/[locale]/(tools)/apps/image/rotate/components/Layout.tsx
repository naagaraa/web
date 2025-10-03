"use client";

import { useEffect } from "react";
import { useBottomNav } from "@/src/context/BottomNavContext";

interface ImageEditorLayoutProps {
  title: string;
  onCancel: () => void;
  onSave: () => void;
  isProcessing?: boolean;
  children: React.ReactNode; // preview
  controls: React.ReactNode; // bottom controls
}

export default function ImageEditorLayout({
  title,
  onCancel,
  onSave,
  isProcessing = false,
  children,
  controls,
}: ImageEditorLayoutProps) {
  const { setHidden } = useBottomNav();

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="fixed inset-0 z-50 flex flex-col bg-black/20">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
        <div className="relative w-full h-screen flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
            <button
              onClick={onCancel}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Batal
            </button>
            <span className="text-sm font-medium text-gray-800">{title}</span>
            <button
              onClick={onSave}
              disabled={isProcessing}
              className={`text-sm font-medium ${
                isProcessing ? "text-gray-400" : "text-blue-600"
              }`}
            >
              {isProcessing ? "Memproses..." : "Simpan"}
            </button>
          </div>

          {/* Preview area */}
          <div className="flex-1 flex items-center justify-center p-2 bg-gray-50 overflow-hidden">
            <div className="relative w-full max-w-3xl h-full max-h-[70vh] flex items-center justify-center">
              {children}
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">{controls}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
