"use client";

import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("");
  const qrWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    const svg = qrWrapperRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      const name =
        filename.trim() !== ""
          ? filename.trim().replace(/[^a-zA-Z0-9-_]/g, "_") + ".png"
          : `qrcode-${Date.now()}.png`;
      a.download = name;
      a.click();
    };

    img.src = url;
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-bold text-center">QR Code Generator</h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Masukkan teks atau tautan..."
        className="w-full border rounded p-2"
      />

      {text && (
        <div className="space-y-4">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Nama file (opsional)"
            className="w-full border rounded p-2"
          />

          <div
            ref={qrWrapperRef}
            className="p-4 border rounded bg-white flex flex-col items-center gap-4"
          >
            <QRCode value={text} />
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Unduh QR Code
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
