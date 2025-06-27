/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ImageConverter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      toast.success("Gambar berhasil diunggah!");
    };
    reader.readAsDataURL(file);
  };

  const handleConvertDownload = () => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.download = `converted.${outputFormat}`;
      link.href = canvas.toDataURL(`image/${outputFormat}`);
      link.click();

      toast.success("Gambar berhasil diunduh!");
    };
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 space-y-8 mt-24">
      <h1 className="text-3xl font-bold text-center">
        🖼️ Image Format Converter
      </h1>

      <div className="bg-white rounded-lg p-6 shadow space-y-6 border">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="file:border file:border-gray-300 file:rounded file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {imageSrc && (
          <>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="format" className="font-semibold">
                  Format Output:
                </label>
                <select
                  id="format"
                  className="border px-3 py-2 rounded"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPG/JPEG</option>
                  <option value="webp">WEBP</option>
                </select>
              </div>

              <button
                onClick={handleConvertDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Download Hasil
              </button>
            </div>

            <div className="border rounded shadow overflow-hidden">
              <img
                src={imageSrc}
                alt="Preview"
                className="w-full object-contain"
              />
            </div>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
