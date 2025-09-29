"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        inline-flex items-center gap-2
        px-3 py-2
        rounded-full
        bg-neutral-100
        shadow-sm
        active:scale-95
        transition
      "
    >
      <ArrowLeft className="w-5 h-5 text-neutral-800" />
      <span className="text-sm font-medium text-neutral-800">Kembali</span>
    </button>
  );
}
export default BackButton;
