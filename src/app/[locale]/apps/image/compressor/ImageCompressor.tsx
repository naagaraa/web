/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CompressImages = () => {
  const [images, setImages] = useState<File[]>([]);
  const [compressedData, setCompressedData] = useState<
    { blob: Blob; previewUrl: string }[]
  >([]);
  const [quality, setQuality] = useState(0.7);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
    setCompressedData([]);
    toast.success("Gambar berhasil diunggah.");
  };

  const compressImage = (
    file: File
  ): Promise<{ blob: Blob; previewUrl: string }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const previewUrl = URL.createObjectURL(blob);
              resolve({ blob, previewUrl });
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleCompress = async () => {
    const compressed = await Promise.all(
      images.map((img) => compressImage(img))
    );
    setCompressedData(compressed);
    toast.success("Gambar berhasil dikompres.");
  };

  const handleDownload = (blob: Blob, index: number) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${index + 1}.jpg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Gambar ${index + 1} berhasil diunduh.`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-24 space-y-6">
      <h1 className="text-2xl font-bold">Compress Images</h1>
      <p className="text-sm text-gray-600">
        Kompres gambar dan atur kualitasnya sebelum mengunduh.
      </p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="block w-full mb-2"
      />

      <div>
        <label className="font-medium block mb-1">
          Kualitas Gambar: {Math.round(quality * 100)}%
        </label>
        <input
          type="range"
          min={10}
          max={100}
          value={Math.round(quality * 100)}
          onChange={(e) => setQuality(parseInt(e.target.value) / 100)}
          className="w-full"
        />
      </div>

      <button
        onClick={handleCompress}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kompres Gambar
      </button>

      {compressedData.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold mt-6">Hasil Kompresi</h2>
          {compressedData.map((img, index) => (
            <div
              key={index}
              className="flex flex-col items-center border p-2 rounded"
            >
              <img
                src={img.previewUrl}
                alt={`compressed-${index + 1}`}
                className="w-100 object-contain rounded mb-2"
              />
              <button
                onClick={() => handleDownload(img.blob, index)}
                className="text-blue-600 hover:underline text-sm"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompressImages;
