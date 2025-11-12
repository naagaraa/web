"use client";

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as jsQR from "jsqr";
import { useBottomNav } from "@/src/context/BottomNavContext";

type Mode = "camera" | "upload";

export default function QRCodeReader() {
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

  // Simpan dimensi asli & tampilan
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
  const { setHidden } = useBottomNav();

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);

  useEffect(() => {
    setResult(null);
    setError(null);
    setIsScanning(false);
    setIsProcessing(false);
    setCameraDenied(false);
    setUploadedImage(null);
    setSelection(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [mode]);

  // ✅ Gambar preview + simpan dimensi
  useEffect(() => {
    if (uploadedImage && previewCanvasRef.current) {
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const maxWidth = 400;
      const scale = Math.min(maxWidth / uploadedImage.width, 1);
      const displayWidth = uploadedImage.width * scale;
      const displayHeight = uploadedImage.height * scale;

      canvas.width = displayWidth;
      canvas.height = displayHeight;
      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.drawImage(uploadedImage, 0, 0, displayWidth, displayHeight);

      setDimensions({
        originalWidth: uploadedImage.width,
        originalHeight: uploadedImage.height,
        displayWidth,
        displayHeight,
      });
    }
  }, [uploadedImage]);

  // ✅ Gambar overlay seleksi (gunakan display coords)
  useEffect(() => {
    if (overlayCanvasRef.current && selection) {
      const overlay = overlayCanvasRef.current;
      const ctx = overlay.getContext("2d");
      if (!ctx) return;

      const { displayWidth, displayHeight } = dimensions;
      overlay.width = displayWidth;
      overlay.height = displayHeight;
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Konversi selection (original) → display
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
    }
  }, [selection, dimensions]);

  // Scan dari kamera (versi stabil)
  useEffect(() => {
    if (!isScanning) return;

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
      if (!ctx) {
        animationRef.current = requestAnimationFrame(scanQR);
        return;
      }

      // Gunakan ukuran tetap untuk kecepatan
      const scanSize = 400;
      canvas.width = scanSize;
      canvas.height = scanSize;

      // Hitung posisi center-crop
      const videoAspect = video.videoWidth / video.videoHeight;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (videoAspect > 1) {
        // Landscape
        drawHeight = scanSize;
        drawWidth = scanSize * videoAspect;
        offsetX = (scanSize - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Portrait
        drawWidth = scanSize;
        drawHeight = scanSize / videoAspect;
        offsetX = 0;
        offsetY = (scanSize - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, scanSize, scanSize);
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isScanning]);

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
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setError(null);
    setIsScanning(false);
    setIsProcessing(false);
    setSelection(null);
  };

  // ✅ SCAN AREA (pastikan min size)
  const scanImageArea = (
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    // Pastikan minimal 100x100
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
    ctx.drawImage(img, scanX, scanY, scanW, scanH, 0, 0, scanW, scanH);

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

  // ✅ Ambil posisi akurat
  const getPos = (
    clientX: number,
    clientY: number,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return { x, y };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!uploadedImage || isProcessing) return;
    e.preventDefault();
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const pos = getPos(clientX, clientY, canvas);
    setStartPos(pos);
    setIsSelecting(true);
    setSelection(null);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSelecting || !uploadedImage) return;
    e.preventDefault();
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const pos = getPos(clientX, clientY, canvas);

    const displayX = Math.min(startPos.x, pos.x);
    const displayY = Math.min(startPos.y, pos.y);
    const displayWidth = Math.abs(pos.x - startPos.x);
    const displayHeight = Math.abs(pos.y - startPos.y);

    // Konversi ke koordinat asli
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
    if (!uploadedImage || !selection || isProcessing) return;
    setIsProcessing(true);
    setError(null);

    // Pastikan area cukup besar
    if (selection.width < 100 || selection.height < 100) {
      setIsProcessing(false);
      setError("Area terlalu kecil. Pilih area lebih besar.");
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
      setError(
        "Tidak ada QR code di area terpilih. Pastikan QR jelas dan utuh."
      );
    }
  };

  // ... (handleScanFull tetap sama)
  const handleScanFull = () => {
    if (!uploadedImage || isProcessing) return;
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

  // ... (render UI tetap sama)
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">QR Code Reader</h1>
          <p className="mt-2 text-gray-600">Pilih cara membaca QR code.</p>
          <p className="text-xs text-gray-500 mt-1">
            Semua proses di browser — tidak ada data disimpan.
          </p>
        </div>

        <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-md transition ${
              mode === "camera"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setMode("camera")}
          >
            Scan Kamera
          </button>
          <button
            className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-md transition ${
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
          <div className="space-y-6">
            {mode === "camera" && (
              <>
                {isScanning ? (
                  <div className="relative">
                    <Webcam
                      ref={webcamRef}
                      mirrored={false}
                      videoConstraints={{ facingMode: "environment" }}
                      className="w-full rounded-xl overflow-hidden border border-gray-200"
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
                        className="w-full py-3 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Mulai Scan dengan Kamera
                      </button>
                    ) : (
                      <div className="text-amber-600 text-sm text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                        Kamera tidak tersedia. Silakan gunakan mode Upload.
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {mode === "upload" && (
              <div className="space-y-4">
                {!uploadedImage ? (
                  <label className="w-full flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition">
                    <svg
                      className="w-8 h-8 mb-2 text-gray-400"
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
                    Pilih Gambar yang Berisi QR Code
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
                    <div className="text-center text-sm text-gray-600 mb-2">
                      {selection
                        ? "Area terpilih. Tekan tombol untuk memindai."
                        : "Tekan dan tahan, lalu geser untuk memilih area QR"}
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
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleScanSelected}
                        disabled={!selection || isProcessing}
                        className={`flex-1 py-2.5 text-sm rounded-lg font-medium ${
                          selection && !isProcessing
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Scan Area Terpilih
                      </button>
                      <button
                        onClick={handleScanFull}
                        disabled={isProcessing}
                        className="flex-1 py-2.5 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                      >
                        Scan Seluruh Gambar
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {error && !isProcessing && (
              <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h2 className="text-sm font-medium text-gray-700 mb-2">
                Hasil QR Code:
              </h2>
              <div className="text-sm bg-gray-50 p-3 rounded-lg break-all font-mono">
                {result}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Salin
              </button>
              <button
                onClick={handleTryAgain}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                Coba Lagi
              </button>
            </div>

            {result.startsWith("http") && (
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 px-4 rounded-xl font-medium text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100"
              >
                Buka Tautan
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
