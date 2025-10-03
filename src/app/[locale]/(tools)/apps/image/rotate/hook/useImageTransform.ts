"use client";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export function useImageTransform() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const resetAll = () => {
    setImageSrc(null);
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
    setIsProcessing(false);
  };

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

  const rotate = (deg: number) =>
    setRotation((prev) => (prev + deg + 360) % 360);

  const toggleFlipX = () => setFlipX((p) => !p);
  const toggleFlipY = () => setFlipY((p) => !p);

  const resetTransform = () => {
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
  };

  const handleDownload = () => {
    if (!canvasRef.current || !imgRef.current || isProcessing) return;
    setIsProcessing(true);

    const toastId = toast.loading("Sedang memproses...");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = imgRef.current;

    let cw = img.naturalWidth;
    let ch = img.naturalHeight;
    if (rotation % 180 !== 0) {
      cw = img.naturalHeight;
      ch = img.naturalWidth;
    }
    canvas.width = cw;
    canvas.height = ch;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(cw / 2, ch / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "rotated.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          toast.success("Gambar berhasil diunduh!");
          resetAll();
        } else {
          toast.error("Export gagal.");
        }
        toast.dismiss(toastId);
        setIsProcessing(false);
      },
      "image/png",
      1
    );
  };

  return {
    // state
    imageSrc,
    rotation,
    flipX,
    flipY,
    isProcessing,

    // ref
    canvasRef,
    imgRef,

    // actions
    handleUpload,
    rotate,
    toggleFlipX,
    toggleFlipY,
    resetTransform,
    resetAll,
    handleDownload,
  };
}
