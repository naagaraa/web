// src/app/[locale]/(tools)/apps/pdf-rotate/components/PdfRotatorTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import {
  FileText,
  Upload,
  FileDown,
  ShieldCheck,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument, degrees } from "pdf-lib";

let pdfjs: typeof import("pdfjs-dist");

export default function PdfRotatorTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [fileName, setFileName] = useState("rotated-pdf");
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    setPdfFile(null);
    setPagePreviews([]);
    setRotations([]);
    setFileName("rotated-pdf");
    setIsEditing(false);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("File harus berformat PDF.");
      return;
    }

    setPdfFile(file);
    setIsRendering(true);

    try {
      if (!pdfjs) {
        pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const previews: string[] = [];
      const initialRotations: number[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport, canvas }).promise;
        previews.push(canvas.toDataURL("image/png"));
        initialRotations.push(0);
      }

      setPagePreviews(previews);
      setRotations(initialRotations);
    } catch (err) {
      console.error("Gagal render preview:", err);
      toast.error("Gagal memuat preview PDF.");
      setPagePreviews([]);
      setRotations([]);
    } finally {
      setIsRendering(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const setRotation = (index: number, angle: number) => {
    setRotations((prev) => {
      const updated = [...prev];
      updated[index] = angle;
      return updated;
    });
  };

  const handleRotate = async () => {
    if (!pdfFile || pagePreviews.length === 0) {
      toast.error("Unggah file PDF terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      pdfDoc.getPages().forEach((page, i) => {
        const rotation = rotations[i] || 0;
        page.setRotation(degrees(rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.trim() || "rotated-pdf"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("PDF berhasil diputar dan diunduh!");
    } catch (err) {
      console.error("Error rotating PDF:", err);
      toast.error("Gagal memutar PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setPagePreviews([]);
    setRotations([]);
    setFileName("rotated-pdf");
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
            Putar PDF
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Atur rotasi tiap halaman PDF (0°, 90°, 180°, 270°) — langsung di
            browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Putar
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
      title="Putar PDF"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled: pagePreviews.length === 0,
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
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          <button
            onClick={handleRotate}
            disabled={pagePreviews.length === 0 || isProcessing}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${
              pagePreviews.length > 0 && !isProcessing
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FileDown className="size-3.5" /> Simpan
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
            placeholder="rotated-pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Status Loading */}
        {isRendering && (
          <div className="text-center py-4 text-gray-500 flex flex-col items-center gap-1">
            <RotateCw className="size-4 animate-spin" />
            Memuat preview...
          </div>
        )}

        {/* Preview & Rotasi */}
        {pagePreviews.length > 0 && !isRendering && (
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
              <RotateCcw className="size-3.5" /> Atur Rotasi Halaman
            </h2>
            <div className="space-y-3">
              {pagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 bg-white"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={preview}
                      alt={`Halaman ${index + 1}`}
                      className="w-16 h-24 object-contain border rounded shrink-0"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800 mb-1">
                        Halaman {index + 1}
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {[0, 90, 180, 270].map((angle) => (
                          <button
                            key={angle}
                            onClick={() => setRotation(index, angle)}
                            className={`px-2 py-1 text-xs rounded whitespace-nowrap ${
                              rotations[index] === angle
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {angle}°
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-700">Memutar PDF...</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  );
}
