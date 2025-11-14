// src/app/[locale]/(tools)/apps/countdown-tool/page.tsx
"use client";

import React from "react";
import CountdownTool from "./CountdownTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <CountdownTool />
    </React.Suspense>
  );
}
