"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useState, useEffect } from "react";

import { ToolInterface } from "./tools";
import { tools } from "./tools";

// === Konfigurasi UI ===
const uiConfig = {
  colors: {
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    bgCard: "bg-background",
    borderCard: "border-border",
    bgIcon: "bg-muted/50",
    textIcon: "text-muted-foreground",
    link: "text-primary hover:underline",
    heading: "text-gray-900",
  },
  spacing: {
    cardPadding: "p-4",
    iconPadding: "p-2.5",
    gap: "gap-3",
  },
};

const groupToolsByCategory = (tools: ToolInterface[]) => {
  const grouped: Record<string, ToolInterface[]> = {};
  tools.forEach((tool) => {
    if (!grouped[tool.category]) {
      grouped[tool.category] = [];
    }
    grouped[tool.category].push(tool);
  });
  return grouped;
};

const groupedTools = groupToolsByCategory(tools);
const categories = Object.keys(groupedTools);

function ToolCard({ tool }: { tool: ToolInterface }) {
  const { colors, spacing } = uiConfig;
  return (
    <Link href={`/apps/${tool.slug}`} className="block min-w-0">
      <div
        className={`${colors.bgCard} ${colors.borderCard} rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col`}
      >
        <div className={`flex items-start ${spacing.gap}`}>
          <div
            className={`${colors.bgIcon} ${colors.textIcon} ${spacing.iconPadding} shrink-0 rounded-lg`}
          >
            {tool.icon}
          </div>
          <div className="min-w-0 grow overflow-hidden">
            <h3
              className={`${colors.textPrimary} font-semibold text-sm line-clamp-1`}
            >
              {tool.name}
            </h3>
            <p className={`${colors.textSecondary} text-xs mt-1 line-clamp-2`}>
              {tool.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// --- CategorySection dengan pagination kondisional ---
function CategorySection({
  title,
  tools,
}: {
  title: string;
  tools: ToolInterface[];
}) {
  const { colors } = uiConfig;
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Anggap mobile jika <= 768px (tailwind: md breakpoint)
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      setShowPagination(!isMobile);
    };

    // Jalankan saat mount
    checkScreenSize();

    // Tambahkan listener saat resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="mb-8 px-4">
      <h2 className={`${colors.heading} text-xl font-bold mb-4`}>{title}</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        pagination={showPagination ? { clickable: true } : false}
        modules={showPagination ? [Pagination] : []}
        className="-mx-4 px-4"
      >
        {tools.map((tool) => (
          <SwiperSlide
            key={tool.slug}
            style={{ width: "12rem" }}
            className="flex! h-auto!"
          >
            <ToolCard tool={tool} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default function Page() {
  const { colors } = uiConfig;
  return (
    <main className="bg-background min-h-screen pb-16">
      <div className="pt-6 pb-4 px-4">
        <h1 className={`${colors.heading} text-2xl font-bold`}>
          Alat Produktivitas
        </h1>
        <p className={`${colors.textSecondary} text-sm mt-1`}>
          Jelajahi alat digital untuk kesehatan & efisiensi kerja.
          <Link href="/" className={`ml-1 font-medium ${colors.link}`}>
            Kembali ke Home
          </Link>
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <CategorySection
            key={category}
            title={category}
            tools={groupedTools[category]}
          />
        ))}
      </div>
    </main>
  );
}
