"use client";

import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import ImageConverterContent from "./ImageConverter";
import SkeletonLoader from "@/src/components/SkeletonLoader";
// ✅ Import dari lokasi shared
import NativeToolLayout from "./components/NativeToolLayout";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConvert = async () => {
    if (!imageSrc || isLoading) return;
    setIsLoading(true);
    const toastId = toast.loading("Converting...");

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not ready");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      const img = new Image();
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

  const handleBack = () => window.history.back();
  const handleUpload = (src: string) => setImageSrc(src);
  const handleReset = () => {
    setImageSrc(null);
    setOutputFormat("png");
  };

  const topControls = (
    <select
      value={outputFormat}
      onChange={(e) => setOutputFormat(e.target.value)}
      className="w-full text-sm border border-gray-300 rounded px-2 py-1"
      disabled={isLoading}
    >
      <option value="png">PNG</option>
      <option value="jpeg">JPEG</option>
      <option value="webp">WebP</option>
    </select>
  );

  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      {!imageSrc && (
        <ImageConverterContent
          onUpload={handleUpload}
          onReset={handleReset}
          imageSrc={null}
          isLoading={isLoading}
        />
      )}

      {imageSrc && (
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
        >
          <ImageConverterContent
            onUpload={handleUpload}
            onReset={handleReset}
            imageSrc={imageSrc}
            isLoading={isLoading}
            isPreview={true}
          />
        </NativeToolLayout>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </React.Suspense>
  );
}
