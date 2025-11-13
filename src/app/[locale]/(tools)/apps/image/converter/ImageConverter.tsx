// src/app/[locale]/(tools)/apps/image/converter/ImageConverter.tsx
"use client";

import React from "react";
import Image from "next/image";

interface ImageConverterContentProps {
  onUpload: (src: string) => void;
  onReset: () => void;
  imageSrc: string | null;
  isLoading: boolean;
}

export default function ImageConverterContent({
  onUpload,
  onReset,
  imageSrc,
  isLoading,
}: ImageConverterContentProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result as string);
    reader.readAsDataURL(file);
  };

  if (!imageSrc) {
    return (
      <div className="flex flex-col items-center justify-center px-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Image Converter
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Convert to PNG, JPEG, or WebP — no uploads, no fees.
        </p>
        <label className="w-full max-w-xs">
          <div className="w-full py-3.5 px-6 bg-blue-600 text-white text-center rounded-xl font-medium shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer">
            Choose Image
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
        </label>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc!}
      alt="Preview"
      fill
      className="object-contain"
      unoptimized // ✅ karena ini image data URL (bukan static asset)
    />
  );
}
