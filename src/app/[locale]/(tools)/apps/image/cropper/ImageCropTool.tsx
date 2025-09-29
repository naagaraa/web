"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";

export default function ImageCropTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspectPreset, setAspectPreset] = useState<string>("free");
  const { setHidden } = useBottomNav();

  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetAll = () => {
    setImageSrc(null);
    setIsCropping(false);
    setCrop(undefined);
    setCompletedCrop(null);
    setAspectPreset("free");
    setHidden(false); // hide nav saat cropper aktif
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isCropping && imageSrc && imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(
        centerCrop(
          { unit: "%", width: 70, height: 70, x: 15, y: 15 },
          width,
          height
        )
      );
      setHidden(true); // hide nav saat cropper aktif
    }
  }, [isCropping, imageSrc, setHidden]);

  useEffect(() => {
    // hide nav hanya saat mode cropping aktif
    setHidden(isCropping);
  }, [isCropping, setHidden]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAspectPreset(value);
    if (imgRef.current && imageSrc) {
      const { width, height } = imgRef.current;
      if (value === "free") {
        setCrop(
          centerCrop(
            { unit: "%", width: 70, height: 70, x: 15, y: 15 },
            width,
            height
          )
        );
      } else {
        const [w, h] = value.split(/[:x]/).map(Number);
        const aspect = w / h;

        // ✅ Buat crop dengan rasio tetap
        const initialCrop = makeAspectCrop(
          {
            unit: "%",
            width: 80, // lebar awal dalam persen
          },
          aspect,
          width,
          height
        );

        // ✅ Pusatkan crop di tengah gambar
        const centeredCrop = centerCrop(initialCrop, width, height);
        setCrop(centeredCrop);
      }
    }
  };

  const handleDownload = async () => {
    if (!completedCrop || !imgRef.current || !imageSrc) {
      toast.error("Pilih area crop terlebih dahulu");
      return;
    }

    try {
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const canvas = document.createElement("canvas");
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Gagal buat canvas");

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1)
      );

      if (!blob) throw new Error("Gagal membuat gambar");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cropped-image.png";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Gambar berhasil diunduh!");
      resetAll();
    } catch (err) {
      console.error(err);
      toast.error("Gagal memproses gambar");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Halaman Upload */}
      {!isCropping && (
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-900">Crop Gambar</h1>
            <p className="mt-2 text-gray-600">
              Unggah gambar, pilih area, lalu unduh hasilnya.
            </p>
          </div>

          <label className="w-full max-w-xs flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Pilih Gambar
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Modal Cropping Fullscreen */}
      {isCropping && imageSrc && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/20">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
          <div className="relative w-full h-screen flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
              <button
                onClick={resetAll}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Batal
              </button>
              <span className="text-sm font-medium text-gray-800">
                Crop Gambar
              </span>
              <button
                onClick={handleDownload}
                disabled={!completedCrop}
                className={`text-sm font-medium ${
                  !completedCrop ? "text-gray-400" : "text-blue-600"
                }`}
              >
                Simpan
              </button>
            </div>

            {/* Rasio */}
            <div className="px-4 py-2 border-b border-gray-100">
              <select
                value={aspectPreset}
                onChange={handlePresetChange}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="free">Bebas</option>
                <option value="1x1">1:1 (Kotak)</option>
                <option value="4x3">4:3</option>
                <option value="3x4">3:4</option>
                <option value="16x9">16:9</option>
              </select>
            </div>

            {/* Area Crop — Tanpa Scroll */}
            <div className="flex-1 flex items-center justify-center p-2 bg-gray-50">
              <div className="w-full h-full max-w-3xl">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  minWidth={20}
                  minHeight={20}
                  keepSelection
                  ruleOfThirds
                >
                  {/* ✅ Nonaktifkan eslint hanya untuk baris ini */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={imageSrc}
                    alt="Crop preview"
                    className="w-full h-full object-contain"
                  />
                </ReactCrop>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
