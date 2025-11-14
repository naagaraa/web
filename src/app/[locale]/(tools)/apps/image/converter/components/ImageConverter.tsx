"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import NativeToolLayout from "../../../components/NativeToolLayout";
import { ShieldCheck, Upload } from "lucide-react";

export default function ImageConverterContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<"png" | "jpeg" | "webp">(
    "png"
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleConvert = async () => {
    if (!imageSrc || isLoading) return;

    setIsLoading(true);
    const toastId = toast.loading("Converting…");

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not ready");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      const img = document.createElement("img");
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageSrc;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const mime = outputFormat === "jpeg" ? "jpeg" : outputFormat;
      const dataUrl = canvas.toDataURL(`image/${mime}`);

      const link = document.createElement("a");
      link.download = `converted.${outputFormat}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Downloaded!", { id: toastId });
    } catch (err) {
      console.error("Conversion error:", err);
      toast.error("Conversion failed.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setOutputFormat("png");
  };

  // 🎯 Mode upload (full-screen, tanpa NativeToolLayout)
  if (!imageSrc) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          {/* Header branding dengan Lucide */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Upload className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          {/* Judul utama */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Convert images instantly
          </h1>

          {/* Microcopy SaaS */}
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Fast, private, and free. Your files never leave your device.
          </p>

          {/* CTA utama */}
          <label className="w-full max-w-xs">
            <div className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm">
              Upload an image
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />
          </label>

          {/* Trust badge dengan Lucide */}
          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            End-to-end private • No sign-up required
          </div>
        </div>
      </div>
    );
  }

  // 📱 Mode preview — bungkus dengan NativeToolLayout
  const topControls = (
    <select
      value={outputFormat}
      onChange={(e) => setOutputFormat(e.target.value as any)}
      className="w-full text-sm border border-gray-300 rounded px-2 py-1"
      disabled={isLoading}
    >
      <option value="png">PNG</option>
      <option value="jpeg">JPEG</option>
      <option value="webp">WebP</option>
    </select>
  );

  return (
    <NativeToolLayout
      title="Image Converter"
      onBack={handleReset}
      actionButton={{
        label: "Simpan",
        onClick: handleConvert,
        disabled: isLoading,
        loading: isLoading,
      }}
      topControls={topControls}
      contentClassName="bg-gray-50 flex items-center justify-center"
    >
      <div className="w-full h-full max-w-3xl relative">
        <Image
          src={imageSrc}
          alt="Preview"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </NativeToolLayout>
  );
}
