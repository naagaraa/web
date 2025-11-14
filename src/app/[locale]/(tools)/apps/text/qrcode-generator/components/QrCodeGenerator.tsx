"use client";

import React, { useRef, useState, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import { ShieldCheck, FileText, QrCode } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

type DotType = "square" | "dots";
type CornerSquareType = "square" | "extra-rounded";

export default function QRCodeGenerator() {
  const [isEditing, setIsEditing] = useState(false);
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

  // Inisialisasi QR Code
  useEffect(() => {
    if (!isEditing) return;

    qrCodeRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: inputText || " ",
      margin: showFrame ? 20 : 10,
      qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
      imageOptions: { hideBackgroundDots: true, imageSize: 0.25, margin: 10 },
      dotsOptions: { type: dotType, color: qrForeground },
      backgroundOptions: { color: qrBackground },
      cornersSquareOptions: { type: cornerSquareType, color: qrForeground },
      cornersDotOptions: { type: "square", color: qrForeground },
      image: logoUrl || undefined,
    });

    const container = qrRef.current;
    if (container) {
      container.innerHTML = "";
      qrCodeRef.current.append(container);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [
    isEditing,
    inputText,
    qrForeground,
    qrBackground,
    dotType,
    cornerSquareType,
    logoUrl,
    showFrame,
  ]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("File harus berupa gambar (PNG, JPG, dll).");
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
    if (!qrCodeRef.current) {
      toast.error("QR code belum siap.");
      return;
    }

    let baseName = filename.trim();
    if (baseName === "") {
      baseName = `qrcode-${Date.now()}`;
    } else {
      baseName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");
    }

    qrCodeRef.current.download({ name: baseName });
    toast.success("QR code berhasil diunduh!", {
      duration: 2000,
      position: "bottom-center",
    });
  };

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => setIsEditing(false);

  // ✅ MODE AWAL: TAMPILAN PROMOSI
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <QrCode className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Custom QR Code Generator
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Create branded QR codes with logo, colors, and frame — all in your
            browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Buat QR Code
          </button>

          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            100% client-side • No data leaves your device
          </div>
        </div>
      </div>
    );
  }

  // ✅ MODE EDITING: PAKAI NATIVE TOOL LAYOUT
  return (
    <NativeToolLayout
      title="QR Code"
      onBack={handleBack}
      actionButton={{
        label: "Unduh",
        onClick: handleDownload,
        disabled: !inputText,
        loading: false,
      }}
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-md mx-auto w-full space-y-5">
        {/* Input Teks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teks atau Tautan
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          />
        </div>

        {inputText && (
          <>
            {/* Opsi Warna */}
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bentuk Titik
                </label>
                <select
                  value={dotType}
                  onChange={(e) => setDotType(e.target.value as DotType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="square">Kotak</option>
                  <option value="extra-rounded">Bulat</option>
                </select>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
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
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
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
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                />
              )}
            </div>

            {/* Nama File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama File (Opsional)
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="qrcode-brand"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              />
            </div>

            {/* Preview QR */}
            <div className="flex flex-col items-center pt-4">
              {showFrame ? (
                <div
                  className="relative bg-white p-4 rounded-xl border border-gray-200"
                  style={{ backgroundColor: qrBackground }}
                >
                  <div ref={qrRef} className="flex justify-center" />
                  <div className="mt-3 text-center">
                    <p
                      className="text-sm font-medium"
                      style={{ color: qrForeground }}
                    >
                      {frameText || "Scan Me"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-white border border-gray-200 rounded-xl">
                  <div ref={qrRef} className="flex justify-center" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </NativeToolLayout>
  );
}
