"use client";

import React from "react";
import ImageConverterContent from "./components/ImageConverter";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <ImageConverterContent />
    </React.Suspense>
  );
}
