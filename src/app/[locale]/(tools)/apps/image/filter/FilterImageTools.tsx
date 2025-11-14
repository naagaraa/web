/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { toast } from "react-hot-toast";
import {
  FILTER_NAMES,
  FilterType,
  useImageFilter,
} from "./hook/useImageFilter";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import { Palette, ShieldCheck } from "lucide-react";

const FILTER_ICONS: Record<FilterType, React.ReactNode> = {
  none: "None",
  grayscale: "Grayscale",
  sepia: "Sepia",
  invert: "Invert",
  brightness: "Brightness",
};

export default function FilterImage() {
  const {
    imageSrc,
    previewKey,
    imgRef,
    canvasRef,
    isProcessing,
    activeFilter,
    filterValues,
    fileInputRef,
    setFilterValues,
    getPreviewFilter,
    handleUpload,
    setActiveFilter,
    resetAll,
    handleDownload,
    DEFAULT_FILTER_VALUES,
  } = useImageFilter();

  // ✅ MODE AWAL: TANPA NATIVE TOOL LAYOUT — konsisten dengan crop & rotate
  if (!imageSrc) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          {/* Header branding */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Palette className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          {/* Judul utama */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Apply photo filters
          </h1>

          {/* Microcopy SaaS */}
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Add artistic effects like grayscale, sepia, and more — all in your
            browser.
          </p>

          {/* CTA utama */}
          <label className="w-full max-w-xs">
            <div className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm">
              Upload an image
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {/* Trust badge */}
          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            100% client-side • No data leaves your device
          </div>
        </div>
      </div>
    );
  }

  // ✅ MODE EDITING: PAKAI NATIVE TOOL LAYOUT
  const canSave = activeFilter !== "none" && !isProcessing;

  return (
    <NativeToolLayout
      title="Filter"
      onBack={resetAll}
      actionButton={{
        label: "Simpan",
        onClick: handleDownload,
        disabled: !canSave,
        loading: isProcessing,
      }}
      contentClassName="bg-gray-50 flex flex-col"
    >
      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-2 min-h-0">
        <div className="relative w-full max-w-3xl h-full max-h-[70vh]">
          {imageSrc && (
            <img
              key={previewKey}
              ref={imgRef}
              src={imageSrc}
              alt="Preview"
              style={{
                filter: getPreviewFilter(),
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </div>

      {/* Kontrol Filter */}
      <div className="px-4 pb-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide snap-x snap-mandatory">
          {Object.entries(FILTER_NAMES).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as FilterType)}
              disabled={isProcessing}
              className={`snap-start shrink-0 flex flex-col items-center justify-center px-3 py-2 text-xs font-medium rounded whitespace-nowrap gap-1 transition-colors ${
                activeFilter === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } ${isProcessing ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <span className="text-[10px]">{name}</span>
            </button>
          ))}
        </div>

        {activeFilter !== "none" && (
          <div className="w-full">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Intensitas</span>
              <span>{filterValues[activeFilter]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filterValues[activeFilter]}
              onChange={(e) =>
                setFilterValues((prev) => ({
                  ...prev,
                  [activeFilter]: Number(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <button
              onClick={() =>
                setFilterValues((prev) => ({
                  ...prev,
                  [activeFilter]: DEFAULT_FILTER_VALUES[activeFilter],
                }))
              }
              className="text-xs text-blue-600 mt-1"
            >
              Reset ke Default
            </button>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </NativeToolLayout>
  );
}
