/* eslint-disable jsx-a11y/alt-text */
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ToolInterface } from "./tools";
import { tools } from "./tools";

// Kelompokkan tools berdasarkan kategori
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

// --- Komponen Tool Card ---
function ToolCard({ tool }: { tool: (typeof tools)[0] }) {
  return (
    <Link href={`/apps/${tool.slug}`} className="shrink-0 w-80">
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 bg-gray-100 p-2.5 rounded-lg text-gray-700">
            {tool.icon}
          </div>
          <div className="min-w-0 flex-grow">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
              {tool.name}
            </h3>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// --- Komponen Horizontal Scroll Section --

function CategorySection({
  title,
  tools,
}: {
  title: string;
  tools: ToolInterface[];
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 px-4">{title}</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        className="px-4"
        // Jika mau pagination:
        pagination={{ clickable: true }}
        // modules={[Pagination]}
      >
        {tools.map((tool: ToolInterface) => (
          <SwiperSlide key={tool.slug} style={{ width: "12rem" }}>
            <ToolCard tool={tool} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

// --- Halaman Utama ---
export default function page() {
  return (
    <main className="bg-white min-h-screen pb-16">
      <div className="pt-6 pb-4 text-start">
        <h1 className="text-2xl font-bold text-gray-900 px-4">
          Alat Produktivitas
        </h1>
        <p className="text-gray-600 text-sm mt-1 px-4">
          Jelajahi alat digital untuk kesehatan & efisiensi kerja.
          <Link
            href="/"
            className="ml-1 text-blue-600 font-medium hover:underline"
          >
            Kembali ke Home
          </Link>
        </p>
      </div>

      <div className="space-y-8">
        {/* Tampilkan semua kategori */}
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
