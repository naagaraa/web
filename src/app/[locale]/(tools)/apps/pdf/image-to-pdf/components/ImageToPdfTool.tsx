// src/app/tools/image-to-pdf/ImageToPdfTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";
import jsPDF from "jspdf";

type PageSize = "a4" | "letter" | "legal" | "custom";

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export default function ImageToPdfTool() {
  const [images, setImages] = useState<{ src: string; file: File }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("image-to-pdf");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [customWidth, setCustomWidth] = useState("595");
  const [customHeight, setCustomHeight] = useState("842");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { setHidden } = useBottomNav();
  const uniqueId = useId();

  useEffect(() => {
    setHidden(true);
    return () => {
      setHidden(false);
      // Tidak perlu revoke di sini, karena:
      // - Saat unmount, browser otomatis bersihkan object URLs
      // - Atau kita revoke manual via removeImage / handleReset
    };
  }, [setHidden]); // ← hanya `setHidden`, bukan `images`

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    fromCamera = false
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (file.size === 0) {
        toast.error("File gambar kosong.");
        return false;
      }
      if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
        toast.error("Format tidak didukung. Gunakan JPG, PNG, atau WebP.");
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newImages = validFiles.map((file) => ({
      src: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages]);

    if (fromCamera && cameraInputRef.current) cameraInputRef.current.value = "";
    else if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].src);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      toast.error("Unggah setidaknya satu gambar.");
      return;
    }

    setIsProcessing(true);
    try {
      let widthPx: number, heightPx: number;

      if (pageSize === "custom") {
        widthPx = Math.max(100, parseFloat(customWidth) || 595);
        heightPx = Math.max(100, parseFloat(customHeight) || 842);
      } else {
        const pdfTemp = new jsPDF({ format: pageSize });
        widthPx = pdfTemp.internal.pageSize.getWidth();
        heightPx = pdfTemp.internal.pageSize.getHeight();
      }

      const pdf = new jsPDF({
        orientation: widthPx > heightPx ? "landscape" : "portrait",
        unit: "px",
        format: [widthPx, heightPx],
      });

      let validImageCount = 0;

      for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i].src;

        try {
          // Tunggu hingga gambar benar-benar siap
          await new Promise<void>((resolve, reject) => {
            let resolved = false;
            const checkReady = () => {
              if (resolved) return;
              if (
                img.complete &&
                img.naturalWidth > 0 &&
                img.naturalHeight > 0
              ) {
                resolved = true;
                resolve();
              } else {
                setTimeout(checkReady, 50);
              }
            };
            img.onload = checkReady;
            img.onerror = () => {
              resolved = true;
              reject(new Error("Load failed"));
            };
            checkReady();
          });

          // 🔥 Hanya tambah halaman jika ini BUKAN gambar valid pertama
          if (validImageCount > 0) {
            pdf.addPage([widthPx, heightPx]);
          }

          const margin = 20;
          const availableWidth = widthPx - 2 * margin;
          const availableHeight = heightPx - 2 * margin;

          const imgRatio = img.width / img.height;
          let renderWidth = availableWidth;
          let renderHeight = renderWidth / imgRatio;

          if (renderHeight > availableHeight) {
            renderHeight = availableHeight;
            renderWidth = renderHeight * imgRatio;
          }

          const x = (widthPx - renderWidth) / 2;
          const y = (heightPx - renderHeight) / 2;

          const format = images[i].file.type === "image/png" ? "PNG" : "JPEG";
          const compression = format === "PNG" ? "NONE" : "FAST";

          pdf.addImage(
            img,
            format,
            x,
            y,
            renderWidth,
            renderHeight,
            undefined,
            compression
          );

          validImageCount++;
        } catch (err) {
          console.warn(
            "Melewati gambar yang tidak valid:",
            images[i].file.name
          );
          toast(`File "${images[i].file.name}" dilewati (tidak valid)`, {
            icon: "⚠️",
          });
          continue;
        }
      }

      if (validImageCount === 0) {
        toast.error("Tidak ada gambar valid untuk dikonversi.");
        return;
      }

      if (!validImageCount) {
        toast.error("Tidak ada gambar valid untuk dikonversi.");
        return;
      }

      pdf.save(`${fileName.trim() || "image-to-pdf"}.pdf`);
      toast.success("PDF berhasil dibuat dan diunduh!");
    } catch (err) {
      console.error("Error membuat PDF:", err);
      toast.error("Terjadi kesalahan saat membuat PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.src));
    setImages([]);
    setFileName("image-to-pdf");
    setPageSize("a4");
    setCustomWidth("595");
    setCustomHeight("842");
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Image to PDF</h1>
            <p className="mt-2 text-gray-600">
              Upload atau ambil foto, atur ukuran & nama file, lalu unduh PDF.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              100% di browser — tidak ada data disimpan.
            </p>
          </div>

          {/* Input Nama File */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama File
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="image-to-pdf"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* Upload & Kamera */}
          <div className="flex gap-3 mb-6">
            <label
              htmlFor={`file-upload-${uniqueId}`}
              className="flex-1 flex flex-col items-center justify-center px-3 py-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition"
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
              Upload
              <input
                id={`file-upload-${uniqueId}`}
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => handleFileSelect(e)}
                className="hidden"
              />
            </label>

            <label
              htmlFor={`camera-upload-${uniqueId}`}
              className="flex-1 flex flex-col items-center justify-center px-3 py-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition"
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Kamera
              <input
                id={`camera-upload-${uniqueId}`}
                type="file"
                ref={cameraInputRef}
                accept="image/jpeg,image/png"
                capture="environment"
                onChange={(e) => handleFileSelect(e, true)}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview Gambar */}
          {images.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-medium text-gray-700">
                  Gambar ({images.length})
                </h2>
                <button
                  onClick={handleReset}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Hapus Semua
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={`preview-${index}`}
                      className="w-full aspect-square object-cover rounded border border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[10px] shadow"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pilihan Ukuran */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ukuran Kertas
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as PageSize)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3"
            >
              <option value="a4">A4 (210 × 297 mm)</option>
              <option value="letter">Letter (8.5 × 11 in)</option>
              <option value="legal">Legal (8.5 × 14 in)</option>
              <option value="custom">Custom (px)</option>
            </select>

            {pageSize === "custom" && (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  placeholder="Lebar (px)"
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"
                  min="100"
                />
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  placeholder="Tinggi (px)"
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"
                  min="100"
                />
              </div>
            )}
          </div>

          {/* Tombol Konversi */}
          <button
            onClick={handleConvert}
            disabled={images.length === 0 || isProcessing}
            className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
              images.length === 0 || isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isProcessing ? "Membuat PDF…" : "Buat & Unduh PDF"}
          </button>
        </div>
      </main>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-700">Membuat PDF...</p>
          </div>
        </div>
      )}
    </>
  );
}
