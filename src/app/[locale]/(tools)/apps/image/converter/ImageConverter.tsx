/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";

export default function ImageConverter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setHidden } = useBottomNav();

  const resetAll = () => {
    setImageSrc(null);
    setOutputFormat("png");
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

  const handleConvertDownload = () => {
    if (!imageSrc || !canvasRef.current || isProcessing) return;

    setIsProcessing(true);
    const toastId = toast.loading("Sedang mengonversi...");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const mime = outputFormat === "jpeg" ? "jpeg" : outputFormat;
        const dataUrl = canvas.toDataURL(`image/${mime}`);
        const link = document.createElement("a");
        link.download = `converted.${outputFormat}`;
        link.href = dataUrl;
        link.click();

        toast.dismiss(toastId);
        toast.success("Gambar berhasil diunduh!");

        // ✅ Keluar dari fullscreen setelah unduh
        resetAll();
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Gagal mengonversi gambar.");
      } finally {
        setIsProcessing(false);
      }
    };

    img.onerror = () => {
      toast.dismiss(toastId);
      toast.error("Gagal memproses gambar.");
      setIsProcessing(false);
    };
  };

  // Tampilan awal (upload)
  if (!imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-900">
              Image Converter
            </h1>
            <p className="mt-2 text-gray-600">
              Ubah format gambar ke PNG, JPEG, atau WEBP — langsung di browser.
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
            <span className="text-sm font-medium text-gray-800">Konversi</span>
            <button
              onClick={handleConvertDownload}
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
                src={imageSrc}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {outputFormat.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Bottom Controls — PRESET FORMAT */}
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setOutputFormat("png")}
                  className={`flex-1 text-xs py-2 rounded font-medium ${
                    outputFormat === "png"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  PNG
                </button>
                <button
                  onClick={() => setOutputFormat("jpeg")}
                  className={`flex-1 text-xs py-2 rounded font-medium ${
                    outputFormat === "jpeg"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  JPEG
                </button>
                <button
                  onClick={() => setOutputFormat("webp")}
                  className={`flex-1 text-xs py-2 rounded font-medium ${
                    outputFormat === "webp"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  WEBP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
