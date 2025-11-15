// src/app/[locale]/(tools)/apps/pdf-watermark/page.tsx
"use client";

import React from "react";
import PdfWatermarkTool from "./components/PdfWatermarkTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <PdfWatermarkTool />
    </React.Suspense>
  );
}
