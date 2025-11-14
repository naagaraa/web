/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";
import { Droplets, ShieldCheck } from "lucide-react"; // ikon watermark

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
  const [renderScale, setRenderScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (fileInputRef.current) fileInputRef.current.value = "";
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
    if (!imageSrc || !canvasRef.current || imageNaturalSize.width === 0) {
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

  const renderPreview = () => {
    if (!imageSrc) return null;
    const textSize = BASE_TEXT_SIZE * scale;
    const logoWidth = BASE_LOGO_SIZE * scale;

    return (
      <div className="relative max-w-3xl w-full mx-auto">
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Gambar"
          className="w-full h-auto max-h-[70vh] object-contain"
          onLoad={() => {
            if (imgRef.current && imageNaturalSize.width > 0) {
              const scaleX =
                imgRef.current.clientWidth / imageNaturalSize.width;
              const scaleY =
                imgRef.current.clientHeight / imageNaturalSize.height;
              const actualRenderScale = Math.min(scaleX, scaleY);
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

  // ✅ MODE AWAL: TIDAK PAKAI NATIVE TOOL LAYOUT
  if (!imageSrc) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          {/* Header branding */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          {/* Judul utama */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Add watermark to images
          </h1>

          {/* Microcopy SaaS */}
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Add text or logo watermarks — all processed in your browser.
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
              onChange={handleImageUpload}
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

  // ✅ MODE EDITING: PAKAI NATIVE TOOL LAYOUT
  const hasWatermark = useText || !!logoSrc;
  const canSave = hasWatermark && !isLoading;

  return (
    <NativeToolLayout
      title="Watermark"
      onBack={resetAll}
      actionButton={{
        label: "Simpan",
        onClick: handleDownload,
        disabled: !canSave,
        loading: isLoading,
      }}
      topControls={
        <select
          value={useText ? "text" : "logo"}
          onChange={(e) => setUseText(e.target.value === "text")}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="logo">Logo</option>
          <option value="text">Teks</option>
        </select>
      }
      contentClassName="bg-gray-50"
    >
      <div className="flex-1 flex items-center justify-center min-h-0 p-2">
        {renderPreview()}
      </div>

      <div className="px-4 pb-4 space-y-4">
        {useText ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={textWatermark}
              onChange={(e) => setTextWatermark(e.target.value)}
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 bg-white"
              placeholder="Teks watermark"
            />
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
            />
          </div>
        ) : (
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer bg-white px-3 py-2 rounded border border-gray-300 w-full">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logoSrc && (
                <span className="ml-auto text-green-600 text-xs">✓ Siap</span>
              )}
            </label>
          </div>
        )}

        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Ukuran</span>
            <span>{scale.toFixed(2)}x</span>
          </div>
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

      <canvas ref={canvasRef} className="hidden" />
    </NativeToolLayout>
  );
}
