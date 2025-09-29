/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";

type FilterType = "none" | "grayscale" | "sepia" | "invert" | "brightness";

const FILTER_STYLES: Record<FilterType, string> = {
  none: "none",
  grayscale: "grayscale(100%)",
  sepia: "sepia(100%)",
  invert: "invert(100%)",
  brightness: "brightness(150%)",
};

const FILTER_NAMES: Record<FilterType, string> = {
  none: "Original",
  grayscale: "Hitam Putih",
  sepia: "Sepia",
  invert: "Inversi",
  brightness: "Terang",
};

export default function FilterImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("none");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setHidden } = useBottomNav();

  const resetAll = () => {
    setImageSrc(null);
    setActiveFilter("none");
    setHidden(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setActiveFilter("none");
      setHidden(true);
      toast.success("Gambar berhasil diunggah!");
    };
    reader.readAsDataURL(file);
  };

  const applyFilterToCanvas = (filter: FilterType): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!imageSrc) return reject("No image");

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;

      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return reject("Canvas not ready");

        // Ukuran asli
        canvas.width = img.width;
        canvas.height = img.height;

        // Gambar asli
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Ambil pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Terapkan filter secara manual (tanpa CSS)
        switch (filter) {
          case "grayscale":
            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = avg; // R
              data[i + 1] = avg; // G
              data[i + 2] = avg; // B
            }
            break;
          case "sepia":
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189); // R
              data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168); // G
              data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131); // B
            }
            break;
          case "invert":
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 255 - data[i]; // R
              data[i + 1] = 255 - data[i + 1]; // G
              data[i + 2] = 255 - data[i + 2]; // B
            }
            break;
          case "brightness":
            const factor = 1.5;
            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.min(255, data[i] * factor); // R
              data[i + 1] = Math.min(255, data[i + 1] * factor); // G
              data[i + 2] = Math.min(255, data[i + 2] * factor); // B
            }
            break;
          // "none" → no change
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };

      img.onerror = () => reject("Failed to load image");
    });
  };

  const handleDownload = async () => {
    if (!imageSrc) return;

    try {
      const resultUrl = await applyFilterToCanvas(activeFilter);
      const link = document.createElement("a");
      link.download = "filtered-image.png";
      link.href = resultUrl;
      link.click();

      toast.success("Gambar berhasil diunduh!");
      resetAll(); // ✅ keluar fullscreen
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengunduh gambar.");
    }
  };

  // === TAMPILAN AWAL (UPLOAD) ===
  if (!imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-start pt-10 justify-center px-4 pb-16">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Filter Gambar
          </h1>
          <p className="text-gray-600 mb-8">
            Terapkan filter keren langsung di browser — tanpa upload ke server.
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

  // === FULLSCREEN IMMERSIVE MODE ===
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Overlay dengan backdrop blur */}
      <div className="fixed inset-0 z-50 flex flex-col bg-black/20">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

        {/* Konten utama */}
        <div className="relative w-full h-screen flex flex-col bg-white">
          {/* Header: hanya tombol batal */}
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
            <button
              onClick={resetAll}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Batal
            </button>
            <span className="text-sm font-medium text-gray-800">
              {FILTER_NAMES[activeFilter]}
            </span>
            <div className="w-16" /> {/* spacer */}
          </div>

          {/* Preview besar di tengah */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 overflow-hidden">
            <div className="relative w-full max-w-3xl h-full max-h-[70vh] flex items-center justify-center bg-gray-100 rounded-lg">
              <img
                src={imageSrc}
                alt="Preview"
                className="w-full h-full object-contain"
                style={{
                  filter: FILTER_STYLES[activeFilter],
                }}
              />
            </div>
          </div>

          {/* Bottom Sheet: Kontrol filter */}
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {Object.entries(FILTER_NAMES).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key as FilterType)}
                    className={`px-3 py-2 text-xs font-medium rounded whitespace-nowrap flex-shrink-0 ${
                      activeFilter === key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <button
                onClick={handleDownload}
                className="w-full mt-3 py-2.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Terapkan & Unduh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas untuk export */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
