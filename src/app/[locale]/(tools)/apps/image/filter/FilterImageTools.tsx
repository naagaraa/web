/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { toast } from "react-hot-toast";
import {
  FILTER_NAMES,
  FilterType,
  useImageFilter,
} from "./hook/useImageFilter";
import ImageEditorLayout from "./components/Layout";
import EditorControls from "./components/Control";
import EditorPreview from "./components/Preview";
import {
  LuImage,
  LuPalette,
  LuSun,
  LuContrast,
  LuDownload,
} from "react-icons/lu";

const FILTER_ICONS: Record<FilterType, React.ReactNode> = {
  none: <LuImage className="w-3.5 h-3.5" />,
  grayscale: <LuPalette className="w-3.5 h-3.5" />,
  sepia: <LuSun className="w-3.5 h-3.5" />,
  invert: <LuContrast className="w-3.5 h-3.5" />,
  brightness: <LuSun className="w-3.5 h-3.5" />,
};

export default function FilterImage() {
  const {
    imageSrc,
    previewKey, // ✅ gunakan ini
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

  if (!imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-start pt-10 justify-center px-4 pb-16">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Filter Gambar Artistik
          </h1>
          <p className="text-gray-600 mb-8">
            Terapkan efek langsung di browser!
          </p>
          <label className="w-full max-w-xs mx-auto flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
            Pilih Gambar
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              ref={fileInputRef}
              className="hidden"
            />
          </label>
        </div>
      </main>
    );
  }

  return (
    <>
      <ImageEditorLayout
        title="Filter Gambar"
        onCancel={resetAll}
        onSave={handleDownload}
        isProcessing={isProcessing}
        controls={
          <EditorControls>
            <div className="w-full">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
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
                    {FILTER_ICONS[key as FilterType]}
                    <span>{name}</span>
                  </button>
                ))}
              </div>

              {activeFilter !== "none" && (
                <div className="w-full mt-2">
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
          </EditorControls>
        }
      >
        <EditorPreview>
          {imageSrc && (
            <img
              key={previewKey} // ✅ INI YANG MEMASTIKAN FRESH RENDER
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
        </EditorPreview>
      </ImageEditorLayout>

      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
