// useImageFilter.ts (bagian hook)
"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export type FilterType =
  | "none"
  | "grayscale"
  | "sepia"
  | "invert"
  | "brightness";

export const FILTER_NAMES: Record<FilterType, string> = {
  none: "Original",
  grayscale: "Hitam Putih",
  sepia: "Sepia",
  invert: "Inversi",
  brightness: "Kecerahan",
};

const DEFAULT_FILTER_VALUES: Record<FilterType, number> = {
  none: 0,
  grayscale: 100,
  sepia: 100,
  invert: 100,
  brightness: 100,
};

const getPreviewFilter = (filter: FilterType, value: number): string => {
  if (filter === "none") return "none";
  const pct = value / 100;
  switch (filter) {
    case "grayscale":
      return `grayscale(${value}%)`;
    case "sepia":
      return `sepia(${value}%)`;
    case "invert":
      return `invert(${value}%)`;
    case "brightness":
      return `brightness(${0.5 + pct * 1.5})`;
    default:
      return "none";
  }
};

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const getGray = (r: number, g: number, b: number) => (r + g + b) / 3;

export function useImageFilter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0); // 🔑 KUNCI PERBAIKAN
  const [activeFilter, setActiveFilter] = useState<FilterType>("none");
  const [filterValues, setFilterValues] = useState<Record<FilterType, number>>({
    ...DEFAULT_FILTER_VALUES,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const resetAll = () => {
    setImageSrc(null);
    setPreviewKey(0); // reset preview key
    setActiveFilter("none");
    setFilterValues({ ...DEFAULT_FILTER_VALUES });
    resetFileInput();

    // Clear canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        // window.location.reload();
      }
      // window.location.reload();
    }

    // window.location.reload();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setPreviewKey((prev) => prev + 1); // 🔁 force new preview
      toast.success("Gambar berhasil diunggah!");
    };
    reader.readAsDataURL(file);
  };

  const applyFilterToCanvas = (filter: FilterType): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!imageSrc) return reject("No image");

      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return reject("Canvas not ready");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const value = filterValues[filter];
        const intensity = value / 100;
        const original = new Uint8ClampedArray(data);

        switch (filter) {
          case "none":
            break;
          case "grayscale": {
            for (let i = 0; i < data.length; i += 4) {
              const avg = getGray(data[i], data[i + 1], data[i + 2]);
              const mix = intensity;
              data[i] = data[i] * (1 - mix) + avg * mix;
              data[i + 1] = data[i + 1] * (1 - mix) + avg * mix;
              data[i + 2] = data[i + 2] * (1 - mix) + avg * mix;
            }
            break;
          }
          case "sepia": {
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const nr = clamp(r * 0.393 + g * 0.769 + b * 0.189, 0, 255);
              const ng = clamp(r * 0.349 + g * 0.686 + b * 0.168, 0, 255);
              const nb = clamp(r * 0.272 + g * 0.534 + b * 0.131, 0, 255);
              const mix = intensity;
              data[i] = r * (1 - mix) + nr * mix;
              data[i + 1] = g * (1 - mix) + ng * mix;
              data[i + 2] = b * (1 - mix) + nb * mix;
            }
            break;
          }
          case "invert": {
            for (let i = 0; i < data.length; i += 4) {
              const mix = intensity;
              data[i] = data[i] * (1 - mix) + (255 - data[i]) * mix;
              data[i + 1] = data[i + 1] * (1 - mix) + (255 - data[i + 1]) * mix;
              data[i + 2] = data[i + 2] * (1 - mix) + (255 - data[i + 2]) * mix;
            }
            break;
          }
          case "brightness": {
            const factor = 0.5 + intensity * 1.5;
            for (let i = 0; i < data.length; i += 4) {
              data[i] = clamp(data[i] * factor, 0, 255);
              data[i + 1] = clamp(data[i + 1] * factor, 0, 255);
              data[i + 2] = clamp(data[i + 2] * factor, 0, 255);
            }
            break;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };

      img.onerror = () => reject("Failed to load image");
    });
  };

  const handleDownload = async () => {
    if (!imageSrc) return;
    setIsProcessing(true);
    try {
      const resultUrl = await applyFilterToCanvas(activeFilter);
      const link = document.createElement("a");
      link.download = `filtered-${Date.now()}.png`; // nama unik
      link.href = resultUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Gambar berhasil diunduh!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengunduh gambar.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    imageSrc,
    previewKey, // ✅ dikembalikan
    activeFilter,
    filterValues,
    setFilterValues,
    getPreviewFilter: () =>
      getPreviewFilter(activeFilter, filterValues[activeFilter]),
    isProcessing,
    imgRef,
    canvasRef,
    fileInputRef,
    handleUpload,
    setActiveFilter,
    resetAll,
    handleDownload,
    DEFAULT_FILTER_VALUES,
  };
}
