"use client";

interface ToolItem {
  label: string;
  icon: string;
}

interface MobileToolbarProps {
  active: string | null;
  selectedTool: string | null;
  setSelectedTool: (label: string) => void;
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const toolsMap: Record<string, ToolItem[]> = {
  design: [
    { label: "Canvas Size", icon: "🎯" },
    { label: "Layout Grid", icon: "📐" },
    { label: "Background", icon: "🎨" },
    { label: "Spacing", icon: "📏" },
  ],
  elements: [
    { label: "Shapes", icon: "⬛" },
    { label: "Icons", icon: "⭐" },
    { label: "Stickers", icon: "🧩" },
    { label: "Lines", icon: "📏" },
  ],
  text: [
    { label: "Font", icon: "🔤" },
    { label: "Size", icon: "🔠" },
    { label: "Color", icon: "🎨" },
    { label: "Spacing", icon: "📏" },
  ],
  uploads: [
    { label: "Upload", icon: "📤" },
    { label: "Gallery", icon: "🖼️" },
    { label: "Import", icon: "📥" },
    { label: "Cloud Sync", icon: "☁️" },
  ],
  tools: [
    { label: "Remove BG", icon: "✂️" },
    { label: "Auto Layout", icon: "🤖" },
    { label: "Animate", icon: "✨" },
    { label: "Magic Resize", icon: "🧙" },
  ],
  images: [
    { label: "Search Stock", icon: "🔍" },
    { label: "Photos", icon: "📷" },
    { label: "Crop", icon: "✂️" },
    { label: "Filters", icon: "🎛️" },
  ],
  audio: [
    { label: "Record", icon: "🎙️" },
    { label: "Upload", icon: "📤" },
    { label: "Music Library", icon: "🎵" },
    { label: "Adjust Volume", icon: "🔊" },
  ],
  video: [
    { label: "Trim", icon: "✂️" },
    { label: "Transitions", icon: "🎬" },
    { label: "Subtitles", icon: "💬" },
    { label: "Playback Speed", icon: "⏩" },
  ],
  layers: [
    { label: "Arrange", icon: "🧅" },
    { label: "Group", icon: "👥" },
    { label: "Lock", icon: "🔒" },
    { label: "Hide", icon: "🙈" },
  ],
  export: [
    { label: "Download", icon: "⬇️" },
    { label: "Share", icon: "🔗" },
    { label: "Print", icon: "🖨️" },
    { label: "Export as PDF", icon: "📄" },
  ],
};

const MobileToolbar = ({
  active,
  selectedTool,
  setSelectedTool,
}: MobileToolbarProps) => {
  const activeTools = toolsMap[active ?? ""] || [];

  return (
    <div className="p-3 overflow-x-auto flex md:hidden gap-3 scrollbar-none [-webkit-overflow-scrolling:touch] scrollbar-hide">
      {activeTools.map((tool, i) => (
        <button
          key={i}
          onClick={() => setSelectedTool(tool.label)}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-md w-[64px] text-center shrink-0",
            selectedTool === tool.label
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100"
          )}
        >
          <span className="text-base sm:text-lg md:text-xl">{tool.icon}</span>
          <span className="mt-1 text-[10px] sm:text-xs md:text-sm">
            {tool.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MobileToolbar;
