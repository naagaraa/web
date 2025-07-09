"use client";

interface ToolPanelProps {
  active: string | null;
}

const ToolPanel = ({ active }: ToolPanelProps) => {
  const toolsMap: Record<string, React.ReactNode> = {
    design: (
      <ul className="space-y-2">
        <li>🎯 Canvas Size</li>
        <li>📐 Layout Grid</li>
        <li>🎨 Background Color</li>
        <li>↕️ Padding & Spacing</li>
      </ul>
    ),
    elements: (
      <ul className="space-y-2">
        <li>⬛ Basic Shapes</li>
        <li>⭐ Icons</li>
        <li>🧩 Stickers</li>
        <li>🎭 Illustrations</li>
        <li>📏 Lines & Dividers</li>
      </ul>
    ),
    text: (
      <ul className="space-y-2">
        <li>🔤 Font Picker</li>
        <li>🔠 Font Size</li>
        <li>🅱 Bold / Italic / Underline</li>
        <li>🧾 Text Alignment</li>
        <li>📏 Letter Spacing</li>
        <li>🎨 Text Color</li>
      </ul>
    ),
    uploads: (
      <div className="space-y-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
          📤 Upload Media
        </button>
        <ul className="text-sm pl-3 list-disc">
          <li>image1.png</li>
          <li>logo.svg</li>
          <li>video_clip.mp4</li>
        </ul>
      </div>
    ),
    tools: (
      <ul className="space-y-2">
        <li>✂️ Background Remover</li>
        <li>🤖 Auto Layout (AI)</li>
        <li>📐 Resize Presets</li>
        <li>✨ Animate Elements</li>
        <li>🎨 Color Palette Generator</li>
      </ul>
    ),
    images: (
      <ul className="space-y-2">
        <li>🔍 Search Stock Photos</li>
        <li>📷 Photo Library</li>
        <li>✂️ Crop Tool</li>
        <li>🎛️ Apply Filters</li>
      </ul>
    ),
    audio: (
      <ul className="space-y-2">
        <li>🎙️ Record Audio</li>
        <li>📤 Upload Sound</li>
        <li>🎵 Music Library</li>
        <li>🔊 Adjust Volume</li>
      </ul>
    ),
    video: (
      <ul className="space-y-2">
        <li>✂️ Trim Video</li>
        <li>🎬 Add Transitions</li>
        <li>💬 Add Subtitles</li>
        <li>⏩ Playback Speed</li>
      </ul>
    ),
    layers: (
      <ul className="space-y-2">
        <li>🧅 Arrange Layers</li>
        <li>👥 Group Elements</li>
        <li>🔒 Lock Layer</li>
        <li>🙈 Hide Layer</li>
      </ul>
    ),
    export: (
      <ul className="space-y-2">
        <li>⬇️ Download File</li>
        <li>🔗 Share Link</li>
        <li>🖨️ Print Design</li>
        <li>📄 Export as PDF</li>
      </ul>
    ),
  };

  return (
    <div className="hidden md:block w-[240px] bg-gray-50 border-r p-4">
      {active && toolsMap[active]}
    </div>
  );
};

export default ToolPanel;
