// /* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import CategoryButton from "./CategoryButton";
import { categories } from "./tools/toolsMap";
import { RenderTools } from "./tools/renderTools";
import { RenderToolsMobile } from "./tools/renderToolsMobile";
import PageTransition from "./PageTransition";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <main className="h-screen overflow-hidden">
        <Header />

        <div className="flex flex-col h-full pt-[64px] md:flex-row">
          <Sidebar active={active} handleClick={handleCategoryClick} />

          {active && (
            <div className="hidden md:block w-[240px] bg-gray-50 border-r p-4">
              <RenderTools category={active} />
            </div>
          )}

          <main className="flex-1 bg-white overflow-auto pl-4">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>

        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
          <div className="flex overflow-x-auto gap-2 px-3 py-2 border-b scroll-smooth snap-x snap-mandatory">
            {categories.map((cat) => (
              <div key={cat.id} className="snap-start">
                <CategoryButton
                  id={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  active={active === cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  isMobile
                />
              </div>
            ))}
          </div>

          {active && (
            <div className="p-3 overflow-x-auto flex md:hidden gap-3 scrollbar-none [-webkit-overflow-scrolling:touch] scrollbar-hide">
              <RenderToolsMobile
                category={active}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
