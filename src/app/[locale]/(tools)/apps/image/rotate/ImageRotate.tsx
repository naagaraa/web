/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";

export default function RotateImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0); // dalam derajat: 0, 90, 180, 270
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { setHidden } = useBottomNav();

  const resetAll = () => {
    setImageSrc(null);
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
    setIsProcessing(false);
    setHidden(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setHidden(true);
      toast.success("Gambar berhasil diunggah!");
    };
    reader.readAsDataURL(file);
  };

  const rotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees + 360) % 360);
  };

  const toggleFlipX = () => setFlipX((prev) => !prev);
  const toggleFlipY = () => setFlipY((prev) => !prev);

  const resetTransform = () => {
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
  };

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current || !imgRef.current || isProcessing)
      return;

    setIsProcessing(true);
    const toastId = toast.loading("Sedang memproses...");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = imgRef.current;

    // Hitung ukuran canvas berdasarkan rotasi
    const drawWidth = img.naturalWidth;
    const drawHeight = img.naturalHeight;
    let canvasWidth = img.naturalWidth;
    let canvasHeight = img.naturalHeight;

    if (rotation % 180 !== 0) {
      // Jika rotasi 90/270, tukar lebar & tinggi
      canvasWidth = img.naturalHeight;
      canvasHeight = img.naturalWidth;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Pindah origin ke tengah canvas
    ctx.translate(canvasWidth / 2, canvasHeight / 2);

    // Terapkan rotasi
    ctx.rotate((rotation * Math.PI) / 180);

    // Terapkan flip
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

    // Gambar gambar di tengah (dengan offset karena ukuran asli)
    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `rotated.png`;
      link.href = dataUrl;
      link.click();

      toast.dismiss(toastId);
      toast.success("Gambar berhasil diunduh!");
      resetAll();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Gagal memproses gambar.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Tampilan awal (upload)
  if (!imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-900">Rotate Gambar</h1>
            <p className="mt-2 text-gray-600">
              Putar atau balik gambar sesuai kebutuhan.
            </p>
          </div>
          <label className="w-full max-w-xs flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
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
    <main className="min-h-screen bg-gray-50">
      <div className="fixed inset-0 z-50 flex flex-col bg-black/20">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
        <div className="relative w-full h-screen flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
            <button
              onClick={resetAll}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Batal
            </button>
            <span className="text-sm font-medium text-gray-800">Rotate</span>
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className={`text-sm font-medium ${
                isProcessing ? "text-gray-400" : "text-blue-600"
              }`}
            >
              {isProcessing ? "Memproses..." : "Unduh"}
            </button>
          </div>

          {/* Preview */}
          <div className="flex-1 flex items-center justify-center p-2 bg-gray-50 overflow-hidden">
            <div className="relative w-full max-w-3xl h-full max-h-[70vh] flex items-center justify-center">
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Preview"
                className="w-full h-full object-contain"
                style={{
                  transform: `rotate(${rotation}deg) scaleX(${
                    flipX ? -1 : 1
                  }) scaleY(${flipY ? -1 : 1})`,
                  transition: "transform 0.2s ease",
                }}
              />
              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {rotation}°
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              {/* Rotasi */}
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => rotate(-90)}
                  disabled={isProcessing}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded disabled:opacity-50"
                >
                  ↺ 90°
                </button>
                <button
                  onClick={() => rotate(90)}
                  disabled={isProcessing}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded disabled:opacity-50"
                >
                  ↻ 90°
                </button>
              </div>

              {/* Flip */}
              <div className="flex gap-2">
                <button
                  onClick={toggleFlipX}
                  disabled={isProcessing}
                  className={`flex-1 py-2 text-sm font-medium rounded ${
                    flipX
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  } disabled:opacity-50`}
                >
                  Flip X
                </button>
                <button
                  onClick={toggleFlipY}
                  disabled={isProcessing}
                  className={`flex-1 py-2 text-sm font-medium rounded ${
                    flipY
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  } disabled:opacity-50`}
                >
                  Flip Y
                </button>
              </div>

              {/* Reset */}
              <button
                onClick={resetTransform}
                disabled={isProcessing || (rotation === 0 && !flipX && !flipY)}
                className="w-full py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded disabled:opacity-50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
