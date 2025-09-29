/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ImageConverter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      toast.success("Gambar berhasil diunggah!");
    };
    reader.readAsDataURL(file);
  };

  const openPreview = () => {
    if (!imageSrc) return;
    setIsModalOpen(true);
  };

  const closePreview = () => {
    setIsModalOpen(false);
  };

  const handleConvertDownload = () => {
    if (!imageSrc || !canvasRef.current || isProcessing) return;

    setIsProcessing(true);
    setProgress(0);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let fake = 0;
      const interval = setInterval(() => {
        fake += Math.floor(Math.random() * 15) + 5;
        setProgress((p) => Math.min(100, Math.max(p, fake)));
        if (fake >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            try {
              const mime = outputFormat === "jpeg" ? "jpeg" : outputFormat;
              const dataUrl = canvas.toDataURL(`image/${mime}`);
              const link = document.createElement("a");
              link.download = `converted.${outputFormat}`;
              link.href = dataUrl;
              link.click();

              setProgress(100);
              toast.success("Gambar berhasil dikonversi dan diunduh!");
            } catch (err) {
              toast.error("Gagal mengonversi gambar.");
            } finally {
              setIsProcessing(false);
              setTimeout(() => setProgress(0), 300);
            }
          }, 350);
        }
      }, 180);
    };

    img.onerror = () => {
      toast.error("Gagal memproses gambar.");
      setIsProcessing(false);
      setProgress(0);
    };
  };

  return (
    <main className="min-h-screen bg-gradient-to-b ">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Image Converter
        </h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto sm:mx-0">
          Ubah format gambar ke <span className="font-medium">PNG</span>,{" "}
          <span className="font-medium">JPEG</span>, atau{" "}
          <span className="font-medium">WEBP</span> — langsung di browser, tanpa
          upload ke server.
        </p>
      </header>

      {/* Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 sm:p-6 space-y-6">
            {/* Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Gambar
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                    {imageSrc ? "Ganti Gambar" : "Unggah Gambar"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </div>
                </label>

                <div className="flex items-center gap-2">
                  {imageSrc && !isProcessing && (
                    <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Siap
                    </span>
                  )}
                  {isProcessing && (
                    <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {progress}%
                    </span>
                  )}
                  {!imageSrc && (
                    <span className="text-sm text-gray-500">
                      Belum ada gambar
                    </span>
                  )}
                </div>
              </div>
            </div>

            {imageSrc && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="format"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Format Output
                    </label>
                    <select
                      id="format"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                    >
                      <option value="png">PNG</option>
                      <option value="jpeg">JPG/JPEG</option>
                      <option value="webp">WEBP</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleConvertDownload}
                      disabled={isProcessing}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition ${
                        isProcessing
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Memproses...
                        </>
                      ) : (
                        "Unduh Hasil"
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setImageSrc(null);
                        setProgress(0);
                      }}
                      className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    ✨ Semua proses dilakukan di perangkat Anda — aman dan
                    cepat.
                  </p>
                </div>

                {/* Preview */}
                <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Preview
                    </span>
                    <span className="text-xs text-gray-500 uppercase">
                      {outputFormat}
                    </span>
                  </div>
                  <div className="bg-white border border-gray-100 rounded flex items-center justify-center p-2 min-h-[200px]">
                    <img
                      src={imageSrc}
                      alt="Preview"
                      className="max-h-[300px] w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={openPreview}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Lihat penuh
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <canvas ref={canvasRef} className="hidden" />

      {/* Modal */}
      {/* Modal: Fullscreen di mobile, tanpa scroll, gambar auto-fit */}
      {isModalOpen && imageSrc && (
        <div
          className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center p-0 sm:p-4"
          style={{ background: "rgba(0, 0, 0, 0.25)" }}
          onClick={(e) => {
            if (window.innerWidth >= 640 && e.target === e.currentTarget) {
              closePreview();
            }
          }}
        >
          {/* Frosted glass backdrop */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

          {/* Modal content */}
          <div className="relative w-full h-screen sm:h-auto sm:w-full sm:max-w-md flex flex-col bg-white/90 sm:bg-white sm:rounded-xl border-0 sm:border sm:border-white/20 overflow-hidden">
            {/* Header (tinggi ~60px di mobile) */}
            <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-100 sm:border-0">
              <span className="text-sm font-medium text-gray-800">Preview</span>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-800 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Tutup preview"
              >
                ✕
              </button>
            </div>

            {/* Container gambar — tinggi dinamis, tanpa scroll */}
            <div
              className="w-full flex items-center justify-center p-2 sm:p-4"
              // Tinggi = 100vh - header - footer (jika ada)
              style={{
                height: "calc(100vh - 60px - 60px)", // 60px header + 60px footer (mobile)
              }}
            >
              <img
                src={imageSrc}
                alt="Preview"
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>

            {/* Footer (hanya mobile) */}
            <div
              className="p-4 pt-2 border-t border-gray-100 sm:hidden"
              style={{ height: "60px" }}
            >
              <button
                onClick={closePreview}
                className="w-full bg-blue-600 text-white py-2.5 text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
