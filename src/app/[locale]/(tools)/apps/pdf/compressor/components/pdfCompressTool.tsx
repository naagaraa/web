// src/app/tools/pdf/compress/components/PdfCompressTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument } from "pdf-lib";

let pdfjs: typeof import("pdfjs-dist");

export default function PdfCompressTool() {
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
    setHidden(true);
    return () => {
      setHidden(false);
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (compressedPreview) URL.revokeObjectURL(compressedPreview);
    };
  }, [setHidden, originalPreview, compressedPreview]);

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
    if (fileInputRef.current) fileInputRef.current.value = "";

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

      // Simpan ulang PDF (beberapa file akan berkurang ukurannya)
      const modifiedBytes = await pdfDoc.save({ useObjectStreams: false });
      const compressedBlob = new Blob([new Uint8Array(modifiedBytes)], {
        type: "application/pdf",
      });
      setCompressedSize(compressedBlob.size);

      // ✅ Konversi Blob ke ArrayBuffer untuk pdfjs
      const compressedArrayBuffer = await compressedBlob.arrayBuffer();

      if (!pdfjs) {
        pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      }

      // ✅ Gunakan property 'data' yang benar
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

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Kompres PDF</h1>
          <p className="mt-2 text-gray-600">
            Kurangi ukuran file PDF tanpa kehilangan kualitas penting.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            100% di browser — tidak ada data disimpan.
          </p>
        </div>

        <div className="mb-4">
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

        <div className="mb-6">
          <label
            htmlFor={`pdf-upload-${uniqueId}`}
            className="w-full flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition"
          >
            <svg
              className="w-8 h-8 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Unggah File PDF
            <input
              id={`pdf-upload-${uniqueId}`}
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>
        </div>

        {isRendering && (
          <div className="text-center py-4 text-gray-500">
            Memuat preview...
          </div>
        )}

        {originalPreview && !isRendering && (
          <div className="mb-6 space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-2">Asli</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <img src={originalPreview} alt="Original" className="w-full" />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Ukuran: {formatBytes(originalSize)}
              </p>
            </div>

            {compressedPreview && (
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">
                  Setelah Kompresi
                </h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <img
                    src={compressedPreview}
                    alt="Compressed"
                    className="w-full"
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

        <div className="mb-6">
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

        <button
          onClick={handleCompress}
          disabled={!pdfFile || isProcessing}
          className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
            !pdfFile || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Mengompresi..." : "Kompres & Unduh PDF"}
        </button>
      </div>
    </main>
  );
}
