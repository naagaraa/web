// src/app/[locale]/(tools)/apps/alarm-tool/page.tsx
"use client";

import React from "react";
import AlarmTool from "./AlarmTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <AlarmTool />
    </React.Suspense>
  );
}
