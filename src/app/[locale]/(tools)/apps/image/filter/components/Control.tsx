"use client";

import React from "react";

type EditorControlsProps = {
  children: React.ReactNode;
};

export default function EditorControls({ children }: EditorControlsProps) {
  return <div className="flex flex-row gap-2">{children}</div>;
}
