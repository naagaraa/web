import React from "react";
import { categories } from "./toolsMap";
import { usePathname, useRouter } from "next/navigation"; // tambahkan useRouter

export function RenderToolsMobile({
  category,
  selectedTool,
  setSelectedTool,
}: {
  category: string;
  selectedTool: string | null;
  setSelectedTool: (tool: string) => void;
}) {
  const tools = categories.find((cat) => cat.id === category)?.tools;
  const router = useRouter(); // router instance

  if (!tools || tools.length === 0) {
    return (
      <p className="text-sm text-gray-500 px-3 py-2">
        Tidak ada tools tersedia.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-2 px-3 py-2 snap-x snap-mandatory overflow-x-auto">
        {tools.map((tool, index) => {
          const isActive = selectedTool === tool.name;

          const handleClick = () => {
            setSelectedTool(tool.name);
            router.push(`/${tool.slug}`); // Navigasi ke halaman tool
          };

          return (
            <button
              key={index}
              onClick={handleClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-full min-w-fit text-sm whitespace-nowrap border transition snap-start ${
                isActive
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              }`}
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
