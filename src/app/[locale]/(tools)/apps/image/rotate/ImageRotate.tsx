"use client";

import ImageEditorLayout from "./components/Layout";
import EditorPreview from "./components/Preview";
import EditorControls from "./components/Control";
import { useImageTransform } from "./hook/useImageTransform";
import Image from "next/image";
import {
  LucideFlipHorizontal,
  LucideFlipVertical,
  LucideRefreshCw,
  LucideRotateCcw,
  LucideRotateCw,
} from "lucide-react";

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

  if (!imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-start pt-10 justify-center px-4 pb-16">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Rotate Gambar
          </h1>
          <p className="text-gray-600 mb-8">
            Terapkan Rotate keren langsung di browser — tanpa upload ke server.
          </p>
          <label className="w-full max-w-xs mx-auto flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
            Pilih Gambar
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
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
        title="Rotate"
        onCancel={resetAll}
        onSave={handleDownload}
        isProcessing={isProcessing}
        controls={
          <EditorControls>
            <div className="flex justify-between gap-2">
              <button
                onClick={resetTransform}
                disabled={isProcessing || (rotation === 0 && !flipX && !flipY)}
                className="flex-1 py-2.5 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <LucideRefreshCw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={() => rotate(-90)}
                disabled={isProcessing}
                className="flex-1 py-2.5 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <LucideRotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => rotate(90)}
                disabled={isProcessing}
                className="flex-1 py-2.5 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <LucideRotateCw className="w-4 h-4" />
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
                <LucideFlipHorizontal className="w-4 h-4" />X
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
                <LucideFlipVertical className="w-4 h-4" />Y
              </button>
            </div>
          </EditorControls>
        }
      >
        <EditorPreview overlay={`${rotation}°`}>
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
        </EditorPreview>
      </ImageEditorLayout>

      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
