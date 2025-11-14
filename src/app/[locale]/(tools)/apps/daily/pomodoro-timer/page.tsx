// src/app/[locale]/(tools)/apps/pomodoro-tool/page.tsx
"use client";

import React from "react";
import PomodoroTool from "./PomodoroTool";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function Page() {
  return (
    <React.Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <PomodoroTool />
    </React.Suspense>
  );
}
