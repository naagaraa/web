"use client";

import { tools } from "./ToolsData";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
        active
          ? "bg-blue-500 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );
}

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

export default function ProductivityTools() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredTools = selectedCategory
    ? tools.filter((tool) => tool.category === selectedCategory)
    : tools;

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(120deg, #93c5fd, #bfdbfe, #dbeafe, #93c5fd)`,
          backgroundSize: "400% 400%",
          animation: "gradient-move 20s ease infinite",
        }}
      />

      {/* Moving Wave Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(59,130,246,0.2), transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147,197,253,0.15), transparent 50%)
          `,
          animation: "wave-move 25s ease-in-out infinite",
        }}
      />

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md" />

      <style jsx>{`
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes wave-move {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .perspective {
          perspective: 1000px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Alat Produktivitas
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg">
            Jelajahi alat digital kami untuk mendukung kesehatan dan efisiensi
            kerja.
            <Link
              href="/apps"
              className="ml-2 font-medium text-blue-600 hover:text-blue-500 transition"
            >
              Lihat Semua →
            </Link>
          </p>
        </div>

        {/* Category Pills */}
        <div className="mb-8 sm:mb-10 relative">
          {/* Mobile Scroll */}
          <div
            ref={scrollRef}
            className="flex md:hidden overflow-x-auto gap-2 pb-2 hide-scrollbar snap-x snap-mandatory"
          >
            <div className="flex gap-2 px-4">
              <CategoryPill
                label="Semua"
                active={!selectedCategory}
                onClick={() => setSelectedCategory(null)}
              />
              {categories.map((cat) => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  active={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                />
              ))}
            </div>
          </div>

          {/* Desktop Flex Wrap */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 sm:gap-3">
            <CategoryPill
              label="Semua"
              active={!selectedCategory}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="md:hidden text-center mt-2">
            <div className="inline-flex items-center gap-1 text-xs text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span>Geser untuk melihat kategori lainnya</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={Math.random()}
              href={`/apps/${tool.slug}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="group h-full perspective"
              >
                <div className="h-full p-4 sm:p-5 bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:rotate-1 hover:scale-105 transform-gpu">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="shrink-0 mt-0.5 p-2 bg-gray-50 rounded-lg text-gray-700 group-hover:bg-gray-100 transition-colors">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="mt-1 text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
