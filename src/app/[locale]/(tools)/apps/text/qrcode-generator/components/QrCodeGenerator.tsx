// src/app/tools/qr-code/components/QRCodeGenerator.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import { useBottomNav } from "@/src/context/BottomNavContext";

// Tipe bentuk modul
type DotType = "square" | "dots";
type CornerSquareType = "square" | "extra-rounded";

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [filename, setFilename] = useState("");
  const [qrForeground, setQrForeground] = useState("#000000");
  const [qrBackground, setQrBackground] = useState("#ffffff");
  const [dotType, setDotType] = useState<DotType>("square");
  const [cornerSquareType, setCornerSquareType] =
    useState<CornerSquareType>("square");
  const [showFrame, setShowFrame] = useState(false);
  const [frameText, setFrameText] = useState("Scan Me");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const { setHidden } = useBottomNav();

  // Sembunyikan bottom nav
  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  // Inisialisasi QR Code
  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: inputText || " ",
      margin: showFrame ? 20 : 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q", // Q = ~25% recovery, cukup untuk logo
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.25,
        margin: 10,
      },
      dotsOptions: {
        type: dotType,
        color: qrForeground,
      },
      backgroundOptions: {
        color: qrBackground,
      },
      cornersSquareOptions: {
        type: cornerSquareType,
        color: qrForeground,
      },
      cornersDotOptions: {
        type: "square",
        color: qrForeground,
      },
      image: logoUrl || undefined,
    });

    const container = qrRef.current;
    if (container) {
      container.innerHTML = "";
      if (qrCodeRef.current) qrCodeRef.current.append(container);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [
    inputText,
    qrForeground,
    qrBackground,
    dotType,
    cornerSquareType,
    logoUrl,
    showFrame,
  ]);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("File harus berupa gambar (PNG, JPG, dll).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setLogoUrl(url);
      setLogoFile(file);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoUrl(null);
    setLogoFile(null);
  };

  const handleDownload = () => {
    if (!qrCodeRef.current) return;

    let baseName = filename.trim();
    if (baseName === "") {
      baseName = `qrcode-${Date.now()}`;
    } else {
      // Hanya bersihkan karakter ilegal, jangan tambah ekstensi
      baseName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");
    }

    qrCodeRef.current.download({ name: baseName }); // ⬅️ tanpa ".png"
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            QR Code Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Buat QR code dengan logo, warna, dan frame sesuai kebutuhan.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            100% di browser — tidak ada data disimpan.
          </p>
        </div>

        {/* Input Teks */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teks atau Tautan
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        {inputText && (
          <>
            {/* Opsi Warna */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna QR
                </label>
                <input
                  type="color"
                  value={qrForeground}
                  onChange={(e) => setQrForeground(e.target.value)}
                  className="w-full h-10 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latar Belakang
                </label>
                <input
                  type="color"
                  value={qrBackground}
                  onChange={(e) => setQrBackground(e.target.value)}
                  className="w-full h-10 rounded border"
                />
              </div>
            </div>

            {/* Bentuk & Sudut */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bentuk Titik
                </label>
                <select
                  value={dotType}
                  onChange={(e) => setDotType(e.target.value as DotType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="square">Kotak</option>
                  <option value="dots">Bulat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sudut QR
                </label>
                <select
                  value={cornerSquareType}
                  onChange={(e) =>
                    setCornerSquareType(e.target.value as CornerSquareType)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="square">Kotak</option>
                  <option value="extra-rounded">Bulat</option>
                </select>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo (Opsional)
              </label>
              <div className="flex items-center gap-2">
                <label className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
                  Pilih Gambar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                {logoFile && (
                  <span className="text-sm text-gray-600 truncate flex-1">
                    {logoFile.name}
                  </span>
                )}
                {logoFile && (
                  <button onClick={removeLogo} className="text-red-500 text-sm">
                    Hapus
                  </button>
                )}
              </div>
            </div>

            {/* Frame */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <input
                  type="checkbox"
                  checked={showFrame}
                  onChange={(e) => setShowFrame(e.target.checked)}
                  className="rounded"
                />
                Tambah Bingkai
              </label>
              {showFrame && (
                <input
                  type="text"
                  value={frameText}
                  onChange={(e) => setFrameText(e.target.value)}
                  placeholder="Scan Me"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              )}
            </div>

            {/* Nama File */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama File (Opsional)
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="qrcode-brand"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Preview QR */}
            {/* Preview QR */}
            <div className="mb-8 flex flex-col items-center">
              {showFrame ? (
                <div
                  className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  style={{ backgroundColor: qrBackground }}
                >
                  {/* QR Code di tengah */}
                  <div ref={qrRef} className="flex justify-center" />

                  {/* Teks bingkai di bawah */}
                  <div className="mt-4 text-center">
                    <p
                      className="text-sm font-medium"
                      style={{ color: qrForeground }}
                    >
                      {frameText || "Scan Me"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white border border-gray-200 rounded-xl w-full flex flex-col items-center gap-4">
                  <div ref={qrRef} className="flex justify-center" />
                </div>
              )}

              <button
                onClick={handleDownload}
                className="w-full mt-4 py-3 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Unduh QR Code
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
