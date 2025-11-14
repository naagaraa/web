// src/app/[locale]/(tools)/apps/rotate/page.tsx
"use client";

import React from "react";
import RotateImage from "./components/ImageRotate";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <RotateImage />
    </React.Suspense>
  );
}
