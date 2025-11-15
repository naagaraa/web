// src/app/[locale]/(tools)/apps/image-to-pdf/page.tsx
"use client";

import React from "react";
import ImageToPdfTool from "./components/ImageToPdfTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <ImageToPdfTool />
    </React.Suspense>
  );
}
