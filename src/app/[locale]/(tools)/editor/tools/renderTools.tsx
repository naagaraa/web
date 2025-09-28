"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "./toolsMap";

interface RenderToolsProps {
  category: string;
}

export function RenderTools({ category }: RenderToolsProps) {
  const pathname = usePathname();

  const cat = categories.find((c) => c.id === category);
  const tools = cat?.tools;

  if (!tools || tools.length === 0) {
    return (
      <p className="text-sm text-gray-500 px-3 py-2">
        {cat?.slug
          ? "Kategori ini bisa langsung diakses."
          : "Tidak ada tools tersedia."}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {tools.map((tool) => {
        const slugPath = `/${tool.slug}`;
        const isActive =
          pathname === slugPath || pathname.startsWith(slugPath + "/");

        return (
          <li key={tool.slug}>
            <Link
              href={slugPath}
              className={`flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="w-5 h-5 flex-shrink-0">{tool.icon}</span>
              <span>{tool.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
