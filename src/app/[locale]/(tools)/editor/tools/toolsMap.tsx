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
  Puzzle,
  AlarmClock,
  Hourglass,
  TimerReset,
  House,
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
    id: "documents",
    label: "Documents",
    icon: <File className={`w-5 h-5 ${ICON_COLOR}`} />,
    tools: [
      {
        name: "PDF Tools",
        slug: "apps/documents/pdf-tools",
        description: "Gabung, kompres, atau pisahkan file PDF Anda.",
        icon: <FileInput className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
      {
        name: "Text Tools",
        slug: "apps/documents/text-tools",
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
        name: "Image Watermark Tool",
        slug: "apps/image/watermark",
        description: "Tambahkan watermark teks atau logo ke gambar.",
        icon: <Droplet className={`w-5 h-5 ${ICON_COLOR}`} />,
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
        name: "QR Code Generator",
        slug: "apps/text/qrcode",
        description: "Buat QR Code dari teks atau tautan.",
        icon: <QrCode className={`w-5 h-5 ${ICON_COLOR}`} />,
      },
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
];
