"use client";

import { useState, useRef, useEffect } from "react";
import "../../globals.css";

import { categories } from "./editor/tools/toolsMap";
import { RenderTools } from "./editor/tools/renderTools";
import { RenderToolsMobile } from "./editor/tools/renderToolsMobile";
import Header from "./Header";
import Sidebar from "./editor/Sidebar";
import CategoryButton from "./editor/CategoryButton";
import PageTransition from "./PageTransition";
import { usePathname, useRouter } from "next/navigation";
import {
  BottomNavProvider,
  useBottomNav,
} from "@/src/context/BottomNavContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <BottomNavProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </BottomNavProvider>
  );
}

export function AppLayoutContent({ children }: AppLayoutProps) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [bottomNavHeight, setBottomNavHeight] = useState(0);
  const bottomNavRef = useRef<HTMLDivElement | null>(null);
  const { hidden } = useBottomNav();

  const handleCategoryClick = (catId: string, slug?: string) => {
    if (slug) {
      // Jika kategori memiliki slug (misal Home), langsung redirect
      router.push(`/${slug}`);
    } else {
      setActive((prev) => (prev === catId ? null : catId));
    }
  };

  useEffect(() => {
    if (!bottomNavRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBottomNavHeight(entry.contentRect.height);
      }
    });

    observer.observe(bottomNavRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-gray-50">
      <Header />

      <div className="flex flex-col h-full md:flex-row">
        <Sidebar active={active} handleClick={handleCategoryClick} />

        {/* Desktop Tools Sidebar */}
        {active && (
          <div className="hidden md:block w-[240px] bg-gray-100 border-r border-gray-200 p-4 transition-all duration-200 ease-in-out">
            <RenderTools category={active} />
          </div>
        )}

        <main
          className="flex-1 bg-white overflow-auto p-4"
          style={{ paddingBottom: bottomNavHeight }}
        >
          <div className="min-h-full">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Bar */}
      {!hidden && (
        <div
          ref={bottomNavRef}
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50"
        >
          <div className="flex overflow-x-auto gap-2 px-3 py-2 border-b border-gray-200 scroll-smooth snap-x snap-mandatory scrollbar-hide">
            {categories.map((cat) => (
              <div key={cat.id} className="snap-start">
                <CategoryButton
                  id={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  active={active === cat.id}
                  onClick={() => handleCategoryClick(cat.id, cat.slug)}
                  isMobile
                />
              </div>
            ))}
          </div>

          {active && categories.find((c) => c.id === active)?.tools && (
            <div className="p-3 overflow-x-auto flex gap-3 scrollbar-hide will-change-transform">
              <RenderToolsMobile category={active} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
