"use client";

import React from "react";
import ImageCropTool from "./components/ImageCropTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <ImageCropTool />
    </React.Suspense>
  );
}
