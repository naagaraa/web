"use client";

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as jsQR from "jsqr";
import { ShieldCheck, FileText, Scan } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

type Mode = "camera" | "upload";

export default function QRCodeReader() {
  const [isEditing, setIsEditing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("camera");
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [selection, setSelection] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({
    originalWidth: 0,
    originalHeight: 0,
    displayWidth: 0,
    displayHeight: 0,
  });

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number | null>(null);

  // Inisialisasi ulang saat ganti mode
  useEffect(() => {
    if (!isEditing) return;
    setResult(null);
    setError(null);
    setIsScanning(false);
    setIsProcessing(false);
    setCameraDenied(false);
    setUploadedImage(null);
    setSelection(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [mode, isEditing]);

  // Render preview gambar upload
  useEffect(() => {
    if (!isEditing || !uploadedImage || !previewCanvasRef.current) return;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxWidth = 400;
    const scale = Math.min(maxWidth / uploadedImage.width, 1);
    const displayWidth = uploadedImage.width * scale;
    const displayHeight = uploadedImage.height * scale;

    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx.drawImage(uploadedImage, 0, 0, displayWidth, displayHeight);

    setDimensions({
      originalWidth: uploadedImage.width,
      originalHeight: uploadedImage.height,
      displayWidth,
      displayHeight,
    });
  }, [uploadedImage, isEditing]);

  // Render overlay seleksi
  useEffect(() => {
    if (!isEditing || !overlayCanvasRef.current || !selection) return;
    const overlay = overlayCanvasRef.current;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;

    const { displayWidth, displayHeight } = dimensions;
    overlay.width = displayWidth;
    overlay.height = displayHeight;
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const scaleX = displayWidth / dimensions.originalWidth;
    const scaleY = displayHeight / dimensions.originalHeight;
    const displayX = selection.x * scaleX;
    const displayY = selection.y * scaleY;
    const displayW = selection.width * scaleX;
    const displayH = selection.height * scaleY;

    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, displayWidth, displayHeight);
    ctx.clearRect(displayX, displayY, displayW, displayH);
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(displayX, displayY, displayW, displayH);
    ctx.setLineDash([]);
  }, [selection, dimensions, isEditing]);

  // Scan dari kamera
  useEffect(() => {
    if (!isEditing || !isScanning) return;

    const scanQR = () => {
      if (!webcamRef.current?.video || !canvasRef.current) {
        animationRef.current = requestAnimationFrame(scanQR);
        return;
      }

      const video = webcamRef.current.video;
      if (video.readyState !== video.HAVE_ENOUGH_DATA) {
        animationRef.current = requestAnimationFrame(scanQR);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scanSize = 400;
      canvas.width = scanSize;
      canvas.height = scanSize;

      const videoAspect = video.videoWidth / video.videoHeight;
      let drawWidth, drawHeight, offsetX, offsetY;
      if (videoAspect > 1) {
        drawHeight = scanSize;
        drawWidth = scanSize * videoAspect;
        offsetX = (scanSize - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = scanSize;
        drawHeight = scanSize / videoAspect;
        offsetX = 0;
        offsetY = (scanSize - drawHeight) / 2;
      }

      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

      try {
        const imageData = ctx.getImageData(0, 0, scanSize, scanSize);
        const code = jsQR.default(imageData.data, scanSize, scanSize, {
          inversionAttempts: "attemptBoth",
        });
        if (code) {
          setResult(code.data);
          setIsScanning(false);
          return;
        }
      } catch (err) {
        console.warn("QR scan error:", err);
      }

      animationRef.current = requestAnimationFrame(scanQR);
    };

    animationRef.current = requestAnimationFrame(scanQR);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isScanning, isEditing]);

  const startCamera = async () => {
    if (typeof navigator.mediaDevices?.getUserMedia !== "function") {
      setCameraDenied(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setIsScanning(true);
      setCameraDenied(false);
    } catch (err) {
      setCameraDenied(true);
      toast.error("Akses kamera ditolak.");
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setError(null);
    setIsScanning(false);
    setIsProcessing(false);
    setSelection(null);
  };

  const scanImageArea = (
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    if (w < 100 || h < 100) return null;
    const scanX = Math.max(0, Math.floor(x));
    const scanY = Math.max(0, Math.floor(y));
    const scanW = Math.min(Math.floor(w), img.width - scanX);
    const scanH = Math.min(Math.floor(h), img.height - scanY);
    if (scanW < 100 || scanH < 100) return null;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    canvas.width = scanW;
    canvas.height = scanH;
    ctx.drawImage(img, scanX, scanY, scanW, scanH);

    try {
      const imageData = ctx.getImageData(0, 0, scanW, scanH);
      const code = jsQR.default(imageData.data, scanW, scanH, {
        inversionAttempts: "attemptBoth",
      });
      return code ? code.data : null;
    } catch {
      return null;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      setUploadedImage(img);
    };
    img.onerror = () => setError("Gagal memuat gambar.");
    img.src = url;
  };

  const getPos = (
    clientX: number,
    clientY: number,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isEditing || !uploadedImage || isProcessing) return;
    e.preventDefault();
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
    const pos = getPos(clientX, clientY, canvas);
    setStartPos(pos);
    setIsSelecting(true);
    setSelection(null);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isEditing || !isSelecting || !uploadedImage) return;
    e.preventDefault();
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
    const pos = getPos(clientX, clientY, canvas);

    const displayX = Math.min(startPos.x, pos.x);
    const displayY = Math.min(startPos.y, pos.y);
    const displayWidth = Math.abs(pos.x - startPos.x);
    const displayHeight = Math.abs(pos.y - startPos.y);

    const scaleX = dimensions.originalWidth / dimensions.displayWidth;
    const scaleY = dimensions.originalHeight / dimensions.displayHeight;

    setSelection({
      x: displayX * scaleX,
      y: displayY * scaleY,
      width: displayWidth * scaleX,
      height: displayHeight * scaleY,
    });
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsSelecting(false);
  };

  const handleScanSelected = () => {
    if (!isEditing || !uploadedImage || !selection || isProcessing) return;
    setIsProcessing(true);
    setError(null);

    if (selection.width < 100 || selection.height < 100) {
      setIsProcessing(false);
      setError("Area terlalu kecil.");
      return;
    }

    const qrData = scanImageArea(
      uploadedImage,
      selection.x,
      selection.y,
      selection.width,
      selection.height
    );
    setIsProcessing(false);

    if (qrData) {
      setResult(qrData);
    } else {
      setError("Tidak ada QR code di area terpilih.");
    }
  };

  const handleScanFull = () => {
    if (!isEditing || !uploadedImage || isProcessing) return;
    setIsProcessing(true);
    setError(null);

    const maxWidth = 1000;
    let width = uploadedImage.width;
    let height = uploadedImage.height;
    if (width > maxWidth || height > maxWidth) {
      const ratio = Math.min(maxWidth / width, maxWidth / height);
      width = Math.floor(width * ratio);
      height = Math.floor(height * ratio);
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsProcessing(false);
      setError("Gagal memproses gambar.");
      return;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(uploadedImage, 0, 0, width, height);

    try {
      const imageData = ctx.getImageData(0, 0, width, height);
      const code = jsQR.default(imageData.data, width, height, {
        inversionAttempts: "attemptBoth",
      });
      setIsProcessing(false);
      if (code) {
        setResult(code.data);
      } else {
        setError("Tidak ada QR code yang ditemukan.");
      }
    } catch {
      setIsProcessing(false);
      setError("Gagal memindai gambar.");
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success("Hasil disalin!", {
        duration: 2000,
        position: "bottom-center",
      });
    } catch (err) {
      toast.error("Gagal menyalin.");
    }
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
                <Scan className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            QR Code Reader
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Scan QR codes from your camera or upload an image — all in your
            browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Baca QR Code
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
      title="QR Reader"
      onBack={handleBack}
      actionButton={
        result
          ? {
              label: "Coba Lagi",
              onClick: handleTryAgain,
              disabled: false,
              loading: false,
            }
          : undefined
      }
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-md mx-auto w-full space-y-5">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition ${
              mode === "camera"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setMode("camera")}
          >
            Scan Kamera
          </button>
          <button
            className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition ${
              mode === "upload"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setMode("upload")}
          >
            Upload Gambar
          </button>
        </div>

        {!result ? (
          <div className="space-y-4">
            {mode === "camera" && (
              <>
                {isScanning ? (
                  <div className="relative">
                    <Webcam
                      ref={webcamRef}
                      mirrored={false}
                      videoConstraints={{ facingMode: "environment" }}
                      className="w-full rounded-xl border border-gray-200"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="border-2 border-blue-500 rounded-lg w-64 h-64 md:w-72 md:h-72"></div>
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                ) : (
                  <>
                    {!cameraDenied ? (
                      <button
                        onClick={startCamera}
                        className="w-full py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 text-sm"
                      >
                        Mulai Scan Kamera
                      </button>
                    ) : (
                      <div className="text-amber-600 text-xs text-center p-2 bg-amber-50 rounded-lg border border-amber-200">
                        Kamera tidak tersedia.
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {mode === "upload" && (
              <div className="space-y-3">
                {!uploadedImage ? (
                  <label className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
                    <svg
                      className="w-6 h-6 mb-1 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.5-4.5a1 1 0 011.414 0L14 15l3-3"
                      />
                    </svg>
                    Pilih Gambar QR
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <>
                    <div className="text-center text-xs text-gray-600">
                      {selection
                        ? "Area terpilih"
                        : "Tekan & tahan untuk pilih area"}
                    </div>
                    <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                      <canvas
                        ref={previewCanvasRef}
                        onMouseDown={handleStart}
                        onMouseMove={handleMove}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={handleStart}
                        onTouchMove={handleMove}
                        onTouchEnd={handleEnd}
                        className="w-full cursor-crosshair touch-none"
                      />
                      <canvas
                        ref={overlayCanvasRef}
                        className="absolute top-0 left-0 w-full pointer-events-none"
                      />
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleScanSelected}
                        disabled={!selection || isProcessing}
                        className={`flex-1 py-2 text-xs rounded-lg font-medium ${
                          selection && !isProcessing
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Scan Area
                      </button>
                      <button
                        onClick={handleScanFull}
                        disabled={isProcessing}
                        className="flex-1 py-2 text-xs text-gray-600 disabled:opacity-50"
                      >
                        Scan Semua
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {error && !isProcessing && (
              <div className="text-red-500 text-xs text-center p-2 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <h2 className="text-xs font-medium text-gray-700 mb-1">
                Hasil QR:
              </h2>
              <div className="text-xs bg-gray-50 p-2 rounded break-all font-mono">
                {result}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 text-xs rounded-lg font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Salin
              </button>
            </div>

            {result.startsWith("http") && (
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 text-xs rounded-lg font-medium text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100"
              >
                Buka Tautan
              </a>
            )}
          </div>
        )}
      </div>
    </NativeToolLayout>
  );
}
