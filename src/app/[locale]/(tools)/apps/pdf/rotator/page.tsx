// src/app/[locale]/(tools)/apps/pdf-rotate/page.tsx
"use client";

import React from "react";
import PdfRotatorTool from "./components/PdfRotatorTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <PdfRotatorTool />
    </React.Suspense>
  );
}
