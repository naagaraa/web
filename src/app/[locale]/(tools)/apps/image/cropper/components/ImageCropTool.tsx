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
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function ImageCropTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspectPreset, setAspectPreset] = useState<string>("free");
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetAll = () => {
    setImageSrc(null);
    setIsCropping(false);
    setCrop(undefined);
    setCompletedCrop(null);
    setAspectPreset("free");
    setAspectRatio(undefined);
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
    }
  }, [isCropping, imageSrc]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAspectPreset(value);

    if (imgRef.current && imageSrc) {
      const { width, height } = imgRef.current;

      if (value === "free") {
        setAspectRatio(undefined);
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
        setAspectRatio(aspect);

        const initialCrop = makeAspectCrop(
          { unit: "%", width: 80 },
          aspect,
          width,
          height
        );
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

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // ✅ Gunakan completedCrop ASLI — jangan hitung ulang
    const crop = completedCrop;

    // ✅ Pastikan ukuran valid
    if (crop.width === 0 || crop.height === 0) {
      toast.error("Area crop terlalu kecil");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      // ✅ Ukuran canvas = ukuran crop dalam piksel ASLI
      canvas.width = Math.round(crop.width * scaleX);
      canvas.height = Math.round(crop.height * scaleY);

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Gagal membuat canvas");

      // ✅ Gambar bagian yang di-crop dengan posisi dan ukuran yang diskalakan
      ctx.drawImage(
        image,
        crop.x * scaleX, // x asli
        crop.y * scaleY, // y asli
        crop.width * scaleX, // lebar asli
        crop.height * scaleY, // tinggi asli
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1)
      );

      if (!blob) throw new Error("Gagal membuat gambar");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cropped-image.png";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Gambar berhasil diunduh!");
      resetAll();
    } catch (err) {
      console.error("Crop error:", err);
      toast.error("Gagal memproses gambar");
    }
  };

  // === MODE UPLOAD AWAL ===
  if (!isCropping || !imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-20">
          <div className="text-center max-w-md">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Crop Gambar
            </h1>
            <p className="text-sm text-gray-600 mb-10">
              Unggah gambar, pilih area, lalu unduh hasilnya.
            </p>
            <label className="w-full max-w-xs">
              <div className="w-full py-3.5 bg-blue-600 text-white text-center rounded-xl font-medium transition-colors active:opacity-90">
                Pilih Gambar
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </main>
    );
  }

  // === MODE CROPPING (imageSrc pasti string di sini) ===
  return (
    <NativeToolLayout
      title="Crop Gambar"
      onBack={resetAll}
      actionButton={{
        label: "Simpan",
        onClick: handleDownload,
        disabled: !completedCrop,
        loading: false,
      }}
      topControls={
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
      }
      contentClassName="bg-gray-50 p-2"
    >
      <div className="w-full max-w-3xl mx-auto h-full max-h-[70vh] flex items-center justify-center">
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspectRatio}
          minWidth={20}
          minHeight={20}
          keepSelection
          ruleOfThirds
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Crop preview"
            className="max-w-full max-h-full"
            style={{ display: "block" }}
          />
        </ReactCrop>
      </div>
    </NativeToolLayout>
  );
}
