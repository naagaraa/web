/* eslint-disable jsx-a11y/alt-text */
"use client";

import "react-loading-skeleton/dist/skeleton.css";
import Footer from "@/components/UI/footer";
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

export default function page() {
  return (
    <>
      <main className="bg-white">
        <ProductivityTools />
        <Footer />
      </main>
    </>
  );
}

const toKebabCase = (text: string) =>
  slugify(text, { lower: true, strict: true });

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

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

function ProductivityTools() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = selectedCategory
    ? tools.filter((tool) => tool.category === selectedCategory)
    : tools;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Alat Produktivitas
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Jelajahi alat digital kami untuk mendukung kesehatan dan efisiensi
            kerja.
            <Link
              prefetch
              href="/apps"
              className="ml-2 text-blue-600 hover:underline"
            >
              Lihat Semua
            </Link>
          </p>
        </div>

        {/* Kategori */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <CategoryButton
            label="Semua"
            active={!selectedCategory}
            onClick={() => setSelectedCategory(null)}
          />
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={`/apps/${tool.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg">{tool.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 break-words line-clamp-2 md:line-clamp-3">
                      {tool.description}
                    </p>
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

function CategoryButton({
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
      className={`px-4 py-2 text-sm rounded-full transition font-medium ${
        active
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
