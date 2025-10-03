"use client";

import ImageEditorLayout from "./components/Layout";
import EditorPreview from "./components/Preview";
import EditorControls from "./components/Control";
import { useImageTransform } from "./hook/useImageTransform";

export default function RotateImage() {
  const {
    imageSrc,
    rotation,
    flipX,
    flipY,
    isProcessing,
    imgRef,
    canvasRef,
    handleUpload,
    rotate,
    toggleFlipX,
    toggleFlipY,
    resetTransform,
    resetAll,
    handleDownload,
  } = useImageTransform();

  if (!imageSrc) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <label className="flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer">
          Pilih Gambar
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </main>
    );
  }

  return (
    <>
      <ImageEditorLayout
        title="Rotate"
        onCancel={resetAll}
        onSave={handleDownload}
        isProcessing={isProcessing}
        controls={
          <EditorControls>
            <div className="flex justify-between gap-2">
              <button
                onClick={() => rotate(-90)}
                disabled={isProcessing}
                className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm rounded"
              >
                ↺ 90°
              </button>
              <button
                onClick={() => rotate(90)}
                disabled={isProcessing}
                className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm rounded"
              >
                ↻ 90°
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleFlipX}
                disabled={isProcessing}
                className={`flex-1 py-2 text-sm rounded ${
                  flipX ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                Flip X
              </button>
              <button
                onClick={toggleFlipY}
                disabled={isProcessing}
                className={`flex-1 py-2 text-sm rounded ${
                  flipY ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                Flip Y
              </button>
            </div>
            <button
              onClick={resetTransform}
              disabled={isProcessing || (rotation === 0 && !flipX && !flipY)}
              className="w-full py-2 text-sm border rounded"
            >
              Reset
            </button>
          </EditorControls>
        }
      >
        <EditorPreview overlay={`${rotation}°`}>
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Preview"
            className="w-full h-full object-contain"
            style={{
              transform: `rotate(${rotation}deg) scaleX(${
                flipX ? -1 : 1
              }) scaleY(${flipY ? -1 : 1})`,
              transition: "transform 0.15s ease",
            }}
          />
        </EditorPreview>
      </ImageEditorLayout>

      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
