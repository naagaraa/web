"use client";

import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

export default function ImageCropTool() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedPixels: any) => {
      setCroppedAreaPixels((prev: any) => {
        if (
          prev &&
          prev.x === croppedPixels.x &&
          prev.y === croppedPixels.y &&
          prev.width === croppedPixels.width &&
          prev.height === croppedPixels.height
        ) {
          return prev; // Tidak ada perubahan, hindari setState
        }
        return croppedPixels;
      });
    },
    []
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      toast.success("Gambar berhasil diunggah");
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!image || !croppedAreaPixels) return;
    try {
      const blob = await getCroppedImg(image, croppedAreaPixels);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "cropped-image.png";
      link.click();
      toast.success("Gambar berhasil diunduh!");
    } catch (err) {
      toast.error("Gagal memproses gambar");
    }
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "free") {
      setAspect(undefined);
    } else {
      const parts = value.includes("x") ? value.split("x") : value.split(":");
      const [w, h] = parts.map(Number);

      if (!isNaN(w) && !isNaN(h) && h !== 0) {
        setAspect(w / h);
      } else {
        console.warn("Invalid aspect ratio value:", value);
        setAspect(undefined); // fallback
      }
    }
  };

  const handleAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "free") {
      setAspect(undefined);
    } else {
      const [w, h] = value.split(":").map(Number);
      setAspect(w / h);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Crop Gambar</h1>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleUpload}
        className="block"
      />

      {image && (
        <>
          <div className="mt-4">
            <label className="font-medium mr-2">Aspect Ratio:</label>
            <select defaultValue="4x3" onChange={handlePresetChange}>
              <option value="free">Free</option>
              <option value="1x1">1:1 (Square)</option>
              <option value="4x3">4:3</option>
              <option value="3x4">3:4</option>
              <option value="16x9">16:9</option>
            </select>
          </div>

          <div className="relative w-full aspect-[4/3] bg-gray-200 mt-4 rounded overflow-hidden">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect !== null ? aspect : undefined}
              restrictPosition={false} // ← Tambahkan ini
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block font-medium mb-1">Zoom:</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download Crop Result
            </button>
          </div>
        </>
      )}
    </main>
  );
}

// Helper crop image
async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas kosong"));
    }, "image/png");
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}
