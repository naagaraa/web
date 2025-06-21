/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";

export default function WatermarkTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [useText, setUseText] = useState(false);
  const [textWatermark, setTextWatermark] = useState("Watermark");
  const [textColor, setTextColor] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 0.1, y: 0.1 });
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const [imageDims, setImageDims] = useState({ width: 1, height: 1 });
  const dragOffset = useRef({ x: 0, y: 0 });

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

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.offsetParent as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    dragOffset.current = {
      x: mouseX - position.x * imageDims.width,
      y: mouseY - position.y * imageDims.height,
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const container = document.querySelector(".relative")!;
    const rect = container.getBoundingClientRect();

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

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const baseImg = new Image();
    baseImg.src = imageSrc;

    baseImg.onload = () => {
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;

      ctx.drawImage(baseImg, 0, 0);

      const absX = position.x * baseImg.width;
      const absY = position.y * baseImg.height;

      if (useText) {
        ctx.font = `${30 * scale}px sans-serif`;
        ctx.fillStyle = textColor;
        ctx.fillText(textWatermark, absX, absY);
      } else if (logoSrc) {
        const logoImg = new Image();
        logoImg.src = logoSrc;

        logoImg.onload = () => {
          const logoW = logoImg.width * scale;
          const logoH = logoImg.height * scale;

          ctx.drawImage(logoImg, absX, absY, logoW, logoH);

          const link = document.createElement("a");
          link.download = "watermarked.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };

        return;
      }

      // Download jika teks
      const link = document.createElement("a");
      link.download = "watermarked.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
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
        <div className="relative border rounded shadow inline-block">
          <img
            src={imageSrc}
            alt="Main"
            onLoad={(e) => {
              const img = e.currentTarget;
              setImageDims({
                width: img.offsetWidth,
                height: img.offsetHeight,
              });
            }}
            className="max-w-full h-auto"
          />
          <div
            className="absolute"
            onMouseDown={onMouseDown}
            style={{
              top: position.y * imageDims.height,
              left: position.x * imageDims.width,
              cursor: "grab",
              userSelect: "none",
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
