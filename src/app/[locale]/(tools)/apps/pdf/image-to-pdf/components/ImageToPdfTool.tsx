// src/app/[locale]/(tools)/apps/image-to-pdf/components/ImageToPdfTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import {
  Camera,
  Upload,
  Trash2,
  FileText,
  ShieldCheck,
  FileDown,
} from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
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
  const [isEditing, setIsEditing] = useState(false);
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
    if (isEditing) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    return () => setHidden(false);
  }, [isEditing, setHidden]);

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => {
    handleReset();
    setIsEditing(false);
  };

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

  // ✅ MODE PROMOSI
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Gambar ke PDF
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Ubah foto atau screenshot jadi PDF dalam sekejap — langsung di
            browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Konversi
          </button>

          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            100% di perangkat Anda • Tidak ada data yang dikirim
          </div>
        </div>
      </div>
    );
  }

  // ✅ MODE EDITING
  return (
    <NativeToolLayout
      title="Gambar ke PDF"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled: images.length === 0,
        loading: false,
      }}
      topControls={
        <div className="px-2 flex flex-wrap gap-2">
          <label
            htmlFor={`file-upload-${uniqueId}`}
            className="flex-1 min-w-[100px] py-2 bg-blue-600 text-white rounded text-sm font-medium flex items-center justify-center gap-1 cursor-pointer"
          >
            <Upload className="size-3.5" /> Upload
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
            className="flex-1 min-w-[100px] py-2 bg-gray-700 text-white rounded text-sm font-medium flex items-center justify-center gap-1 cursor-pointer"
          >
            <Camera className="size-3.5" /> Kamera
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

          <button
            onClick={handleConvert}
            disabled={images.length === 0 || isProcessing}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${
              images.length > 0 && !isProcessing
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FileDown className="size-3.5" /> Unduh
          </button>
        </div>
      }
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-md mx-auto w-full space-y-4">
        {/* Input Nama File */}
        <div>
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

        {/* Preview Gambar */}
        {images.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-700">
                Gambar ({images.length})
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.src}
                    alt={`preview-${index}`}
                    className="w-full aspect-square object-cover rounded border border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[10px] shadow"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pilihan Ukuran */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ukuran Kertas
          </label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as PageSize)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
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
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-700">Membuat PDF...</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  );
}
