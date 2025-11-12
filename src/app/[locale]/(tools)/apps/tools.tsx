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
  RotateCcw,
  Palette,
  Type,
  File,
} from "lucide-react";

import { ReactNode } from "react";

export interface ToolInterface {
  name: string;
  slug: string;
  description: string;
  icon: ReactNode;
  category: string;
  isNew?: boolean;
}

export const tools: ToolInterface[] = [
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
    name: "Anxiety Checker",
    slug: "mental-health/anxiety",
    description: "Tes singkat untuk mengenali tingkat kecemasan Anda.",
    icon: <Brain className="w-6 h-6 text-fuchsia-600" />,
    category: "Mental Health",
  },
  {
    name: "Depression Screening",
    slug: "mental-health/depression",
    description: "Alat skrining awal untuk mengenali gejala depresi.",
    icon: <Smile className="w-6 h-6 text-sky-500" />,
    category: "Mental Health",
  },
  {
    name: "Self-Esteem Scale",
    slug: "mental-health/self-esteem-scale",
    description: "Ukur tingkat kepercayaan diri Anda secara objektif.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    category: "Mental Health",
  },
  {
    name: "Stress Level Test",
    slug: "mental-health/stress-level",
    description: "Kenali tingkat stres harian Anda dengan cepat.",
    icon: <Activity className="w-6 h-6 text-orange-500" />,
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
    name: "Suicidal Ideation Check",
    slug: "mental-health/suicidal-ideation",
    description: "Skrining awal untuk mendeteksi ide bunuh diri.",
    icon: <HeartPulse className="w-6 h-6 text-red-500" />,
    category: "Mental Health",
  },
  {
    name: "PTSD Screening",
    slug: "mental-health/ptsd",
    description: "Alat bantu awal untuk mengidentifikasi gejala PTSD.",
    icon: <Flame className="w-6 h-6 text-purple-600" />,
    category: "Mental Health",
  },
  {
    name: " Compressor",
    slug: "image/compressor",
    description:
      "Kompres gambar untuk ukuran lebih kecil tanpa kehilangan kualitas signifikan.",
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
    name: "Image To PDF",
    slug: "pdf/image-to-pdf",
    description: "Konversi berbagai format gambar menjadi file PDF.",
    icon: <File className={`w-5 h-5  text-gray-500`} />,
    category: "PDF Tools",
  },
  {
    name: "PDF Merger",
    slug: "pdf/merger",
    description: "Gabung beberapa file PDF menjadi satu dokumen.",
    icon: <File className={`w-5 h-5  text-gray-500`} />,
    category: "PDF Tools",
  },
  {
    name: "PDF Splitter",
    slug: "pdf/splitter",
    description: "Pisah file PDF berdasarkan halaman atau rentang halaman.",
    icon: <File className={`w-5 h-5  text-gray-500`} />,
    category: "PDF Tools",
  },
  {
    name: "PDF Rotator",
    slug: "pdf/rotator",
    description: "Putar halaman PDF sesuai kebutuhan Anda.",
    icon: <File className={`w-5 h-5  text-gray-500`} />,
    category: "PDF Tools",
  },
  {
    name: "PDF Compressor",
    slug: "pdf/compressor",
    description:
      "Kompres file PDF untuk mengurangi ukuran tanpa kehilangan kualitas.",
    icon: <File className={`w-5 h-5 text-gray-500`} />,
    category: "PDF Tools",
  },
  {
    name: "QR Code Generator",
    slug: "text/qrcode-generator",
    description:
      "Buat dan unduh QR Code dari teks atau tautan hanya dengan sekali klik.",
    icon: <QrCode className="w-6 h-6 text-pink-500" />,
    category: "Utilities",
  },
  {
    name: "QR Code Reader",
    slug: "text/qrcode-reader",
    description:
      "Pindai dan baca konten dari QR Code dengan mudah menggunakan kamera atau unggahan gambar.",
    icon: <QrCode className="w-6 h-6 text-pink-500" />,
    category: "Utilities",
  },
  {
    name: "Konverter Gambar",
    slug: "image/converter",
    description:
      "Ubah format gambar ke JPG, PNG, WebP, dan lainnya secara instan.",
    icon: <Image className="w-6 h-6 text-yellow-500" />,
    category: "Image Tools",
  },
  {
    name: "Crop Gambar",
    slug: "image/cropper",
    description:
      "Potong gambar dengan rasio aspek tetap atau bebas sesuai kebutuhan.",
    icon: <Crop className="w-6 h-6 text-green-500" />,
    category: "Image Tools",
  },
  {
    name: "Watermark Gambar",
    slug: "image/watermark",
    description: "Tambahkan teks atau logo sebagai watermark ke dalam gambar.",
    icon: <Type className="w-6 h-6 text-blue-500" />, // ✅ lebih tepat daripada Droplet
    category: "Image Tools",
  },
  {
    name: "Filter Gambar",
    slug: "image/filter",
    description:
      "Terapkan efek visual seperti hitam-putih, sepia, inversi, atau kecerahan.",
    icon: <Palette className="w-6 h-6 text-purple-500" />, // ✅ mewakili warna & filter
    category: "Image Tools",
  },
  {
    name: "Putar Gambar",
    slug: "image/rotate",
    description:
      "Putar gambar 90°, 180°, atau sesuaikan sudut rotasi secara manual.",
    icon: <RotateCcw className="w-6 h-6 text-orange-500" />, // ✅ ikon rotasi
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
