/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";

const CompressImages = () => {
  const [images, setImages] = useState<File[]>([]);
  const [compressedData, setCompressedData] = useState<
    {
      blob: Blob;
      previewUrl: string;
      originalUrl: string;
      name: string;
      originalSize: number;
      compressedSize: number;
    }[]
  >([]);
  const [quality, setQuality] = useState(0.7);
  const [progress, setProgress] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setHidden } = useBottomNav();

  const resetAll = () => {
    setImages([]);
    setCompressedData([]);
    setProgress([]);
    setActiveIndex(0);
    setSplitPosition(0.5);
    setIsCompressing(false);
    setHidden(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
    setCompressedData([]);
    setProgress(new Array(filesArray.length).fill(0));
    setHidden(true);
    toast.success(`${filesArray.length} gambar diunggah.`);
  };

  const compressImage = (
    file: File,
    index: number
  ): Promise<{
    blob: Blob;
    previewUrl: string;
    originalUrl: string;
    name: string;
    originalSize: number;
    compressedSize: number;
  }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const previewUrl = URL.createObjectURL(blob);
              const originalUrl = URL.createObjectURL(file);
              resolve({
                blob,
                previewUrl,
                originalUrl,
                name: file.name,
                originalSize: file.size,
                compressedSize: blob.size,
              });
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleCompress = async () => {
    if (images.length === 0 || isCompressing) return;
    setIsCompressing(true);
    const toastId = toast.loading("Sedang mengompres...");

    try {
      const compressed = await Promise.all(
        images.map((img, index) => compressImage(img, index))
      );
      setCompressedData(compressed);
      toast.dismiss(toastId);
      toast.success("Kompresi berhasil!");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Gagal mengompres gambar.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name.replace(/\.[^/.]+$/, "") + "-compressed.jpg";
    a.click();
    URL.revokeObjectURL(url);

    resetAll();
    setTimeout(() => {
      toast.success("Gambar berhasil diunduh!");
    }, 100);
  };

  const nextImage = () => {
    if (activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
      setSplitPosition(0.5);
    }
  };

  const prevImage = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setSplitPosition(0.5);
    }
  };

  // ✅ Gunakan useCallback agar referensi stabil
  const handleDrag = useCallback(
    (clientX: number) => {
      if (!containerRef.current || !isDragging) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pos = Math.max(0, Math.min(1, x / rect.width));
      setSplitPosition(pos);
    },
    [isDragging]
  );

  const startDrag = (clientX: number) => {
    if (!containerRef.current) return;
    setIsDragging(true);
  };

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse events
  useEffect(() => {
    const move = (e: MouseEvent) => handleDrag(e.clientX);
    const up = () => stopDrag();

    if (isDragging) {
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, handleDrag, stopDrag]);

  // Touch events
  useEffect(() => {
    const move = (e: TouchEvent) => {
      if (e.touches.length > 0) handleDrag(e.touches[0].clientX);
    };
    const end = () => stopDrag();

    if (isDragging) {
      window.addEventListener("touchmove", move);
      window.addEventListener("touchend", end);
    }

    return () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, [isDragging, handleDrag, stopDrag]);

  const setPreset = (q: number) => {
    setQuality(q);
    toast.success(`Kualitas diatur ke ${Math.round(q * 100)}%`);
  };

  if (images.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-900">Kompres Gambar</h1>
            <p className="mt-2 text-gray-600">
              Bandingkan sebelum & sesudah dengan geser.
            </p>
          </div>
          <label className="w-full max-w-xs flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
            Pilih Gambar
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
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
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
            <button
              onClick={resetAll}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Batal
            </button>
            <span className="text-sm font-medium text-gray-800">
              {compressedData.length > 0 ? "Hasil" : "Kompresi"}
            </span>
            {!compressedData.length && (
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className={`text-sm font-medium ${
                  isCompressing ? "text-gray-400" : "text-blue-600"
                }`}
              >
                Proses
              </button>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center p-2 bg-gray-50 overflow-hidden">
            {compressedData.length > 0 ? (
              <div
                ref={containerRef}
                className="relative w-full max-w-3xl h-full max-h-[70vh] overflow-hidden"
                onMouseDown={(e) => startDrag(e.clientX)}
                onTouchStart={(e) => startDrag(e.touches[0].clientX)}
                style={{ cursor: isDragging ? "grabbing" : "ew-resize" }}
              >
                <img
                  src={compressedData[activeIndex]?.originalUrl}
                  alt="Asli"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <div
                  className="absolute top-0 h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    left: 0,
                    width: `${splitPosition * 100}%`,
                    backgroundImage: `url(${compressedData[activeIndex]?.previewUrl})`,
                  }}
                />
                <div
                  className="absolute top-0 h-full w-1 bg-white/80 shadow-md z-10"
                  style={{
                    left: `${splitPosition * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">●</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  Asli
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  Kompres
                </div>
              </div>
            ) : (
              <div className="relative w-full max-w-3xl h-full max-h-[70vh] flex flex-col items-center justify-center">
                <img
                  src={URL.createObjectURL(images[activeIndex])}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 text-sm text-gray-600">
                  {activeIndex + 1} / {images.length}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-white">
            {compressedData.length > 0 ? (
              <div className="px-4 py-3 flex justify-between items-center">
                <div className="flex gap-2">
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        disabled={activeIndex === 0}
                        className="px-3 py-1.5 text-sm bg-gray-100 rounded disabled:opacity-50"
                      >
                        ← Sebelumnya
                      </button>
                      <button
                        onClick={nextImage}
                        disabled={activeIndex === images.length - 1}
                        className="px-3 py-1.5 text-sm bg-gray-100 rounded disabled:opacity-50"
                      >
                        Berikutnya →
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={() =>
                    handleDownload(
                      compressedData[activeIndex].blob,
                      compressedData[activeIndex].name
                    )
                  }
                  className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                >
                  Unduh
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Rendah</span>
                  <span>Kualitas: {Math.round(quality * 100)}%</span>
                  <span>Tinggi</span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={0.95}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreset(0.9)}
                    className={`flex-1 text-xs py-1.5 rounded text-white ${
                      quality >= 0.85
                        ? "bg-blue-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Tinggi (90%)
                  </button>
                  <button
                    onClick={() => setPreset(0.7)}
                    className={`flex-1 text-xs py-1.5 rounded text-white ${
                      quality >= 0.65 && quality < 0.85
                        ? "bg-blue-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Sedang (70%)
                  </button>
                  <button
                    onClick={() => setPreset(0.5)}
                    className={`flex-1 text-xs py-1.5 rounded text-white ${
                      quality < 0.65
                        ? "bg-blue-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Rendah (50%)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
};

export default CompressImages;
