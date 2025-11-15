// src/app/[locale]/(tools)/apps/pdf-split/page.tsx
"use client";

import React from "react";
import PdfSplitterTool from "./components/PdfSplitterTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <PdfSplitterTool />
    </React.Suspense>
  );
}
