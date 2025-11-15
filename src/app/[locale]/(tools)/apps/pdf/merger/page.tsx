// src/app/[locale]/(tools)/apps/pdf-merge/page.tsx
"use client";

import React from "react";
import PdfMergerTool from "./components/PdfMergerTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <PdfMergerTool />
    </React.Suspense>
  );
}
