"use client";

import React from "react";
import { useImageTransform } from "../hook/useImageTransform";
import { useRef } from "react";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import {
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  RotateCw as RefreshCwIcon,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function RotateImage() {
  const {
    imageSrc,
    rotation,
    flipX,
    flipY,
    isProcessing,
    imgRef,
    canvasRef,
    handleUpload,
    rotate,
    toggleFlipX,
    toggleFlipY,
    resetTransform,
    resetAll,
    handleDownload,
  } = useImageTransform();
  // Di dalam komponen RotateImage
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Di dalam komponen RotateImage

  // ✅ MODE AWAL: TANPA NATIVE TOOL LAYOUT — konsisten dengan ImageCropTool
  if (!imageSrc) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          {/* Header branding */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <RotateCcw className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          {/* Judul utama */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Rotate & flip images
          </h1>

          {/* Microcopy SaaS */}
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Rotate, flip, and transform your images — all processed in your
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

  // ✅ MODE EDITING: GUNAKAN NATIVE TOOL LAYOUT
  const isTransformed = rotation !== 0 || flipX || flipY;
  const canSave = isTransformed && !isProcessing;

  return (
    <NativeToolLayout
      title="Rotate"
      onBack={resetAll}
      actionButton={{
        label: "Simpan",
        onClick: handleDownload,
        disabled: !canSave,
        loading: isProcessing,
      }}
      topControls={
        <div className="px-2 py-2">
          <div className="flex justify-between gap-2">
            <button
              onClick={resetTransform}
              disabled={!isTransformed || isProcessing}
              className="flex-1 py-2.5 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <RefreshCwIcon className="w-4 h-4" />
              Reset
            </button>

            <button
              onClick={() => rotate(-90)}
              disabled={isProcessing}
              className="flex-1 py-2.5 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => rotate(90)}
              disabled={isProcessing}
              className="flex-1 py-2.5 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleFlipX}
              disabled={isProcessing}
              className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${
                flipX
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FlipHorizontal className="w-4 h-4" />X
            </button>

            <button
              onClick={toggleFlipY}
              disabled={isProcessing}
              className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${
                flipY
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FlipVertical className="w-4 h-4" />Y
            </button>
          </div>
        </div>
      }
      contentClassName="bg-gray-50 flex items-center justify-center p-2"
    >
      <div className="relative w-full max-w-3xl h-full max-h-[70vh]">
        <Image
          ref={imgRef as React.RefObject<HTMLImageElement>}
          src={imageSrc}
          alt="Preview"
          fill
          sizes="100vw"
          className="object-contain"
          style={{
            transform: `rotate(${rotation}deg) scaleX(${
              flipX ? -1 : 1
            }) scaleY(${flipY ? -1 : 1})`,
            transition: "transform 0.15s ease",
          }}
        />
        {/* Opsional: overlay sudut */}
        {rotation !== 0 && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {rotation}°
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </NativeToolLayout>
  );
}
