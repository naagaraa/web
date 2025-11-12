/* eslint-disable jsx-a11y/alt-text */
import {
  Droplet,
  Activity,
  HeartPulse,
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
  Puzzle,
  AlarmClock,
  Hourglass,
  TimerReset,
  House,
  Type,
  RotateCcw,
  Palette,
  DockIcon,
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
  slug?: string;
  tools?: ToolItem[];
};

const ICON_COLOR = "text-indigo-500"; // Modern single color

export const categories: Category[] = [
  {
    id: "Home",
    label: "Home",
    icon: <House className={`w-5 h-5 ${ICON_COLOR}`} />,
    slug: "apps",
  },
  {
    id: "calculator",
    label: "Calculator",
    icon: <Calculator className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "Blood Glucose",
        slug: "apps/calculator/blood-glucose",
        description: "Hitung dan pantau kadar gula darah harian Anda.",
        icon: <Droplet className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Body Mass Index",
        slug: "apps/calculator/bmi",
        description:
          "Menghitung Body Mass Index berdasarkan tinggi dan berat badan.",
        icon: <Activity className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Basal Metabolic Rate",
        slug: "apps/calculator/bmr",
        description:
          "Mengukur kebutuhan kalori harian Anda dalam keadaan istirahat.",
        icon: <HeartPulse className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Macronutrient",
        slug: "apps/calculator/macronutrient",
        description: "Tentukan distribusi protein, karbohidrat, dan lemak.",
        icon: <PieChart className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Pregnancy",
        slug: "apps/calculator/pregnancy",
        description: "Perkiraan tanggal kelahiran dan status kehamilan.",
        icon: <Baby className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Sleep Time",
        slug: "apps/calculator/sleep-time",
        description: "Rencanakan waktu tidur yang optimal untuk produktivitas.",
        icon: <BedDouble className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Water Intake",
        slug: "apps/calculator/water",
        description:
          "Hitung kebutuhan asupan air harian berdasarkan berat badan.",
        icon: <Droplet className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Vitamins",
        slug: "apps/calculator/vitamins",
        description:
          "Cek kebutuhan vitamin harian berdasarkan usia dan gender.",
        icon: <Apple className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Conversion Tools",
        slug: "apps/calculator/conversion-tools",
        description:
          "Konversi IP ke biner, CIDR ke subnet mask, dan sebaliknya.",
        icon: <Code2 className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "IP Subnetting Calculator",
        slug: "apps/calculator/ip-subnetting",
        description:
          "Hitung subnet, IP range, broadcast, dan jumlah host dari CIDR.",
        icon: <Divide className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "VLSM Calculator",
        slug: "apps/calculator/vlsm-calculator",
        description: "Alat perhitungan subnet dengan panjang variabel (VLSM).",
        icon: <ListOrdered className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
  {
    id: "mental-health",
    label: "Mental",
    icon: <HeartPulse className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "Anxiety",
        slug: "apps/mental-health/anxiety",
        description: "Alat bantu evaluasi dan manajemen kecemasan.",
        icon: <Brain className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Depression",
        slug: "apps/mental-health/depression",
        description: "Skrining awal dan informasi seputar depresi.",
        icon: <Smile className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Burnout Checker",
        slug: "apps/mental-health/burnout-checker",
        description: "Tes untuk mengukur tingkat burnout emosional.",
        icon: <Flame className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
  {
    id: "Seo-Tools",
    label: "Seo Tools",
    icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "Meta Tag Generator",
        slug: "apps/seo-tools/meta-tag-generator",
        description: "Gabung, kompres, atau pisahkan file PDF Anda.",
        icon: <FileInput className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Robots.txt Generator",
        slug: "apps/seo-tools/robots-txt-generator",
        description: "Alat bantu analisis, konversi, atau edit teks.",
        icon: <FileText className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Sitemap Generator",
        slug: "apps/seo-tools/sitemap-generator",
        description: "Alat bantu analisis, konversi, atau edit teks.",
        icon: <FileText className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
  {
    id: "image-tools",
    label: "Image Tools",
    icon: <ImageIcon className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "Image Compressor",
        slug: "apps/image/compressor",
        description: "Kompres gambar tanpa kehilangan kualitas signifikan.",
        icon: <ImageIcon className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Image Converter",
        slug: "apps/image/converter",
        description: "Ubah format gambar ke JPG, PNG, WebP, dll.",
        icon: <Image className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Image Cropper",
        slug: "apps/image/cropper",
        description: "Crop gambar dengan aspek rasio tertentu atau bebas.",
        icon: <Crop className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Watermark Gambar",
        slug: "apps/image/watermark",
        description: "Tambahkan teks atau logo sebagai watermark ke gambar.",
        icon: <Type className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Putar Gambar",
        slug: "apps/image/rotate",
        description: "Putar gambar 90°, 180°, atau sesuaikan sudutnya.",
        icon: <RotateCcw className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Filter Gambar",
        slug: "apps/image/filter",
        description:
          "Terapkan efek visual seperti hitam-putih, sepia, atau inversi.",
        icon: <Palette className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
  {
    id: "developer-tools",
    label: "Developer",
    icon: <Code className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "JWT Decoder",
        slug: "apps/text/jwt-decoder",
        description: "Dekode dan periksa struktur token JWT dengan mudah.",
        icon: <ShieldCheck className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Base64 Decoder Encoder",
        slug: "apps/text/base64-decoder-encoder",
        description: "Encode dan decode teks ke atau dari Base64.",
        icon: <FileCode className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "JSON Formatter",
        slug: "apps/text/json-formatter",
        description: "Format dan validasi struktur JSON.",
        icon: <Code className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
  {
    id: "utilities",
    label: "Utilities",
    icon: <Puzzle className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "Alarm Clock",
        slug: "apps/daily/alarm-online",
        description: "Alarm clock untuk mengatur pengingat waktu.",
        icon: <AlarmClock className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Countdown Timer",
        slug: "apps/daily/countdown-timer",
        description: "Countdown timer untuk mengatur waktu.",
        icon: <Hourglass className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Pomodoro Timer",
        slug: "apps/daily/pomodoro-timer",
        description: "Pomodoro timer untuk meningkatkan produktivitas.",
        icon: <TimerReset className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
  {
    id: "QR Code",
    label: "QR Code",
    icon: <QrCode className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "QR Generator",
        slug: "apps/text/qrcode-generator",
        description: "Buat QR Code dari teks atau tautan.",
        icon: <QrCode className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "QR Reader",
        slug: "apps/text/qrcode-reader",
        description: "Pindai dan baca konten dari QR Code dengan mudah.",
        icon: <QrCode className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
  {
    id: "PDF",
    label: "PDF",
    icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "Image To PDF",
        slug: "apps/pdf/image-to-pdf",
        description: "Konversi berbagai format gambar menjadi file PDF.",
        icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "PDF Merger",
        slug: "apps/pdf/merger",
        description: "Gabung beberapa file PDF menjadi satu dokumen.",
        icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "PDF Splitter",
        slug: "apps/pdf/splitter",
        description: "Pisah file PDF berdasarkan halaman atau rentang halaman.",
        icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "PDF Rotator",
        slug: "apps/pdf/rotator",
        description: "Putar halaman PDF sesuai kebutuhan Anda.",
        icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "PDF Compressor",
        slug: "apps/pdf/compressor",
        description:
          "Kompres file PDF untuk mengurangi ukuran tanpa kehilangan kualitas.",
        icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
    ],
  },
];
