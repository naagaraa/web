// src/app/tools/pdf/rotate/PdfRotatorTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument, degrees } from "pdf-lib";

let pdfjs: typeof import("pdfjs-dist");

export default function PdfRotatorTool() {
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

    try {
      if (!pdfjs) {
        pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer }); // ✅ 'data', bukan 'arrayBuffer'
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

        await page.render({
          canvasContext: context,
          viewport,
          canvas: canvas,
        }).promise;

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
    if (!pdfFile) {
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
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
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

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">PDF Rotator</h1>
          <p className="mt-2 text-gray-600">
            Pilih halaman dan atur rotasi (90°, 180°, 270°).
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
            placeholder="rotated-pdf"
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
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>

        {isRendering && (
          <div className="text-center py-6 text-gray-500">
            Memuat preview...
          </div>
        )}

        {pagePreviews.length > 0 && !isRendering && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              Atur Rotasi Halaman
            </h2>
            <div className="space-y-4">
              {pagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-start gap-3">
                    {/* ✅ Gunakan <picture> untuk mematuhi aturan Next.js */}
                    <picture>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt={`Halaman ${index + 1}`}
                        className="w-20 h-28 object-contain border rounded"
                      />
                    </picture>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800 mb-1">
                        Halaman {index + 1}
                      </div>
                      <div className="flex gap-2">
                        {[0, 90, 180, 270].map((angle) => (
                          <button
                            key={angle}
                            onClick={() => setRotation(index, angle)}
                            className={`px-2 py-1 text-xs rounded ${
                              rotations[index] === angle
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {angle === 0 ? "0°" : `${angle}°`}
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

        <button
          onClick={handleRotate}
          disabled={pagePreviews.length === 0 || isProcessing}
          className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
            pagePreviews.length === 0 || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Memutar..." : "Simpan PDF Hasil"}
        </button>
      </div>
    </main>
  );
}
