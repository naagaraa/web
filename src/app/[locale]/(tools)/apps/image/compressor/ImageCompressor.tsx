/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const CompressImages = () => {
  const [images, setImages] = useState<File[]>([]);
  const [compressedData, setCompressedData] = useState<
    {
      blob: Blob;
      previewUrl: string;
      originalUrl: string;
      name: string;
      originalSize: number;
      compressedSize: number;
    }[]
  >([]);
  const [quality, setQuality] = useState(0.7);
  const [progress, setProgress] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<{
    url: string;
    label: string;
  } | null>(null);

  const openModal = (url: string, label: string) => {
    setActiveImage({ url, label });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
    setCompressedData([]);
    setProgress(new Array(filesArray.length).fill(0));
    toast.success("Gambar berhasil diunggah.");
  };

  const compressImage = (
    file: File,
    index: number
  ): Promise<{
    blob: Blob;
    previewUrl: string;
    originalUrl: string;
    name: string;
    originalSize: number;
    compressedSize: number;
  }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Simulasi progress
        let fakeProgress = 0;
        const interval = setInterval(() => {
          fakeProgress += 20;
          setProgress((prev) => {
            const updated = [...prev];
            updated[index] = Math.min(fakeProgress, 100);
            return updated;
          });
          if (fakeProgress >= 100) clearInterval(interval);
        }, 200);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const previewUrl = URL.createObjectURL(blob);
              const originalUrl = URL.createObjectURL(file);
              resolve({
                blob,
                previewUrl,
                originalUrl,
                name: file.name,
                originalSize: file.size,
                compressedSize: blob.size,
              });
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleCompress = async () => {
    const compressed = await Promise.all(
      images.map((img, index) => compressImage(img, index))
    );
    setCompressedData(compressed);
    toast.success(`${compressed.length} gambar berhasil dikompres.`);
  };

  const handleDownload = (blob: Blob, index: number) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${index + 1}.jpg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Gambar ${index + 1} berhasil diunduh.`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Upload & Controls */}
        <div className="space-y-6 bg-white shadow p-6 border">
          <h1 className="text-2xl font-bold text-gray-900">Compress Images</h1>
          <p className="text-sm text-gray-600">
            Kompres gambar dengan mudah dan atur kualitas sesuai kebutuhan.
          </p>

          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {images.map((file, index) => (
                <div key={index} className="border p-2 bg-gray-50">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index + 1}`}
                    className="w-full h-40 object-contain mb-2 bg-white"
                  />
                  <p className="text-xs text-gray-600 truncate">{file.name}</p>
                  <div className="w-full bg-gray-200 h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 transition-all"
                      style={{ width: `${progress[index] || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="font-medium block mb-2 text-gray-800">
              Kualitas Gambar: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={Math.round(quality * 100)}
              onChange={(e) => setQuality(parseInt(e.target.value) / 100)}
              className="w-full accent-blue-600"
            />
          </div>

          <button
            onClick={handleCompress}
            className="w-full bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 transition"
          >
            Kompres Gambar
          </button>
        </div>

        {/* Right Side - Results */}
        <div className="space-y-6">
          {compressedData.length > 0 ? (
            <div className="bg-white shadow p-6 border space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Hasil Kompresi
                </h2>
                <span className="text-sm text-gray-600">
                  {compressedData.length} gambar berhasil dikompres
                </span>
              </div>

              {/* Desktop view (side by side) */}
              <div className="hidden sm:block space-y-8">
                {compressedData.map((img, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 border p-3 bg-gray-50"
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={img.originalUrl}
                        alt={`original-${index + 1}`}
                        onClick={() => openModal(img.originalUrl, "Original")}
                        className="w-full h-48 object-contain mb-2 bg-white cursor-pointer hover:opacity-80"
                      />
                      <p className="text-xs text-gray-600">
                        Asli: {(img.originalSize / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={img.previewUrl}
                        alt={`compressed-${index + 1}`}
                        onClick={() => openModal(img.previewUrl, "Compressed")}
                        className="w-full h-48 object-contain mb-2 bg-white cursor-pointer hover:opacity-80"
                      />
                      <p className="text-xs text-gray-600 mb-2">
                        Kompres: {(img.compressedSize / 1024).toFixed(1)} KB
                      </p>
                      <button
                        onClick={() => handleDownload(img.blob, index)}
                        className="text-blue-600 font-medium hover:underline text-sm"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile view (Swiper horizontal) */}
              <div className="sm:hidden">
                <Swiper
                  spaceBetween={12}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                >
                  {compressedData.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="border p-3 bg-gray-50">
                        <div className="grid grid-cols-2 gap-3 items-start">
                          <div className="w-full flex flex-col items-center">
                            <img
                              src={img.originalUrl}
                              alt={`original-${index + 1}`}
                              onClick={() =>
                                openModal(img.originalUrl, "Original")
                              }
                              className="w-full h-36 object-contain bg-white cursor-pointer hover:opacity-80"
                            />
                            <p className="text-xs text-gray-600 mt-2">
                              Asli: {(img.originalSize / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <div className="w-full flex flex-col items-center">
                            <img
                              src={img.previewUrl}
                              alt={`compressed-${index + 1}`}
                              onClick={() =>
                                openModal(img.previewUrl, "Compressed")
                              }
                              className="w-full h-36 object-contain bg-white cursor-pointer hover:opacity-80"
                            />
                            <p className="text-xs text-gray-600 mt-2 mb-2">
                              Kompres: {(img.compressedSize / 1024).toFixed(1)}{" "}
                              KB
                            </p>
                            <button
                              onClick={() => handleDownload(img.blob, index)}
                              className="text-blue-600 font-medium hover:underline text-sm"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-50 border text-gray-400">
              Belum ada hasil kompresi
            </div>
          )}
        </div>
      </div>

      {/* Modal Preview */}
      {isModalOpen && activeImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white w-full max-w-sm sm:max-w-2xl rounded-lg shadow-xl p-3 sm:p-6 transition-transform transform scale-100">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Label */}
            <h3 className="text-sm font-medium mb-3 text-gray-800">
              {activeImage.label}
            </h3>

            {/* Image */}
            <img
              src={activeImage.url}
              alt={activeImage.label}
              className="mx-auto max-h-[50vh] w-auto object-contain"
            />

            {/* Footer */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={closeModal}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressImages;
