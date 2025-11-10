// src/app/tools/pdf/watermark/PdfWatermarkTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument, rgb, degrees } from "pdf-lib";

let pdfjs: typeof import("pdfjs-dist");

type WatermarkType = "text" | "image";

export default function PdfWatermarkTool() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkType, setWatermarkType] = useState<WatermarkType>("text");
  const [watermarkText, setWatermarkText] = useState("DRAFT");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoBase64, setLogoBase64] = useState<string | null>(null); // ✅ base64, bukan ObjectURL
  const [opacity, setOpacity] = useState(0.3);
  const [rotation, setRotation] = useState(45);
  const [position, setPosition] = useState("center");
  const [fontSize, setFontSize] = useState(48);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("watermarked-pdf");
  const [isRendering, setIsRendering] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [watermarkedPreview, setWatermarkedPreview] = useState<string | null>(
    null
  );

  const { setHidden } = useBottomNav();
  const uniqueId = useId();

  useEffect(() => {
    setHidden(true);
    return () => {
      setHidden(false);
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (watermarkedPreview) URL.revokeObjectURL(watermarkedPreview);
    };
  }, [setHidden, originalPreview, watermarkedPreview]);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("File harus berformat PDF.");
      return;
    }
    setPdfFile(file);
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
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport, canvas }).promise;
      const url = canvas.toDataURL("image/png");
      setOriginalPreview(url);
      setWatermarkedPreview(url);
    } catch (err) {
      console.error("Gagal render preview:", err);
      toast.error("Gagal memuat preview PDF.");
    } finally {
      setIsRendering(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Logo harus berupa gambar (PNG/JPG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setLogoBase64(event.target.result);
        setLogoFile(file);
      }
    };
    reader.onerror = () => {
      toast.error("Gagal membaca file logo.");
    };
    reader.readAsDataURL(file);

    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const drawWatermarkOnCanvas = useCallback(async () => {
    if (!originalPreview) return;

    const img = new Image();
    img.src = originalPreview;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    ctx.globalAlpha = opacity;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    if (watermarkType === "text") {
      ctx.fillStyle = "gray";
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let x = 0,
        y = 0;
      switch (position) {
        case "top-left":
          x = -centerX + 100;
          y = -centerY + 50;
          break;
        case "top-right":
          x = centerX - 100;
          y = -centerY + 50;
          break;
        case "bottom-left":
          x = -centerX + 100;
          y = centerY - 50;
          break;
        case "bottom-right":
          x = centerX - 100;
          y = centerY - 50;
          break;
        default:
          x = 0;
          y = 0;
      }
      ctx.fillText(watermarkText, x, y);
    } else if (logoBase64) {
      const logoImg = new Image();
      logoImg.src = logoBase64;
      try {
        await logoImg.decode();
      } catch (err) {
        console.error("Gagal decode logo:", err);
        toast.error("Gambar logo tidak valid.");
        return;
      }

      const scale = 0.3;
      const w = logoImg.width * scale;
      const h = logoImg.height * scale;

      let x = 0,
        y = 0;
      switch (position) {
        case "top-left":
          x = -centerX + w / 2;
          y = -centerY + h / 2;
          break;
        case "top-right":
          x = centerX - w / 2;
          y = -centerY + h / 2;
          break;
        case "bottom-left":
          x = -centerX + w / 2;
          y = centerY - h / 2;
          break;
        case "bottom-right":
          x = centerX - w / 2;
          y = centerY - h / 2;
          break;
        default:
          x = 0;
          y = 0;
      }
      ctx.drawImage(logoImg, x - w / 2, y - h / 2, w, h);
    }

    ctx.restore();
    return canvas.toDataURL("image/png");
  }, [
    originalPreview,
    logoBase64,
    watermarkType,
    watermarkText,
    opacity,
    rotation,
    position,
    fontSize,
  ]);

  useEffect(() => {
    if (originalPreview) {
      drawWatermarkOnCanvas().then((url) => {
        if (url) setWatermarkedPreview(url);
      });
    }
  }, [
    drawWatermarkOnCanvas,
    originalPreview,
    logoBase64,
    watermarkType,
    watermarkText,
    opacity,
    rotation,
    position,
    fontSize,
  ]);

  const handleWatermark = async () => {
    if (!pdfFile) {
      toast.error("Unggah file PDF terlebih dahulu.");
      return;
    }
    if (watermarkType === "image" && !logoFile) {
      toast.error("Unggah logo terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      let imageData: Uint8Array | undefined;
      if (watermarkType === "image" && logoFile) {
        const logoBytes = await logoFile.arrayBuffer();
        imageData = new Uint8Array(logoBytes);
      }

      const pages = pdfDoc.getPages();
      for (const page of pages) {
        if (watermarkType === "text") {
          page.drawText(watermarkText, {
            x: getPosition(page).x,
            y: getPosition(page).y,
            size: fontSize,
            color: rgb(0.5, 0.5, 0.5),
            opacity: opacity,
            rotate: degrees(rotation),
          });
        } else if (imageData) {
          let embed;
          if (logoFile?.type === "image/png") {
            embed = await pdfDoc.embedPng(imageData);
          } else {
            embed = await pdfDoc.embedJpg(imageData);
          }
          const { width, height } = embed.scale(0.5);
          page.drawImage(embed, {
            x: getPosition(page).x,
            y: getPosition(page).y,
            width,
            height,
            opacity: opacity,
            rotate: degrees(rotation),
          });
        }
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const uint8Array = new Uint8Array(modifiedPdfBytes);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.trim() || "watermarked-pdf"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("PDF dengan watermark berhasil diunduh!");
    } catch (err) {
      console.error("Error adding watermark:", err);
      toast.error("Gagal menambahkan watermark.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getPosition = (page: any) => {
    const { width, height } = page.getSize();
    const size = 200;
    switch (position) {
      case "top-left":
        return { x: 50, y: height - 50 };
      case "top-right":
        return { x: width - size - 50, y: height - 50 };
      case "bottom-left":
        return { x: 50, y: 50 };
      case "bottom-right":
        return { x: width - size - 50, y: 50 };
      case "center":
      default:
        return { x: (width - size) / 2, y: (height - size) / 2 };
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setLogoFile(null);
    setLogoBase64(null);
    setOriginalPreview(null);
    setWatermarkedPreview(null);
    setWatermarkText("DRAFT");
    setOpacity(0.3);
    setRotation(45);
    setPosition("center");
    setFontSize(48);
    setFileName("watermarked-pdf");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">PDF Watermark</h1>
          <p className="mt-2 text-gray-600">
            Tambahkan watermark & lihat preview-nya.
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
            placeholder="watermarked-pdf"
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

        {watermarkedPreview && !isRendering && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Preview</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <picture>
                <img
                  src={watermarkedPreview}
                  alt="Preview dengan watermark"
                  className="w-full"
                />
              </picture>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Watermark
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setWatermarkType("text")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                watermarkType === "text"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Teks
            </button>
            <button
              onClick={() => setWatermarkType("image")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                watermarkType === "image"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Logo
            </button>
          </div>
        </div>

        {watermarkType === "text" ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teks Watermark
            </label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        ) : (
          <div className="mb-6">
            <label
              htmlFor={`logo-upload-${uniqueId}`}
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Unggah Logo (PNG/JPG)
              <input
                id={`logo-upload-${uniqueId}`}
                type="file"
                ref={logoInputRef}
                accept="image/png,image/jpeg"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
            {logoFile && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                {logoFile.name}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transparansi: {Math.round(opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rotasi: {rotation}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posisi
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="top-left">Kiri Atas</option>
              <option value="top-right">Kanan Atas</option>
              <option value="center">Tengah</option>
              <option value="bottom-left">Kiri Bawah</option>
              <option value="bottom-right">Kanan Bawah</option>
            </select>
          </div>

          {watermarkType === "text" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ukuran Font: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="100"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleWatermark}
          disabled={
            !pdfFile || (watermarkType === "image" && !logoFile) || isProcessing
          }
          className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
            !pdfFile || (watermarkType === "image" && !logoFile) || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Menambahkan..." : "Unduh PDF dengan Watermark"}
        </button>
      </div>
    </main>
  );
}
