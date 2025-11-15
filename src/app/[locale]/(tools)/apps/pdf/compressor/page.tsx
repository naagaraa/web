// src/app/[locale]/(tools)/apps/pdf-compress/page.tsx
"use client";

import React from "react";
import PdfCompressTool from "./components/pdfCompressTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <PdfCompressTool />
    </React.Suspense>
  );
}
