/* eslint-disable jsx-a11y/alt-text */
"use client";

import Footer from "@/src/components/layout/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import slugify from "slugify";

import {
  Droplet,
  FileText,
  Brain,
  Smile,
  FileInput,
  Image as ImageIcon,
  HeartPulse,
  BedDouble,
  Calculator,
  Baby,
  Utensils,
  PieChart,
  Activity,
  Flame,
  ShieldCheck,
  FileCode,
  Code,
  QrCode,
  Crop,
  Image,
  Code2,
  Divide,
  ListOrdered,
} from "lucide-react";

interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isNew?: boolean;
}

const tools: Tool[] = [
  // Calculator
  {
    id: 1,
    name: "Blood Glucose",
    slug: "calculator/blood-glucose",
    description: "Hitung dan pantau kadar gula darah harian Anda.",
    icon: <Droplet className="w-6 h-6 text-blue-600" />,
    category: "Calculator",
  },
  {
    id: 2,
    name: "BMI",
    slug: "calculator/bmi",
    description:
      "Menghitung Body Mass Index berdasarkan tinggi dan berat badan.",
    icon: <Activity className="w-6 h-6 text-green-600" />,
    category: "Calculator",
  },
  {
    id: 3,
    name: "BMR",
    slug: "calculator/bmr",
    description:
      "Mengukur kebutuhan kalori harian Anda dalam keadaan istirahat.",
    icon: <HeartPulse className="w-6 h-6 text-pink-500" />,
    category: "Calculator",
  },
  {
    id: 4,
    name: "Calorie",
    slug: "calculator/calorie",
    description: "Menghitung konsumsi dan kebutuhan kalori harian.",
    icon: <Utensils className="w-6 h-6 text-yellow-600" />,
    category: "Calculator",
  },
  {
    id: 5,
    name: "Macronutrient",
    slug: "calculator/macronutrient",
    description: "Tentukan distribusi protein, karbohidrat, dan lemak.",
    icon: <PieChart className="w-6 h-6 text-purple-600" />,
    category: "Calculator",
  },
  {
    id: 6,
    name: "Pregnancy",
    slug: "calculator/pregnancy",
    description: "Perkiraan tanggal kelahiran dan status kehamilan.",
    icon: <Baby className="w-6 h-6 text-rose-500" />,
    category: "Calculator",
  },
  {
    id: 7,
    name: "Sleep Time",
    slug: "calculator/sleep-time",
    description: "Rencanakan waktu tidur yang optimal untuk produktivitas.",
    icon: <BedDouble className="w-6 h-6 text-indigo-500" />,
    category: "Calculator",
  },
  {
    id: 8,
    name: "Vitamins",
    slug: "calculator/vitamins",
    description: "Cek kebutuhan vitamin harian berdasarkan usia dan gender.",
    icon: <Calculator className="w-6 h-6 text-orange-500" />,
    category: "Calculator",
  },
  {
    id: 9,
    name: "Water",
    slug: "calculator/water",
    description: "Rekomendasi jumlah air minum harian.",
    icon: <Droplet className="w-6 h-6 text-cyan-600" />,
    category: "Calculator",
  },
  {
    id: 10,
    name: "Anxiety",
    slug: "mental-health/anxiety",
    description: "Alat bantu evaluasi dan manajemen kecemasan.",
    icon: <Brain className="w-6 h-6 text-fuchsia-600" />,
    category: "Mental Health",
  },
  {
    id: 11,
    name: "Depression",
    slug: "mental-health/depression",
    description: "Skrining awal dan informasi seputar depresi.",
    icon: <Smile className="w-6 h-6 text-sky-500" />,
    category: "Mental Health",
  },
  {
    id: 12,
    name: "PDF Tools",
    slug: "pdf tools",
    description: "Gabung, kompres, atau pisahkan file PDF Anda.",
    icon: <FileInput className="w-6 h-6 text-gray-600" />,
    category: "Documents",
  },
  {
    id: 13,
    name: "Text Tools",
    slug: "Text Tools",
    description: "Alat bantu analisis, konversi, atau edit teks.",
    icon: <FileText className="w-6 h-6 text-gray-700" />,
    category: "Documents",
  },
  {
    id: 14,
    name: "Image Compressor",
    slug: "image/compressor",
    description:
      "Kompres gambar untuk ukuran lebih kecil tanpa kehilangan kualitas secara signifikan.",
    icon: <ImageIcon className="w-6 h-6 text-pink-700" />,
    category: "Image Tools",
  },
  {
    id: 15,
    name: "Burnout Checker",
    slug: "mental-health/burnout-checker",
    description: "Tes untuk mengukur tingkat burnout emosional.",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    category: "Mental Health",
  },
  {
    id: 16,
    name: "JWT Decoder",
    slug: "text/jwt-decoder",
    description: "Dekode dan periksa struktur token JWT dengan mudah.",
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
    category: "Developer Tools",
  },
  {
    id: 17,
    name: "Base64 Decoder Encoder",
    slug: "text/base64-decoder-encoder",
    description:
      "Encode dan decode teks ke atau dari format Base64 secara instan.",
    icon: <FileCode className="w-6 h-6 text-indigo-500" />,
    category: "Developer Tools",
  },
  {
    id: 18,
    name: "JSON Formatter",
    slug: "text/json-formatter",
    description: "Format dan perindah struktur JSON dengan validasi otomatis.",
    icon: <Code className="w-6 h-6 text-green-500" />,
    category: "Developer Tools",
  },
  {
    id: 19,
    name: "QR Code Generator",
    slug: "text/qrcode",
    description:
      "Buat dan unduh QR Code dari teks atau tautan hanya dengan sekali klik.",
    icon: <QrCode className="w-6 h-6 text-pink-500" />,
    category: "Utilities",
  },
  {
    id: 20,
    name: "Image Converter",
    slug: "image/converter",
    description:
      "Ubah format gambar ke JPG, PNG, WebP, dan lainnya secara instan.",
    icon: <Image className="w-6 h-6 text-yellow-500" />,
    category: "Image Tools",
  },
  {
    id: 21,
    name: "Image Cropper",
    slug: "image/cropper",
    description: "Crop gambar dengan aspek rasio tertentu atau secara bebas.",
    icon: <Crop className="w-6 h-6 text-green-500" />,
    category: "Image Tools",
  },
  {
    id: 22,
    name: "Image Watermark Tool",
    slug: "image/watermark",
    description: "Tambahkan watermark berupa teks atau logo ke dalam gambar.",
    icon: <Droplet className="w-6 h-6 text-blue-500" />,
    category: "Image Tools",
  },
  {
    id: 23,
    name: "Conversion Tools",
    slug: "calculator/conversion-tools",
    description: "Konversi IP ke biner, CIDR ke subnet mask, dan sebaliknya.",
    icon: <Code2 className="w-6 h-6 text-green-500" />,
    category: "Network Tools",
  },
  {
    id: 24,
    name: "IP Subnetting Calculator",
    slug: "calculator/ip-subnetting",
    description:
      "Hitung subnet, IP range, broadcast, dan jumlah host dari CIDR.",
    icon: <Divide className="w-6 h-6 text-purple-500" />,
    category: "Network Tools",
  },
  {
    id: 25,
    name: "VLSM Calculator",
    slug: "calculator/vlsm-calculator",
    description: "Alat perhitungan subnet dengan panjang variabel (VLSM).",
    icon: <ListOrdered className="w-6 h-6 text-orange-500" />,
    category: "Network Tools",
  },
];

// Kelompokkan tools berdasarkan kategori
const groupToolsByCategory = (tools: typeof tools) => {
  const grouped: Record<string, typeof tools> = {};
  tools.forEach((tool: { category: string | number }) => {
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
    <Link href={`/apps/${tool.slug}`} className="shrink-0 w-48">
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

// --- Komponen Horizontal Scroll Section ---
function CategorySection({
  title,
  tools,
}: {
  title: string;
  tools: (typeof groupedTools)[string];
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 px-4">{title}</h2>
      <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-2">
        {tools.map((tool: Tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

// --- Halaman Utama ---
export default function page() {
  return (
    <main className="bg-gray-50 min-h-screen pb-16">
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
