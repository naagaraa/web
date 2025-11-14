// src/app/[locale]/(tools)/apps/json-formatter/page.tsx
"use client";

import React from "react";
import JsonFormatter from "./components/JsonFormatter";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <JsonFormatter />
    </React.Suspense>
  );
}
