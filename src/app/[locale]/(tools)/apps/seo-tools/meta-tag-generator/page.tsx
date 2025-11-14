// src/app/[locale]/(tools)/apps/meta-tag-generator/page.tsx
"use client";

import React from "react";
import MetaTagGenerator from "./components/MetaTagTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <MetaTagGenerator />
    </React.Suspense>
  );
}
