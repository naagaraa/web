/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function WatermarkTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [useText, setUseText] = useState(false);
  const [textWatermark, setTextWatermark] = useState("Watermark");
  const [textColor, setTextColor] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 0.1, y: 0.1 });
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageDims, setImageDims] = useState({ width: 1, height: 1 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [naturalDims, setNaturalDims] = useState({ width: 1, height: 1 }); // asli
  const [logoDims, setLogoDims] = useState({ width: 100, height: 100 });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  // laptop / desktop
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    dragOffset.current = {
      x: e.clientX - containerRect.left - position.x * imageDims.width,
      y: e.clientY - containerRect.top - position.y * imageDims.height,
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const newX = e.clientX - rect.left - dragOffset.current.x;
    const newY = e.clientY - rect.top - dragOffset.current.y;

    setPosition({
      x: newX / imageDims.width,
      y: newY / imageDims.height,
    });
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // mobile
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    dragOffset.current = {
      x: touch.clientX - containerRect.left - position.x * imageDims.width,
      y: touch.clientY - containerRect.top - position.y * imageDims.height,
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    const newX = touch.clientX - rect.left - dragOffset.current.x;
    const newY = touch.clientY - rect.top - dragOffset.current.y;

    setPosition({
      x: newX / imageDims.width,
      y: newY / imageDims.height,
    });
  };
  const onTouchEnd = () => {
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  };

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;

    setIsLoading(true);
    toast.loading("Sedang memproses gambar...");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const baseImg = new Image();
    baseImg.src = imageSrc;

    baseImg.onload = () => {
      const MAX_WIDTH = 1080;
      const scaleRatio =
        baseImg.width > MAX_WIDTH ? MAX_WIDTH / baseImg.width : 1;

      const targetWidth = baseImg.width * scaleRatio;
      const targetHeight = baseImg.height * scaleRatio;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.drawImage(baseImg, 0, 0, targetWidth, targetHeight);

      // Hitung rasio asli -> preview
      const ratioX = targetWidth / imageDims.width;
      const ratioY = targetHeight / imageDims.height;

      const absX = position.x * imageDims.width * ratioX;
      const absY = position.y * imageDims.height * ratioY;

      const finishDownload = () => {
        const link = document.createElement("a");
        link.download = "watermarked.jpg";
        link.href = canvas.toDataURL("image/jpeg", 0.8);
        link.click();

        setIsLoading(false);
        toast.dismiss();
        toast.success("Berhasil mendownload gambar!");
      };

      if (useText) {
        const fontSize = 30 * scale * ratioX; // pakai ratioX sebagai skala
        // ctx.font = `${fontSize}px sans-serif`;
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = textColor;
        ctx.fillText(textWatermark, absX, absY);
        finishDownload();
      } else if (logoSrc) {
        const logoImg = new Image();
        logoImg.src = logoSrc;
        logoImg.onload = () => {
          // const logoW = logoImg.width * scale * ratioX;
          // const logoH = logoImg.height * scale * ratioY;
          const logoW = logoDims.width * ratioX;
          const logoH = logoDims.height * ratioY;

          ctx.drawImage(logoImg, absX, absY, logoW, logoH);
          finishDownload();
        };
        logoImg.onerror = () => {
          setIsLoading(false);
          toast.dismiss();
          toast.error("Gagal memuat logo.");
        };
      }
    };
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Watermark Image Tool</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Upload Gambar:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div>
          <label className="block font-medium mb-1">Mode Watermark:</label>
          <select
            className="w-full border p-2 rounded"
            value={useText ? "text" : "logo"}
            onChange={(e) => {
              setUseText(e.target.value === "text");
            }}
          >
            <option value="logo">Logo Image</option>
            <option value="text">Text Watermark</option>
          </select>
        </div>
      </div>

      {useText ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Isi Teks:</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={textWatermark}
              onChange={(e) => setTextWatermark(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Warna Teks:</label>
            <input
              type="color"
              className="w-16 h-10"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block font-medium mb-1">Upload Logo:</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>
      )}

      {imageSrc && (
        <div
          ref={containerRef}
          className="relative border rounded shadow inline-block"
        >
          <img
            src={imageSrc}
            alt="Main"
            onLoad={(e) => {
              const img = e.currentTarget;
              setImageDims({
                width: img.offsetWidth, // preview
                height: img.offsetHeight,
              });
              setNaturalDims({
                width: img.naturalWidth, // asli
                height: img.naturalHeight,
              });
            }}
            className="max-w-full h-auto"
          />
          <div
            ref={watermarkRef}
            className="absolute"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            style={{
              top: position.y * imageDims.height,
              left: position.x * imageDims.width,
              cursor: "grab",
              userSelect: "none",
              touchAction: "none",
            }}
          >
            {useText ? (
              <span
                style={{
                  color: textColor,
                  fontSize: `${30 * scale}px`,
                  fontWeight: "bold",
                }}
              >
                {textWatermark}
              </span>
            ) : (
              logoSrc && (
                <img
                  src={logoSrc}
                  alt="Logo"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    setLogoDims({
                      width: img.offsetWidth,
                      height: img.offsetHeight,
                    });
                  }}
                  style={{
                    width: `${100 * scale}px`,
                  }}
                />
              )
            )}
          </div>
        </div>
      )}

      {imageSrc && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Ukuran Watermark</label>
            <input
              type="range"
              min={0.2}
              max={2}
              step={0.05}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          </div>

          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download Hasil Gambar
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
