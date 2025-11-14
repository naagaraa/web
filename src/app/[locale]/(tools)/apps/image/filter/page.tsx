// src/app/[locale]/(tools)/apps/filter/page.tsx
"use client";

import React from "react";
import ImageFilterTool from "./FilterImageTools";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <ImageFilterTool />
    </React.Suspense>
  );
}
