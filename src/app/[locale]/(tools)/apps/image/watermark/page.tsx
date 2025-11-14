"use client";

import React from "react";
import WatermarkTool from "./components/ImageWatermarkTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <WatermarkTool />
    </React.Suspense>
  );
}
