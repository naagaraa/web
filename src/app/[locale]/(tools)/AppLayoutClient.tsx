// src/app/[locale]/(tools)/apps/AppLayoutClient.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { categories } from "./editor/components/toolsMap";
import { RenderTools } from "./editor/components/renderTools";
import { RenderToolsMobile } from "./editor/components/renderToolsMobile";
import Header from "./editor/Header";
import Sidebar from "./editor/components/Sidebar";
import CategoryButton from "./editor/components/CategoryButton";
import PageTransition from "./editor/PageTransition";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  BottomNavProvider,
  useBottomNav,
} from "@/src/context/BottomNavContext";
import InAppBrowserWarning from "@/src/components/InAppBrowserWarning";

interface AppLayoutClientProps {
  children: React.ReactNode;
}

export default function AppLayoutClient({ children }: AppLayoutClientProps) {
  return (
    <BottomNavProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </BottomNavProvider>
  );
}

function AppLayoutContent({ children }: AppLayoutClientProps) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [bottomNavHeight, setBottomNavHeight] = useState(0);
  const bottomNavRef = useRef<HTMLDivElement | null>(null);
  const { hidden } = useBottomNav();
  const params = useParams();
  const locale = params.locale as string; // "en", "id", dll.

  const handleCategoryClick = (catId: string, slug?: string) => {
    if (slug) {
      setActive(catId);
      setTimeout(() => {
        router.push(`/${locale}/${slug}`, { scroll: false }); // 👈 tambahkan { scroll: false }
      }, 80);
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
      <InAppBrowserWarning />

      <div className="flex flex-col h-full md:flex-row">
        <Sidebar active={active} handleClick={handleCategoryClick} />

        {/* Desktop Tools Sidebar */}
        {active && (
          <div className="hidden md:block w-60 bg-gray-100 border-r border-gray-200 p-4 transition-all duration-200 ease-in-out">
            <RenderTools category={active} />
          </div>
        )}

        <main
          className="flex-1 bg-white overflow-auto p-4"
          style={{ paddingBottom: hidden ? 0 : bottomNavHeight }}
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
