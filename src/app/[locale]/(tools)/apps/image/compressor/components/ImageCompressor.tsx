/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetAll = () => {
    setImages([]);
    setCompressedData([]);
    setActiveIndex(0);
    setSplitPosition(0.5);
    setIsCompressing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
    setCompressedData([]);
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
    setTimeout(() => toast.success("Gambar berhasil diunduh!"), 100);
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

  // === MODE AWAL: UPLOAD ===
  if (images.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-20">
          <div className="text-center max-w-md">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Kompres Gambar
            </h1>
            <p className="text-sm text-gray-600 mb-10">
              Bandingkan sebelum & sesudah dengan geser.
            </p>
            <label className="w-full max-w-xs">
              <div className="w-full py-3.5 bg-blue-600 text-white text-center rounded-xl font-medium transition-colors active:opacity-90">
                Pilih Gambar
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </main>
    );
  }

  // === MODE KOMPRESI / HASIL ===
  return (
    <>
      <NativeToolLayout
        title={compressedData.length > 0 ? "Hasil" : "Kompresi"}
        onBack={resetAll}
        actionButton={
          !compressedData.length
            ? {
                label: "Proses",
                onClick: handleCompress,
                disabled: isCompressing,
                loading: isCompressing,
              }
            : undefined
        }
        contentClassName="bg-gray-50"
      >
        {compressedData.length > 0 ? (
          // HASIL: SPLIT VIEW
          <div className="h-full flex flex-col">
            <div
              ref={containerRef}
              className="flex-1 relative overflow-hidden flex items-center justify-center"
              onMouseDown={(e) => startDrag(e.clientX)}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              style={{ cursor: isDragging ? "grabbing" : "ew-resize" }}
            >
              <div className="w-full h-full max-h-[70vh] relative">
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
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
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
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex justify-between items-center">
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
            </div>
          </div>
        ) : (
          // PREVIEW SEBELUM KOMPRES
          <div className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center p-2">
              <div className="w-full h-full max-h-[70vh] flex items-center justify-center">
                <img
                  src={URL.createObjectURL(images[activeIndex])}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="absolute bottom-4 text-sm text-gray-600">
                {activeIndex + 1} / {images.length}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white space-y-3">
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
                    quality < 0.65 ? "bg-blue-600" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Rendah (50%)
                </button>
              </div>
            </div>
          </div>
        )}
      </NativeToolLayout>

      <canvas ref={canvasRef} className="hidden" />
    </>
  );
};

export default CompressImages;
