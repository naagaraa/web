// src/app/[locale]/(tools)/apps/jwt-decoder/page.tsx
"use client";

import React from "react";
import JwtDecoder from "./components/JwtDecoder";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <JwtDecoder />
    </React.Suspense>
  );
}
