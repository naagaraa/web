// src/app/[locale]/(tools)/apps/qr-code-generator/page.tsx
"use client";

import React from "react";
import QRCodeGenerator from "./components/QrCodeGenerator";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <QRCodeGenerator />
    </React.Suspense>
  );
}
