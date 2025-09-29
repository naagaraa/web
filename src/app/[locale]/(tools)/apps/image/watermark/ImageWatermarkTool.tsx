/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useBottomNav } from "@/src/context/BottomNavContext";

export default function WatermarkTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [useText, setUseText] = useState(false);
  const [textWatermark, setTextWatermark] = useState("Watermark");
  const [textColor, setTextColor] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 0.9, y: 0.9 });
  const [scale, setScale] = useState(1);
  const [logoNaturalSize, setLogoNaturalSize] = useState({
    width: 1,
    height: 1,
  });
  const [imageNaturalSize, setImageNaturalSize] = useState({
    width: 0,
    height: 0,
  });
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const [renderScale, setRenderScale] = useState(1); // skala dari natural → preview
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { setHidden } = useBottomNav();

  const BASE_TEXT_SIZE = 32;
  const BASE_LOGO_SIZE = 120;

  const resetAll = () => {
    setImageSrc(null);
    setLogoSrc(null);
    setUseText(false);
    setTextWatermark("Watermark");
    setTextColor("#ffffff");
    setPosition({ x: 0.9, y: 0.9 });
    setScale(1);
    setImageNaturalSize({ width: 0, height: 0 });
    setPreviewSize({ width: 0, height: 0 });
    setRenderScale(1);
    setHidden(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setImageNaturalSize({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        setImageSrc(reader.result as string);
        setHidden(true);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setLogoNaturalSize({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        setLogoSrc(reader.result as string);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  // === DRAG HANDLER ===
  const startDrag = (clientX: number, clientY: number) => {
    if (!imgRef.current || previewSize.width === 0) return null;
    const rect = imgRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left - position.x * rect.width;
    const offsetY = clientY - rect.top - position.y * rect.height;
    return { offsetX, offsetY, rect };
  };

  const handleDrag = (clientX: number, clientY: number, dragData: any) => {
    const { offsetX, offsetY, rect } = dragData;
    const x = clientX - rect.left - offsetX;
    const y = clientY - rect.top - offsetY;
    setPosition({
      x: Math.max(0, Math.min(1, x / rect.width)),
      y: Math.max(0, Math.min(1, y / rect.height)),
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const dragData = startDrag(e.clientX, e.clientY);
    if (!dragData) return;
    const move = (ev: MouseEvent) =>
      handleDrag(ev.clientX, ev.clientY, dragData);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    const t = e.touches[0];
    const dragData = startDrag(t.clientX, t.clientY);
    if (!dragData) return;
    const move = (ev: TouchEvent) => {
      if (ev.touches.length === 0) return;
      handleDrag(ev.touches[0].clientX, ev.touches[0].clientY, dragData);
    };
    const end = () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  };

  // === DOWNLOAD ===
  const handleDownload = () => {
    if (
      !imageSrc ||
      !canvasRef.current ||
      !imgRef.current ||
      imageNaturalSize.width === 0 ||
      renderScale === 1 // belum dihitung
    ) {
      toast.error("Gambar belum siap");
      return;
    }

    setIsLoading(true);
    toast.loading("Memproses...");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const { width: outW, height: outH } = imageNaturalSize;
    canvas.width = outW;
    canvas.height = outH;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, outW, outH);

      const x = position.x * outW;
      const y = position.y * outH;

      // ✅ INI KUNCI: skala dari preview ke natural = 1 / renderScale
      const previewToNaturalScale = 1 / renderScale;

      const triggerDownload = () => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "watermarked.png";
        a.click();
        setIsLoading(false);
        toast.dismiss();
        toast.success("Berhasil!");
        resetAll();
      };

      if (useText) {
        const textSize = BASE_TEXT_SIZE * scale * previewToNaturalScale;
        ctx.font = `bold ${textSize}px sans-serif`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(textWatermark, x, y);
        triggerDownload();
      } else if (logoSrc) {
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = logoSrc;
        logo.onload = () => {
          const logoAspect = logoNaturalSize.width / logoNaturalSize.height;
          const logoPreviewWidth = BASE_LOGO_SIZE * scale;
          const logoNaturalWidth = logoPreviewWidth * previewToNaturalScale;
          const logoNaturalHeight = logoNaturalWidth / logoAspect;

          ctx.drawImage(
            logo,
            x - logoNaturalWidth / 2,
            y - logoNaturalHeight / 2,
            logoNaturalWidth,
            logoNaturalHeight
          );
          triggerDownload();
        };
      } else {
        triggerDownload();
      }
    };
  };

  // === RENDER PREVIEW ===
  const renderPreview = () => {
    if (!imageSrc) return null;
    const textSize = BASE_TEXT_SIZE * scale;
    const logoWidth = BASE_LOGO_SIZE * scale;

    return (
      <div className="relative max-w-3xl w-full">
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Gambar"
          className="w-full h-auto max-h-[70vh] object-contain"
          onLoad={() => {
            if (imgRef.current && imageNaturalSize.width > 0) {
              // Hitung skala render sebenarnya karena object-contain
              const scaleX =
                imgRef.current.clientWidth / imageNaturalSize.width;
              const scaleY =
                imgRef.current.clientHeight / imageNaturalSize.height;
              const actualRenderScale = Math.min(scaleX, scaleY); // object-contain

              setPreviewSize({
                width: imgRef.current.clientWidth,
                height: imgRef.current.clientHeight,
              });
              setRenderScale(actualRenderScale);
            }
          }}
        />
        <div
          className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
          style={{
            left: `${position.x * 100}%`,
            top: `${position.y * 100}%`,
            transform: "translate(-50%, -50%)",
            userSelect: "none",
            touchAction: "none",
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {useText ? (
            <span
              style={{
                color: textColor,
                fontSize: `${textSize}px`,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                pointerEvents: "none",
              }}
            >
              {textWatermark}
            </span>
          ) : logoSrc ? (
            <img
              src={logoSrc}
              alt="Logo"
              draggable={false}
              style={{
                width: `${logoWidth}px`,
                height: "auto",
                pointerEvents: "none",
              }}
            />
          ) : null}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!imageSrc) {
      setImageNaturalSize({ width: 0, height: 0 });
      setPreviewSize({ width: 0, height: 0 });
      setRenderScale(1);
    }
  }, [imageSrc]);

  // === UI ===
  if (!imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-900">
              Watermark Gambar
            </h1>
            <p className="mt-2 text-gray-600">
              Tambahkan teks atau logo ke gambar Anda.
            </p>
          </div>
          <label className="w-full max-w-xs flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
            Pilih Gambar
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="fixed inset-0 z-50 flex flex-col bg-black/20">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
        <div className="relative w-full h-screen flex flex-col bg-white">
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
            <button
              onClick={resetAll}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Batal
            </button>
            <span className="text-sm font-medium text-gray-800">Watermark</span>
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className={`text-sm font-medium ${
                isLoading ? "text-gray-400" : "text-blue-600"
              }`}
            >
              Simpan
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-2 bg-gray-50 overflow-hidden">
            {renderPreview()}
          </div>

          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-2 border-b border-gray-100">
              <select
                value={useText ? "text" : "logo"}
                onChange={(e) => setUseText(e.target.value === "text")}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="logo">Logo</option>
                <option value="text">Teks</option>
              </select>
            </div>

            {useText ? (
              <div className="px-4 py-2 border-b border-gray-100 flex gap-2">
                <input
                  type="text"
                  value={textWatermark}
                  onChange={(e) => setTextWatermark(e.target.value)}
                  className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                  placeholder="Teks watermark"
                />
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300"
                />
              </div>
            ) : (
              <div className="px-4 py-2 border-b border-gray-100">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  {logoSrc && (
                    <span className="text-green-600 text-xs">✓ Siap</span>
                  )}
                </label>
              </div>
            )}

            <div className="px-4 py-3">
              <label className="block text-xs text-gray-600 mb-1">
                Ukuran: {scale.toFixed(2)}x
              </label>
              <input
                type="range"
                min={0.2}
                max={2}
                step={0.05}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
