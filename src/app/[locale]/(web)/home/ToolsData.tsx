"use client";

import {
  Activity,
  Baby,
  BedDouble,
  Brain,
  Calculator,
  Code,
  Code2,
  Crop,
  Divide,
  Droplet,
  FileCode,
  FileInput,
  FileText,
  Flame,
  HeartPulse,
  ImageIcon,
  ListOrdered,
  PieChart,
  QrCode,
  ShieldCheck,
  Smile,
  Utensils,
} from "lucide-react";
export interface Toolinterface {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isNew?: boolean;
}

export const tools: Toolinterface[] = [
  // Calculator
  {
    name: "Blood Glucose",
    slug: "calculator/blood-glucose",
    description: "Hitung dan pantau kadar gula darah harian Anda.",
    icon: <Droplet className="w-6 h-6 text-blue-600" />,
    category: "Calculator",
  },
  {
    name: "BMI",
    slug: "calculator/bmi",
    description:
      "Menghitung Body Mass Index berdasarkan tinggi dan berat badan.",
    icon: <Activity className="w-6 h-6 text-green-600" />,
    category: "Calculator",
  },
  {
    name: "BMR",
    slug: "calculator/bmr",
    description:
      "Mengukur kebutuhan kalori harian Anda dalam keadaan istirahat.",
    icon: <HeartPulse className="w-6 h-6 text-pink-500" />,
    category: "Calculator",
  },
  {
    name: "Calorie",
    slug: "calculator/calorie",
    description: "Menghitung konsumsi dan kebutuhan kalori harian.",
    icon: <Utensils className="w-6 h-6 text-yellow-600" />,
    category: "Calculator",
  },
  {
    name: "Macronutrient",
    slug: "calculator/macronutrient",
    description: "Tentukan distribusi protein, karbohidrat, dan lemak.",
    icon: <PieChart className="w-6 h-6 text-purple-600" />,
    category: "Calculator",
  },
  {
    name: "Pregnancy",
    slug: "calculator/pregnancy",
    description: "Perkiraan tanggal kelahiran dan status kehamilan.",
    icon: <Baby className="w-6 h-6 text-rose-500" />,
    category: "Calculator",
  },
  {
    name: "Sleep Time",
    slug: "calculator/sleep-time",
    description: "Rencanakan waktu tidur yang optimal untuk produktivitas.",
    icon: <BedDouble className="w-6 h-6 text-indigo-500" />,
    category: "Calculator",
  },
  {
    name: "Vitamins",
    slug: "calculator/vitamins",
    description: "Cek kebutuhan vitamin harian berdasarkan usia dan gender.",
    icon: <Calculator className="w-6 h-6 text-orange-500" />,
    category: "Calculator",
  },
  {
    name: "Water",
    slug: "calculator/water",
    description: "Rekomendasi jumlah air minum harian.",
    icon: <Droplet className="w-6 h-6 text-cyan-600" />,
    category: "Calculator",
  },
  {
    name: "Anxiety",
    slug: "mental-health/anxiety",
    description: "Alat bantu evaluasi dan manajemen kecemasan.",
    icon: <Brain className="w-6 h-6 text-fuchsia-600" />,
    category: "Mental Health",
  },
  {
    name: "Depression",
    slug: "mental-health/depression",
    description: "Skrining awal dan informasi seputar depresi.",
    icon: <Smile className="w-6 h-6 text-sky-500" />,
    category: "Mental Health",
  },
  {
    name: "Meta Tag Generator",
    slug: "seo-tools/meta-tag-generator",
    description: "Gabung, kompres, atau pisahkan file PDF Anda.",
    icon: <FileInput className={`w-5 h-5 text-gray-600`} />,
    category: "Seo Tools",
  },
  {
    name: "Robots.txt Generator",
    slug: "seo-tools/robots-txt-generator",
    description: "Alat bantu analisis, konversi, atau edit teks.",
    icon: <FileText className={`w-5 h-5 text-gray-600`} />,
    category: "Seo Tools",
  },

  {
    name: "Sitemap Generator",
    slug: "seo-tools/sitemap-generator",
    description: "Alat bantu analisis, konversi, atau edit teks.",
    icon: <FileText className={`w-5 h-5 text-gray-600`} />,
    category: "Seo Tools",
  },
  {
    name: "Image Compressor",
    slug: "image/compressor",
    description:
      "Kompres gambar untuk ukuran lebih kecil tanpa kehilangan kualitas secara signifikan.",
    icon: <ImageIcon className="w-6 h-6 text-pink-700" />,
    category: "Image Tools",
  },
  {
    name: "Burnout Checker",
    slug: "mental-health/burnout-checker",
    description: "Tes untuk mengukur tingkat burnout emosional.",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    category: "Mental Health",
  },
  {
    name: "JWT Decoder",
    slug: "text/jwt-decoder",
    description: "Dekode dan periksa struktur token JWT dengan mudah.",
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
    category: "Developer Tools",
  },
  {
    name: "Base64 Decoder Encoder",
    slug: "text/base64-decoder-encoder",
    description:
      "Encode dan decode teks ke atau dari format Base64 secara instan.",
    icon: <FileCode className="w-6 h-6 text-indigo-500" />,
    category: "Developer Tools",
  },
  {
    name: "JSON Formatter",
    slug: "text/json-formatter",
    description: "Format dan perindah struktur JSON dengan validasi otomatis.",
    icon: <Code className="w-6 h-6 text-green-500" />,
    category: "Developer Tools",
  },
  {
    name: "QR Code Generator",
    slug: "text/qrcode",
    description:
      "Buat dan unduh QR Code dari teks atau tautan hanya dengan sekali klik.",
    icon: <QrCode className="w-6 h-6 text-pink-500" />,
    category: "Utilities",
  },
  {
    name: "Image Converter",
    slug: "image/converter",
    description:
      "Ubah format gambar ke JPG, PNG, WebP, dan lainnya secara instan.",
    icon: <ImageIcon className="w-6 h-6 text-yellow-500" />,
    category: "Image Tools",
  },
  {
    name: "Image Cropper",
    slug: "image/cropper",
    description: "Crop gambar dengan aspek rasio tertentu atau secara bebas.",
    icon: <Crop className="w-6 h-6 text-green-500" />,
    category: "Image Tools",
  },
  {
    name: "Image Watermark Tool",
    slug: "image/watermark",
    description: "Tambahkan watermark berupa teks atau logo ke dalam gambar.",
    icon: <Droplet className="w-6 h-6 text-blue-500" />,
    category: "Image Tools",
  },
  {
    name: "Conversion Tools",
    slug: "calculator/conversion-tools",
    description: "Konversi IP ke biner, CIDR ke subnet mask, dan sebaliknya.",
    icon: <Code2 className="w-6 h-6 text-green-500" />,
    category: "Network Tools",
  },
  {
    name: "IP Subnetting Calculator",
    slug: "calculator/ip-subnetting",
    description:
      "Hitung subnet, IP range, broadcast, dan jumlah host dari CIDR.",
    icon: <Divide className="w-6 h-6 text-purple-500" />,
    category: "Network Tools",
  },
  {
    name: "VLSM Calculator",
    slug: "calculator/vlsm-calculator",
    description: "Alat perhitungan subnet dengan panjang variabel (VLSM).",
    icon: <ListOrdered className="w-6 h-6 text-orange-500" />,
    category: "Network Tools",
  },
];
