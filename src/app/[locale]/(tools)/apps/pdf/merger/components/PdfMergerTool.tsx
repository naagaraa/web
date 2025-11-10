// src/app/tools/pdf/merge/PdfMergerTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument } from "pdf-lib";

export default function PdfMergerTool() {
  const [pdfFiles, setPdfFiles] = useState<{ file: File; name: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("merged-document");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setHidden } = useBottomNav();
  const uniqueId = useId();

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (file.size === 0) {
        toast.error(`File "${file.name}" kosong.`);
        return false;
      }
      if (file.type !== "application/pdf") {
        toast.error(`"${file.name}" bukan file PDF.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newFiles = validFiles.map((file) => ({
      file,
      name: file.name,
    }));

    setPdfFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setPdfFiles((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleMerge = async () => {
    if (pdfFiles.length < 2) {
      toast.error("Unggah minimal 2 file PDF untuk digabung.");
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const { file } of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const uint8Array = new Uint8Array(pdfBytes); // 👈 pastikan tipe benar
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.trim() || "merged-document"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("PDF berhasil digabung dan diunduh!");
    } catch (err) {
      console.error("Error merging PDF:", err);
      toast.error("Gagal menggabung PDF. Pastikan semua file valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setPdfFiles([]);
    setFileName("merged-document");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">PDF Merger</h1>
          <p className="mt-2 text-gray-600">
            Unggah 2+ file PDF, lalu gabung jadi satu dokumen.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            100% di browser — tidak ada data disimpan.
          </p>
        </div>

        {/* Input Nama File */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama File Hasil
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="merged-document"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Upload PDF */}
        <div className="mb-8">
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
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* Daftar File */}
        {pdfFiles.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium text-gray-700">
                File ({pdfFiles.length})
              </h2>
              <button
                onClick={handleReset}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Hapus Semua
              </button>
            </div>
            <div className="space-y-2">
              {pdfFiles.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-sm"
                >
                  <span className="truncate">{pdf.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tombol Gabung */}
        <button
          onClick={handleMerge}
          disabled={pdfFiles.length < 2 || isProcessing}
          className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
            pdfFiles.length < 2 || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Menggabungkan…" : "Gabung PDF"}
        </button>
      </div>
    </main>
  );
}
