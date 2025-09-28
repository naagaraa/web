"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { categories } from "./toolsMap";

interface RenderToolsMobileProps {
  category: string;
}

export function RenderToolsMobile({ category }: RenderToolsMobileProps) {
  const tools = categories.find((cat) => cat.id === category)?.tools;
  const pathname = usePathname();
  const router = useRouter();

  if (!tools || tools.length === 0) {
    return (
      <p className="text-sm text-gray-500 px-3 py-2">
        Tidak ada tools tersedia.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-2 px-3 py-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
        {tools.map((tool, index) => {
          // Automatically highlight tool if its slug matches current path
          const isActive = pathname.includes(tool.slug);

          return (
            <button
              key={index}
              onClick={() => router.push(`/${tool.slug}`)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full min-w-fit text-sm whitespace-nowrap border transition-all snap-start
                ${
                  isActive
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }
              `}
            >
              <span className="w-5 h-5">{tool.icon}</span>
              <span>{tool.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
