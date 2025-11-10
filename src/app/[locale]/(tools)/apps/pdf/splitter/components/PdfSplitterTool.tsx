// src/app/tools/pdf/split/PdfSplitterTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument } from "pdf-lib";

// Lazy load pdfjs hanya saat dibutuhkan
let pdfjs: typeof import("pdfjs-dist");

export default function PdfSplitterTool() {
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
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

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
      // Lazy load pdfjs hanya saat pertama kali dibutuhkan
      if (!pdfjs) {
        pdfjs = await import("pdfjs-dist");
        // Atur worker (wajib untuk pdf.js)
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

        await page.render({
          canvasContext: context,
          viewport,
          canvas: canvas,
        }).promise;

        previews.push(canvas.toDataURL("image/png"));
        selections.push(true); // default semua terpilih
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
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
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

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">PDF Splitter</h1>
          <p className="mt-2 text-gray-600">
            Pilih halaman yang ingin Anda ekstrak.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            100% di browser — tidak ada data disimpan.
          </p>
        </div>

        {/* Input Nama File */}
        <div className="mb-4">
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

        {/* Upload PDF */}
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
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* Preview Halaman */}
        {isRendering && (
          <div className="text-center py-6 text-gray-500">
            Memuat preview...
          </div>
        )}

        {pagePreviews.length > 0 && !isRendering && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium text-gray-700">
                Halaman ({pagePreviews.length})
              </h2>
              <button
                onClick={toggleAll}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {selectedPages.some(Boolean)
                  ? "Batal Pilih Semua"
                  : "Pilih Semua"}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={`Halaman ${index + 1}`}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300">
                    {selectedPages[index] && (
                      <span className="text-blue-600 text-sm">✓</span>
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

        {/* Tombol Ekstrak */}
        <button
          onClick={handleSplit}
          disabled={pagePreviews.length === 0 || isProcessing}
          className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
            pagePreviews.length === 0 || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Mengekstrak..." : "Ekstrak Halaman Terpilih"}
        </button>
      </div>
    </main>
  );
}
