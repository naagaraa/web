/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Image,
  Text,
  Upload,
  SlidersHorizontal,
} from "lucide-react";
import type { Metadata } from "next";
import UserDropdown from "./UserDropdown";
import Header from "./Header";

export const metadata: Metadata = {
  title: "Editor",
  description: "Responsive Canva/CapCut-style Editor Layout",
};

const categories = [
  { id: "design", icon: <LayoutDashboard size={20} />, label: "Design" },
  { id: "elements", icon: <Image size={20} />, label: "Elements" },
  { id: "text", icon: <Text size={20} />, label: "Text" },
  { id: "uploads", icon: <Upload size={20} />, label: "Uploads" },
  { id: "tools", icon: <SlidersHorizontal size={20} />, label: "Tools" },
];

// Komponen reusable untuk kategori bar di mobile dan desktop
const CategoryButton = ({
  id,
  icon,
  label,
  active,
  onClick,
  isMobile = false,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isMobile?: boolean;
}) => {
  const baseStyle =
    "flex items-center justify-center p-2 rounded transition-all";
  const activeStyle = active
    ? "bg-blue-100 text-blue-600 scale-105"
    : "hover:bg-gray-100 text-gray-600";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${activeStyle} ${
        isMobile ? "flex-col text-xs gap-1 w-14" : ""
      }`}
    >
      {icon}
      {isMobile && <span className="text-[10px]">{label}</span>}
    </button>
  );
};

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [active, setActive] = useState("design");
  // state aktif
  const [active, setActive] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // handler klik
  const handleCategoryClick = (id: string) => {
    if (active === id) {
      setActive(null); // toggle off
    } else {
      setActive(id); // set aktif
    }
  };

  const renderTools = () => {
    switch (active) {
      case "design":
        return (
          <ul className="space-y-2">
            <li>🎯 Canvas Size</li>
            <li>📐 Layout Grid</li>
            <li>🎨 Background Color</li>
            <li>↕️ Padding & Spacing</li>
          </ul>
        );
      case "elements":
        return (
          <ul className="space-y-2">
            <li>⬛ Basic Shapes</li>
            <li>⭐ Icons</li>
            <li>🧩 Stickers</li>
            <li>🎭 Illustrations</li>
            <li>📏 Lines & Dividers</li>
          </ul>
        );
      case "text":
        return (
          <ul className="space-y-2">
            <li>🔤 Font Picker</li>
            <li>🔠 Font Size</li>
            <li>🅱 Bold / Italic / Underline</li>
            <li>🧾 Text Alignment</li>
            <li>📏 Letter Spacing</li>
            <li>🎨 Text Color</li>
          </ul>
        );
      case "uploads":
        return (
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
        );
      case "tools":
        return (
          <ul className="space-y-2">
            <li>✂️ Background Remover</li>
            <li>🤖 Auto Layout (AI)</li>
            <li>📐 Resize Presets</li>
            <li>✨ Animate Elements</li>
            <li>🎨 Color Palette Generator</li>
          </ul>
        );
      default:
        return null;
    }
  };

  const renderToolsMobile = () => {
    const toolsMap: { [key: string]: { label: string; icon: string }[] } = {
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
        { label: "Gallery", icon: "🖼️" },
        { label: "Gallery", icon: "🖼️" },
        { label: "Gallery", icon: "🖼️" },
        { label: "Gallery", icon: "🖼️" },
      ],
      tools: [
        { label: "Remove BG", icon: "✂️" },
        { label: "Auto Layout", icon: "🤖" },
        { label: "Animate", icon: "✨" },
        { label: "Animate", icon: "✨" },
        { label: "Animate", icon: "✨" },
      ],
    };

    const activeTools = toolsMap[active ?? ""] || [];

    return activeTools.map((tool, i) => (
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
    ));
  };

  // return (
  //   <html lang="en">
  //     <body className="h-screen overflow-hidden">
  //       <div className="flex flex-col h-full md:flex-row">
  //         {/* Desktop Sidebar */}
  //         <aside className="hidden md:flex flex-col w-14 bg-white border-r items-center py-4 gap-2 relative">
  //           {/* Scrollable Tool Categories */}
  //           <div className="flex-1 flex flex-col items-center gap-2 overflow-y-auto w-full">
  //             {categories.map((cat) => (
  //               <CategoryButton
  //                 key={cat.id}
  //                 id={cat.id}
  //                 icon={cat.icon}
  //                 label={cat.label}
  //                 active={active === cat.id}
  //                 onClick={() => handleCategoryClick(cat.id)}
  //               />
  //             ))}
  //           </div>

  //           {/* Divider */}
  //           <div className="w-full border-t my-2" />

  //           {/* User Dropdown */}
  //           <UserDropdown />
  //         </aside>

  //         {/* Tool Panel (Desktop Only) */}
  //         {active && (
  //           <div className="hidden md:block w-[240px] bg-gray-50 border-r p-4">
  //             {renderTools()}
  //           </div>
  //         )}

  //         {/* Area Kerja */}
  //         <main className="flex-1 bg-white overflow-auto p-4">
  //           <Header />
  //           <div className="pt-[64px]">{children}</div>
  //         </main>
  //         {/* Mobile Bottom Tools Panel */}
  //         <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
  //           {/* Kategori selector */}
  //           <div className="flex overflow-x-auto p-2 border-b gap-2">
  //             {categories.map((cat) => (
  //               <CategoryButton
  //                 key={cat.id}
  //                 id={cat.id}
  //                 icon={cat.icon}
  //                 label={cat.label}
  //                 active={active === cat.id}
  //                 onClick={() => handleCategoryClick(cat.id)}
  //                 isMobile
  //               />
  //             ))}
  //           </div>

  //           {/* Tools content - horizontal scrollable on mobile */}
  //           {/* Panel tools (mobile only) */}
  //           {active && (
  //             <div className="p-3 overflow-x-auto flex md:hidden gap-3 scroll-smooth">
  //               {renderToolsMobile()}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </body>
  //   </html>
  // );

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        {/* Fixed Header - di luar layout */}
        <Header />

        {/* Layout Wrapper (harus kasih padding top biar isi turun) */}
        <div className="flex flex-col h-full pt-[64px] md:flex-row">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex flex-col w-14 bg-white border-r items-center py-4 gap-2 relative">
            <div className="flex-1 flex flex-col items-center gap-2 overflow-y-auto w-full">
              {categories.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  id={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  active={active === cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                />
              ))}
            </div>
            <div className="w-full border-t my-2" />
            <UserDropdown />
          </aside>

          {/* Tool Panel (Desktop Only) */}
          {active && (
            <div className="hidden md:block w-[240px] bg-gray-50 border-r p-4">
              {renderTools()}
            </div>
          )}

          {/* Main Workspace */}
          <main className="flex-1 bg-white overflow-auto p-4">{children}</main>
        </div>

        {/* Mobile Bottom Tools Panel */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
          {/* Kategori selector */}
          <div className="flex overflow-x-auto p-2 border-b gap-2">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                id={cat.id}
                icon={cat.icon}
                label={cat.label}
                active={active === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                isMobile
              />
            ))}
          </div>

          {/* Tools content - horizontal scrollable on mobile */}
          {active && (
            <div className="p-3 overflow-x-auto flex md:hidden gap-3 scroll-smooth">
              {renderToolsMobile()}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
