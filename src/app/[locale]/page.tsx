"use client";

import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import heroImage from "@/assets/hero.png";
import Footer from "@/src/components/ui/footer";

import {
  Code,
  Wrench,
  LifeBuoy,
  Settings,
  MonitorCheck,
  Flame,
  ShieldCheck,
  FileCode,
  QrCode,
  Crop,
  Code2,
  Divide,
  ListOrdered,
} from "lucide-react";

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
} from "lucide-react";
import ProjectLifecycleSection from "./ProjectLifecycleSection";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <ProductivityTools />
      <Services />
      <ProjectLifecycleSection />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Kolom Kiri - Teks */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Tools & Services to Empower Your Team
          </motion.p>

          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Everything You Need to Work Smarter — in One Place
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Access powerful tools to manage your team's workflow, and expert
            services to help you scale. Whether you're organizing tasks or
            improving collaboration — we’ve got you covered.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link
              href="#tools"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("tools")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Explore Our Tools
            </Link>

            <Link
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition"
            >
              Discover Our Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Kolom Kanan - Gambar */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={heroImage}
            alt="Team Collaboration Illustration"
            width={500}
            height={300}
            className="w-full max-w-md mx-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Laravel Web Development",
    description:
      "Development and maintenance of database-driven web applications using Laravel. Work is fully remote.",
    icon: <Code className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Bug Fixing & Debugging",
    description:
      "Fix issues in existing websites or apps—both front-end and back-end. Remote service with quick turnaround.",
    icon: <Wrench className="w-6 h-6 text-red-500" />,
  },
  {
    title: "IT Support & Maintenance",
    description:
      "Remote support for system setup, server configuration, troubleshooting, and regular maintenance.",
    icon: <LifeBuoy className="w-6 h-6 text-green-600" />,
  },
  {
    title: "System Installation & Configuration",
    description:
      "Remote setup or reinstallation of Linux-based systems for stable and optimized performance.",
    icon: <Settings className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Remote Technical Support",
    description:
      "Help resolve software issues, perform checks, or assist users via remote sessions.",
    icon: <MonitorCheck className="w-6 h-6 text-purple-600" />,
  },
];

function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Layanan</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Jasa yang saya tawarkan sebagai Software Engineer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    icon: <ImageIcon className="w-6 h-6 text-yellow-500" />,
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
    <section id="tools" className="bg-white py-20">
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
