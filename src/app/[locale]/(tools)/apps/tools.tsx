/* eslint-disable jsx-a11y/alt-text */
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

import { ReactNode } from "react";

export interface ToolInterface {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: ReactNode;
  category: string;
  isNew?: boolean;
}

export const tools: ToolInterface[] = [
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
    name: "Anxiety Checker",
    slug: "mental-health/anxiety",
    description: "Tes singkat untuk mengenali tingkat kecemasan Anda.",
    icon: <Brain className="w-6 h-6 text-fuchsia-600" />,
    category: "Mental Health",
  },
  {
    id: 11,
    name: "Depression Screening",
    slug: "mental-health/depression",
    description: "Alat skrining awal untuk mengenali gejala depresi.",
    icon: <Smile className="w-6 h-6 text-sky-500" />,
    category: "Mental Health",
  },
  {
    id: 12,
    name: "Self-Esteem Scale",
    slug: "mental-health/self-esteem-scale",
    description: "Ukur tingkat kepercayaan diri Anda secara objektif.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    category: "Mental Health",
  },
  {
    id: 13,
    name: "Stress Level Test",
    slug: "mental-health/stress-level",
    description: "Kenali tingkat stres harian Anda dengan cepat.",
    icon: <Activity className="w-6 h-6 text-orange-500" />,
    category: "Mental Health",
  },
  {
    id: 14,
    name: "Suicidal Ideation Check",
    slug: "mental-health/suicidal-ideation",
    description: "Skrining awal untuk mendeteksi ide bunuh diri.",
    icon: <HeartPulse className="w-6 h-6 text-red-500" />,
    category: "Mental Health",
  },
  {
    id: 15,
    name: "PTSD Screening",
    slug: "mental-health/ptsd",
    description: "Alat bantu awal untuk mengidentifikasi gejala PTSD.",
    icon: <Flame className="w-6 h-6 text-purple-600" />,
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
    slug: "text-tools",
    description: "Alat bantu analisis, konversi, atau edit teks.",
    icon: <FileText className="w-6 h-6 text-gray-700" />,
    category: "Documents",
  },
  {
    id: 14,
    name: " Compressor",
    slug: "image/compressor",
    description:
      "Kompres gambar untuk ukuran lebih kecil tanpa kehilangan kualitas signifikan.",
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
    name: " Converter",
    slug: "image/converter",
    description:
      "Ubah format gambar ke JPG, PNG, WebP, dan lainnya secara instan.",
    icon: <Image className="w-6 h-6 text-yellow-500" />,
    category: "Image Tools",
  },
  {
    id: 21,
    name: " Cropper",
    slug: "image/cropper",
    description: "Crop gambar dengan aspek rasio tertentu atau bebas.",
    icon: <Crop className="w-6 h-6 text-green-500" />,
    category: "Image Tools",
  },
  {
    id: 22,
    name: " Watermark Tool",
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
