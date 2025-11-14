// src/app/[locale]/(tools)/apps/base64-tool/page.tsx
"use client";

import React from "react";
import Base64Tool from "./components/Base64Tool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <Base64Tool />
    </React.Suspense>
  );
}
