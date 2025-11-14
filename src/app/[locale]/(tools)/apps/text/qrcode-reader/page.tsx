// src/app/[locale]/(tools)/apps/qr-code-reader/page.tsx
"use client";

import React from "react";
import QRCodeReader from "./components/QRCodeReader";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <QRCodeReader />
    </React.Suspense>
  );
}
