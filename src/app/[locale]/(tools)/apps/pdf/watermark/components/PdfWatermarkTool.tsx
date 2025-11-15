// src/app/[locale]/(tools)/apps/pdf-watermark/components/PdfWatermarkTool.tsx
"use client";

import React, { useState, useRef, useId, useEffect, useCallback } from "react";
import {
  FileText,
  Upload,
  FileDown,
  ShieldCheck,
  Type,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import { useBottomNav } from "@/src/context/BottomNavContext";
import { PDFDocument, rgb, degrees } from "pdf-lib";

let pdfjs: typeof import("pdfjs-dist");

type WatermarkType = "text" | "image";

export default function PdfWatermarkTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkType, setWatermarkType] = useState<WatermarkType>("text");
  const [watermarkText, setWatermarkText] = useState("DRAFT");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
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
    if (isEditing) {
      setHidden(true);
    } else {
      setHidden(false);
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (watermarkedPreview) URL.revokeObjectURL(watermarkedPreview);
    }
    return () => setHidden(false);
  }, [isEditing, setHidden, originalPreview, watermarkedPreview]);

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => {
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
      if (fileInputRef.current) fileInputRef.current.value = "";
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
    reader.onerror = () => toast.error("Gagal membaca file logo.");
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
  }, [drawWatermarkOnCanvas]);

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
      const blob = new Blob([new Uint8Array(modifiedPdfBytes)], {
        type: "application/pdf",
      });
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
      default:
        return { x: (width - size) / 2, y: (height - size) / 2 };
    }
  };

  const handleReset = () => {
    handleBack();
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
            Watermark PDF
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Tambahkan teks atau logo sebagai watermark ke dokumen PDF Anda —
            langsung di browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Tambah Watermark
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
      title="Watermark PDF"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled: !pdfFile,
        loading: false,
      }}
      topControls={
        <div className="px-2 flex flex-wrap gap-2">
          <label
            htmlFor={`pdf-upload-${uniqueId}`}
            className="flex-1 min-w-[100px] py-2 bg-blue-600 text-white rounded text-sm font-medium flex items-center justify-center gap-1 cursor-pointer"
          >
            <Upload className="size-3.5" /> PDF
            <input
              id={`pdf-upload-${uniqueId}`}
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>

          {watermarkType === "image" && (
            <label
              htmlFor={`logo-upload-${uniqueId}`}
              className="flex-1 min-w-[100px] py-2 bg-gray-700 text-white rounded text-sm font-medium flex items-center justify-center gap-1 cursor-pointer"
            >
              <ImageIcon className="size-3.5" /> Logo
              <input
                id={`logo-upload-${uniqueId}`}
                type="file"
                ref={logoInputRef}
                accept="image/png,image/jpeg"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          )}

          <button
            onClick={handleWatermark}
            disabled={
              !pdfFile ||
              (watermarkType === "image" && !logoFile) ||
              isProcessing
            }
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${
              pdfFile &&
              (watermarkType === "text" ||
                (watermarkType === "image" && logoFile)) &&
              !isProcessing
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
            placeholder="watermarked-pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {/* Preview */}
        {isRendering && (
          <div className="text-center py-4 text-gray-500">
            Memuat preview...
          </div>
        )}

        {watermarkedPreview && !isRendering && (
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Preview</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <img
                src={watermarkedPreview}
                alt="Preview dengan watermark"
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
          </div>
        )}

        {/* Jenis Watermark */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Watermark
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setWatermarkType("text")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 ${
                watermarkType === "text"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Type className="size-3.5" /> Teks
            </button>
            <button
              onClick={() => setWatermarkType("image")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 ${
                watermarkType === "image"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <ImageIcon className="size-3.5" /> Logo
            </button>
          </div>
        </div>

        {/* Input Teks */}
        {watermarkType === "text" && (
          <div>
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
        )}

        {/* Slider & Posisi */}
        <div className="space-y-3">
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
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-700">Menambahkan watermark...</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  );
}
