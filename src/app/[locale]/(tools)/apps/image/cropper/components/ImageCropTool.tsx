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
import { Scissors, ShieldCheck } from "lucide-react";

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
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          {/* Header branding */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scissors className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          {/* Judul utama */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Crop images precisely
          </h1>

          {/* Microcopy SaaS */}
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Select any area, adjust ratio, and download — all in your browser.
          </p>

          {/* CTA utama */}
          <label className="w-full max-w-xs">
            <div className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm">
              Upload an image
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {/* Trust badge */}
          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            100% client-side • No data leaves your device
          </div>
        </div>
      </div>
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
