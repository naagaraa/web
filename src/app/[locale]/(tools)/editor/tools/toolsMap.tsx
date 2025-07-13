/* eslint-disable jsx-a11y/alt-text */
import {
  Droplet,
  Activity,
  HeartPulse,
  Utensils,
  PieChart,
  Baby,
  BedDouble,
  Calculator,
  Brain,
  Smile,
  FileInput,
  FileText,
  ImageIcon,
  Flame,
  ShieldCheck,
  FileCode,
  Code,
  QrCode,
  Image,
  Crop,
  Code2,
  Divide,
  ListOrdered,
  Apple,
  File,
  Settings,
  Tags,
  Bot,
  ListTree,
  SearchCheck,
  UtilityPole,
  Puzzle,
  AlarmClock,
  Hourglass,
  TimerReset,
} from "lucide-react";

export type ToolItem = {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
};

export type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  tools: ToolItem[];
};

export const categories: Category[] = [
  {
    id: "calculator",
    label: "Calculator",
    icon: <Calculator size={20} className="w-6 h-6 text-blue-600" />,
    tools: [
      {
        name: "Blood Glucose",
        slug: "apps/calculator/blood-glucose",
        description: "Hitung dan pantau kadar gula darah harian Anda.",
        icon: <Droplet size={20} className="w-6 h-6 text-blue-600" />,
      },
      {
        name: "BMI",
        slug: "apps/calculator/bmi",
        description:
          "Menghitung Body Mass Index berdasarkan tinggi dan berat badan.",
        icon: <Activity size={20} className="w-6 h-6 text-green-600" />,
      },
      {
        name: "BMR",
        slug: "apps/calculator/bmr",
        description:
          "Mengukur kebutuhan kalori harian Anda dalam keadaan istirahat.",
        icon: <HeartPulse size={20} className="w-6 h-6 text-pink-500" />,
      },
      {
        name: "Calorie",
        slug: "apps/calculator/calorie",
        description: "Menghitung konsumsi dan kebutuhan kalori harian.",
        icon: <Utensils size={20} className="w-6 h-6 text-yellow-600" />,
      },
      {
        name: "Macronutrient",
        slug: "apps/calculator/macronutrient",
        description: "Tentukan distribusi protein, karbohidrat, dan lemak.",
        icon: <PieChart size={20} className="w-6 h-6 text-purple-600" />,
      },
      {
        name: "Pregnancy",
        slug: "apps/calculator/pregnancy",
        description: "Perkiraan tanggal kelahiran dan status kehamilan.",
        icon: <Baby size={20} className="w-6 h-6 text-rose-500" />,
      },
      {
        name: "Sleep Time",
        slug: "apps/calculator/sleep-time",
        description: "Rencanakan waktu tidur yang optimal untuk produktivitas.",
        icon: <BedDouble size={20} className="w-6 h-6 text-indigo-500" />,
      },
      {
        name: "Vitamins",
        slug: "apps/calculator/vitamins",
        description:
          "Cek kebutuhan vitamin harian berdasarkan usia dan gender.",
        icon: <Apple size={20} className="w-6 h-6 text-orange-500" />, // Ganti Calculator agar tidak duplikat
      },
      {
        name: "Conversion Tools",
        slug: "apps/calculator/conversion-tools",
        description:
          "Konversi IP ke biner, CIDR ke subnet mask, dan sebaliknya.",
        icon: <Code2 size={20} className="w-6 h-6 text-green-500" />,
      },
      {
        name: "IP Subnetting Calculator",
        slug: "apps/calculator/ip-subnetting",
        description:
          "Hitung subnet, IP range, broadcast, dan jumlah host dari CIDR.",
        icon: <Divide size={20} className="w-6 h-6 text-purple-500" />,
      },
      {
        name: "VLSM Calculator",
        slug: "apps/calculator/vlsm-calculator",
        description: "Alat perhitungan subnet dengan panjang variabel (VLSM).",
        icon: <ListOrdered size={20} className="w-6 h-6 text-orange-500" />,
      },
    ],
  },
  {
    id: "mental-health",
    label: "Mental",
    icon: <HeartPulse size={20} d="w-6 h-6 text-pink-500" />,
    tools: [
      {
        name: "Anxiety",
        slug: "apps/mental-health/anxiety",
        description: "Alat bantu evaluasi dan manajemen kecemasan.",
        icon: <Brain size={20} className="w-6 h-6 text-fuchsia-600" />,
      },
      {
        name: "Depression",
        slug: "apps/mental-health/depression",
        description: "Skrining awal dan informasi seputar depresi.",
        icon: <Smile size={20} className="w-6 h-6 text-sky-500" />,
      },
      {
        name: "Burnout Checker",
        slug: "apps/mental-health/burnout-checker",
        description: "Tes untuk mengukur tingkat burnout emosional.",
        icon: <Flame size={20} className="w-6 h-6 text-orange-500" />,
      },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    icon: <File size={20} className="w-6 h-6 text-gray-600" />, // Tambahkan icon
    tools: [
      {
        name: "PDF Tools",
        slug: "apps/documents/pdf-tools",
        description: "Gabung, kompres, atau pisahkan file PDF Anda.",
        icon: <FileInput size={20} className="w-6 h-6 text-gray-600" />,
      },
      {
        name: "Text Tools",
        slug: "apps/documents/text-tools",
        description: "Alat bantu analisis, konversi, atau edit teks.",
        icon: <FileText size={20} className="w-6 h-6 text-gray-700" />,
      },
    ],
  },
  {
    id: "image-tools",
    label: "Image Tools",
    icon: <ImageIcon size={20} className="w-6 h-6 text-pink-700" />,
    tools: [
      {
        name: "Image Compressor",
        slug: "apps/image/compressor",
        description: "Kompres gambar tanpa kehilangan kualitas signifikan.",
        icon: <ImageIcon size={20} className="w-6 h-6 text-pink-700" />,
      },
      {
        name: "Image Converter",
        slug: "apps/image/converter",
        description: "Ubah format gambar ke JPG, PNG, WebP, dll.",
        icon: <Image size={20} className="w-6 h-6 text-yellow-500" />,
      },
      {
        name: "Image Cropper",
        slug: "apps/image/cropper",
        description: "Crop gambar dengan aspek rasio tertentu atau bebas.",
        icon: <Crop size={20} className="w-6 h-6 text-green-500" />,
      },
      {
        name: "Image Watermark Tool",
        slug: "apps/image/watermark",
        description: "Tambahkan watermark teks atau logo ke gambar.",
        icon: <Droplet size={20} className="w-6 h-6 text-blue-500" />,
      },
    ],
  },
  {
    id: "developer-tools",
    label: "Developer",
    icon: <Code size={20} className="w-6 h-6 text-green-500" />,
    tools: [
      {
        name: "JWT Decoder",
        slug: "apps/text/jwt-decoder",
        description: "Dekode dan periksa struktur token JWT dengan mudah.",
        icon: <ShieldCheck size={20} className="w-6 h-6 text-purple-500" />,
      },
      {
        name: "Base64 Decoder Encoder",
        slug: "apps/text/base64-decoder-encoder",
        description: "Encode dan decode teks ke atau dari Base64.",
        icon: <FileCode size={20} className="w-6 h-6 text-indigo-500" />,
      },
      {
        name: "JSON Formatter",
        slug: "apps/text/json-formatter",
        description: "Format dan validasi struktur JSON.",
        icon: <Code size={20} className="w-6 h-6 text-green-500" />,
      },
      {
        name: "Hash Generator",
        slug: "apps/dev/hash-generator",
        description: "Generate berbagai jenis hash (MD5, SHA, BLAKE2, dll).",
        icon: <Code size={20} className="w-6 h-6 text-blue-500" />,
      },
      {
        name: "Regex Tester",
        slug: "apps/dev/regex",
        description: "Uji pola regex terhadap teks secara instan.",
        icon: <Code size={20} className="w-6 h-6 text-purple-500" />,
      },
    ],
  },
  {
    id: "SEO",
    label: "SEO",
    icon: <SearchCheck size={20} className="w-6 h-6 text-gray-500" />,
    tools: [
      {
        name: "Meta Tag Generator",
        slug: "apps/seo-tools/meta-tag-generator",
        description: "Buat dan pratinjau meta tag SEO dan Open Graph.",
        icon: <Tags size={20} className="w-6 h-6 text-pink-500" />, // ganti dari QrCode → Tags
      },
      {
        name: "Robots.txt Generator",
        slug: "apps/seo-tools/robots-txt-generator",
        description: "Buat file robots.txt untuk mengatur akses crawler.",
        icon: <Bot size={20} className="w-6 h-6 text-pink-500" />, // ganti dari QrCode → Bot
      },
      {
        name: "sitemap.xml Generator",
        slug: "apps/seo-tools/sitemap-generator",
        description: "Siapkan sitemap.xml untuk SEO yang lebih baik.",
        icon: <ListTree size={20} className="w-6 h-6 text-pink-500" />, // ganti dari QrCode → Sitemap
      },
    ],
  },

  {
    id: "utilities",
    label: "Utilities",
    icon: <Puzzle size={20} className="w-6 h-6 text-gray-500" />,
    tools: [
      {
        name: "QR Code Generator",
        slug: "apps/text/qrcode",
        description: "Buat QR Code dari teks atau tautan.",
        icon: <QrCode size={20} className="w-6 h-6 text-pink-500" />,
      },
      {
        name: "Alarm Clock",
        slug: "apps/daily/alarm-online",
        description: "Alam clock untuk mengatur pengingat waktu.",
        icon: <AlarmClock size={20} className="w-6 h-6 text-pink-500" />,
      },
      {
        name: "Countdown Timer",
        slug: "apps/daily/countdown-timer",
        description: "Countdown timer untuk mengatur waktu.",
        icon: <Hourglass size={20} className="w-6 h-6 text-pink-500" />,
      },
      {
        name: "Pomodoro Timer",
        slug: "apps/daily/pomodoro-timer",
        description: "Pomodoro timer untuk meningkatkan produktivitas.",
        icon: <TimerReset size={20} className="w-6 h-6 text-pink-500" />,
      },
    ],
  },
];
