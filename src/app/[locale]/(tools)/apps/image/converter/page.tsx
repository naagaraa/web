"use client";

import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import ImageConverterContent from "./ImageConverter";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import NativeToolLayout from "./components/NativeToolLayout";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConvert = async () => {
    if (!imageSrc || isLoading) return; // ✅ Early return jika sedang loading

    setIsLoading(true);
    const toastId = toast.loading("Converting...");

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not ready");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      const img = new Image();

      // Handle image load dengan promise yang lebih aman
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageSrc;
      });

      // Set ukuran canvas
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Generate dan download
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
      // ✅ Ini PASTI jalan
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleUpload = (src: string) => {
    setImageSrc(src);
  };

  const handleReset = () => {
    setImageSrc(null);
    setOutputFormat("png");
  };

  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <NativeToolLayout
        title="Image Converter"
        onBack={handleBack}
        actionButton={{
          label: "Save",
          onClick: handleConvert,
          disabled: !imageSrc || isLoading,
          loading: isLoading,
        }}
        bottomSlot={
          <div className="flex gap-2">
            {["png", "jpeg", "webp"].map((format) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format)}
                disabled={isLoading} // ✅ Nonaktifkan saat loading
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  outputFormat === format
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        }
        background="white"
      >
        <ImageConverterContent
          onUpload={handleUpload}
          onReset={handleReset}
          imageSrc={imageSrc}
          isLoading={isLoading}
        />
      </NativeToolLayout>
      <canvas ref={canvasRef} className="hidden" />
    </React.Suspense>
  );
}
