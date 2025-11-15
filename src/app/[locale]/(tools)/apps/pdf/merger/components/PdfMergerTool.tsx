// src/app/[locale]/(tools)/apps/pdf-merge/components/PdfMergerTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import {
  FileText,
  Upload,
  FileDown,
  ShieldCheck,
  File,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument } from "pdf-lib";

export default function PdfMergerTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<{ file: File; name: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("merged-document");
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
    setPdfFiles([]);
    setFileName("merged-document");
    setIsEditing(false);
  };

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
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
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
            Gabung PDF
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Gabungkan beberapa file PDF jadi satu dokumen — langsung di browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Gabung
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
      title="Gabung PDF"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled: pdfFiles.length === 0,
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
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          <button
            onClick={handleMerge}
            disabled={pdfFiles.length < 2 || isProcessing}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${
              pdfFiles.length >= 2 && !isProcessing
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FileDown className="size-3.5" /> Gabung
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
            placeholder="merged-document"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Daftar File */}
        {pdfFiles.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <File className="size-3.5" /> File ({pdfFiles.length})
              </h2>
              <button
                onClick={handleReset}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="size-3" /> Hapus Semua
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

        {pdfFiles.length > 0 && pdfFiles.length < 2 && (
          <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded text-center">
            Butuh minimal 2 file PDF untuk digabung.
          </p>
        )}
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-700">Menggabungkan PDF...</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  );
}
