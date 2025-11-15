// src/app/[locale]/(tools)/apps/pdf-split/components/PdfSplitterTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import {
  FileText,
  Upload,
  FileDown,
  ShieldCheck,
  File,
  Check,
  Square,
} from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument } from "pdf-lib";

let pdfjs: typeof import("pdfjs-dist");

export default function PdfSplitterTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<boolean[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [fileName, setFileName] = useState("split-pdf");
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
    setSelectedPages([]);
    setFileName("split-pdf");
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
    setSelectedPages([]);

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
      const selections: boolean[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport, canvas }).promise;
        previews.push(canvas.toDataURL("image/png"));
        selections.push(true);
      }

      setPagePreviews(previews);
      setSelectedPages(selections);
    } catch (err) {
      console.error("Gagal render preview:", err);
      toast.error("Gagal memuat preview PDF.");
      setPagePreviews([]);
      setSelectedPages([]);
    } finally {
      setIsRendering(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const togglePage = (index: number) => {
    setSelectedPages((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const toggleAll = () => {
    const anySelected = selectedPages.some(Boolean);
    setSelectedPages(pagePreviews.map(() => !anySelected));
  };

  const handleSplit = async () => {
    if (!pdfFile) {
      toast.error("Unggah file PDF terlebih dahulu.");
      return;
    }

    const pagesToExtract = selectedPages
      .map((selected, i) => (selected ? i + 1 : null))
      .filter((n): n is number => n !== null);

    if (pagesToExtract.length === 0) {
      toast.error("Pilih minimal satu halaman.");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(
        pdfDoc,
        pagesToExtract.map((p) => p - 1)
      );
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.trim() || "split-pdf"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success(`Berhasil ekstrak ${pagesToExtract.length} halaman!`);
    } catch (err) {
      console.error("Error splitting PDF:", err);
      toast.error("Gagal memisah PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setPagePreviews([]);
    setSelectedPages([]);
    setFileName("split-pdf");
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
            Pisah PDF
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Pilih halaman PDF yang ingin Anda ekstrak jadi file baru — langsung
            di browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Pisah
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
      title="Pisah PDF"
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
            onClick={handleSplit}
            disabled={pagePreviews.length === 0 || isProcessing}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${
              pagePreviews.length > 0 && !isProcessing
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FileDown className="size-3.5" /> Ekstrak
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
            placeholder="split-pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Status Render */}
        {isRendering && (
          <div className="text-center py-4 text-gray-500">
            Memuat preview halaman...
          </div>
        )}

        {/* Preview Halaman */}
        {pagePreviews.length > 0 && !isRendering && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <File className="size-3.5" /> Halaman ({pagePreviews.length})
              </h2>
              <button
                onClick={toggleAll}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {selectedPages.some(Boolean) ? "Batal Semua" : "Pilih Semua"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {pagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition ${
                    selectedPages[index]
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => togglePage(index)}
                >
                  <img
                    src={preview}
                    alt={`Halaman ${index + 1}`}
                    className="w-full aspect-2/3 object-contain bg-white"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-white rounded-full border">
                    {selectedPages[index] ? (
                      <Check className="size-3 text-blue-600" />
                    ) : (
                      <Square className="size-3 text-gray-400" />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-xs py-1">
                    Hal {index + 1}
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
            <p className="text-sm text-gray-700">Mengekstrak halaman...</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  );
}
