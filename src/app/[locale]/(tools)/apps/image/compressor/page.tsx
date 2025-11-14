"use client";

import React from "react";
import CompressImages from "./components/ImageCompressor";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <CompressImages />
    </React.Suspense>
  );
}
