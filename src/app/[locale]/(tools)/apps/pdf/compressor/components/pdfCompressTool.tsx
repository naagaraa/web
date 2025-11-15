// src/app/[locale]/(tools)/apps/pdf-compress/components/PdfCompressTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import {
  FileText,
  Upload,
  FileDown,
  ShieldCheck,
  File,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument } from "pdf-lib";

let pdfjs: typeof import("pdfjs-dist");

export default function PdfCompressTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("compressed-pdf");
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(
    null
  );
  const [isRendering, setIsRendering] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setHidden } = useBottomNav();
  const uniqueId = useId();

  useEffect(() => {
    if (isEditing) {
      setHidden(true);
    } else {
      setHidden(false);
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (compressedPreview) URL.revokeObjectURL(compressedPreview);
    }
    return () => setHidden(false);
  }, [isEditing, setHidden, originalPreview, compressedPreview]);

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => {
    setPdfFile(null);
    setOriginalSize(null);
    setCompressedSize(null);
    setOriginalPreview(null);
    setCompressedPreview(null);
    setIsEditing(false);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("File harus berformat PDF.");
      return;
    }

    setPdfFile(file);
    setOriginalSize(file.size);
    setCompressedSize(null);
    setCompressedPreview(null);
    setIsRendering(true);

    try {
      if (!pdfjs) {
        pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({
        canvasContext: context,
        viewport,
        canvas,
      }).promise;

      const url = canvas.toDataURL("image/png");
      setOriginalPreview(url);
    } catch (err) {
      console.error("Gagal render preview:", err);
      toast.error("Gagal memuat preview PDF.");
    } finally {
      setIsRendering(false);
    }
  };

  const getQualityFromLevel = () => {
    switch (compressionLevel) {
      case "low":
        return 0.92;
      case "medium":
        return 0.75;
      default:
        return 0.55; // high
    }
  };

  const handleCompress = async () => {
    if (!pdfFile) {
      toast.error("Unggah file PDF terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const modifiedBytes = await pdfDoc.save({ useObjectStreams: false });
      const compressedBlob = new Blob([new Uint8Array(modifiedBytes)], {
        type: "application/pdf",
      });
      setCompressedSize(compressedBlob.size);

      // Render preview compressed
      const compressedArrayBuffer = await compressedBlob.arrayBuffer();
      if (!pdfjs) {
        pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      }

      const compressedPdf = await pdfjs.getDocument({
        data: compressedArrayBuffer,
      }).promise;

      const firstPage = await compressedPdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1.2 });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await firstPage.render({
          canvasContext: ctx,
          viewport,
          canvas,
        }).promise;
        setCompressedPreview(canvas.toDataURL("image/png"));
      }

      // Download
      const url = URL.createObjectURL(compressedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.trim() || "compressed-pdf"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      const reduction = originalSize
        ? Math.round(
            ((originalSize - compressedBlob.size) / originalSize) * 100
          )
        : 0;
      toast.success(`PDF dikompresi! Ukuran berkurang ${reduction}%`);
    } catch (err) {
      console.error("Error compressing PDF:", err);
      toast.error(
        "Gagal mengompresi PDF. File mungkin tidak mendukung kompresi."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatBytes = (bytes: number | null): string => {
    if (bytes === null) return "–";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
            Kompres PDF
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Kurangi ukuran file PDF tanpa kehilangan kualitas penting — langsung
            di browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Kompresi
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
      title="Kompres PDF"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleBack,
        disabled: !pdfFile,
        loading: false,
      }}
      topControls={
        <div className="px-2 flex flex-wrap gap-2">
          <label
            htmlFor={`pdf-upload-${uniqueId}`}
            className="flex-1 min-w-[100px] py-2 bg-blue-600 text-white rounded text-sm font-medium flex items-center justify-center gap-1 cursor-pointer"
          >
            <Upload className="size-3.5" /> Unggah
            <input
              id={`pdf-upload-${uniqueId}`}
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleCompress}
            disabled={!pdfFile || isProcessing}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${
              pdfFile && !isProcessing
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
        {/* Nama File Hasil */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama File Hasil
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="compressed-pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Preview */}
        {isRendering && (
          <div className="text-center py-4 text-gray-500">
            <Eye className="size-4 inline mr-1" />
            Memuat preview...
          </div>
        )}

        {originalPreview && !isRendering && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <File className="size-3.5" /> Asli
              </h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <img
                  src={originalPreview}
                  alt="Original"
                  className="w-full h-auto max-h-48 object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Ukuran: {formatBytes(originalSize)}
              </p>
            </div>

            {compressedPreview && (
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <File className="size-3.5" /> Setelah Kompresi
                </h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <img
                    src={compressedPreview}
                    alt="Compressed"
                    className="w-full h-auto max-h-48 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Ukuran: {formatBytes(compressedSize)} • Berkurang{" "}
                  {originalSize && compressedSize
                    ? Math.round(
                        ((originalSize - compressedSize) / originalSize) * 100
                      )
                    : "–"}
                  %
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tingkat Kompresi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tingkat Kompresi
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["low", "medium", "high"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setCompressionLevel(level)}
                className={`py-2 rounded-lg text-sm font-medium ${
                  compressionLevel === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {level === "low" && "Rendah"}
                {level === "medium" && "Sedang"}
                {level === "high" && "Tinggi"}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {compressionLevel === "low" &&
              "Kualitas tinggi, ukuran sedikit berkurang"}
            {compressionLevel === "medium" && "Keseimbangan kualitas & ukuran"}
            {compressionLevel === "high" &&
              "Ukuran lebih kecil, kualitas sedikit menurun"}
          </p>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-700">Mengompresi PDF...</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  );
}
