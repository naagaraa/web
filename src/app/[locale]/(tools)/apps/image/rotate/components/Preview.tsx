"use client";

import React from "react";

type EditorPreviewProps = {
  children: React.ReactNode; // apapun: <img>, <video>, <canvas>, dll
  overlay?: React.ReactNode; // optional: info kecil di atas preview
};

export default function EditorPreview({
  children,
  overlay,
}: EditorPreviewProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black/5">
      {children}
      {overlay && (
        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {overlay}
        </div>
      )}
    </div>
  );
}
