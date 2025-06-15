"use client";

import "react-loading-skeleton/dist/skeleton.css";
import "plyr-react/plyr.css";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { useState } from "react";
import heroImage from "@/assets/hero.png";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <ToolsProductivity />
      <Services />
    </main>
  );
}

function Hero() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Kolom Kiri (Gambar Ilustrasi) */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={heroImage}
            alt="Ilustrasi Tim Bekerja"
            width={250}
            height={125}
            className="w-3/4 mx-auto object-cover"
          />
        </motion.div>

        {/* Kolom Kanan (Judul dan Deskripsi) */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Tagline */}
          <motion.p
            className="text-sm font-semibold text-orange-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Simplify Teamwork, Boost Productivity
          </motion.p>

          {/* Judul Besar */}
          <motion.h1
            className="text-5xl font-bold leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span>Work</span>
            <br />
            <span>Smarter,</span>
            <br />
            <span>Together</span>
          </motion.h1>

          {/* Subjudul Deskripsi */}
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Transform how your team works. Get everything you need to
            collaborate, organize, and manage tasks efficiently, all within one
            intuitive productivity suite.
          </motion.p>

          {/* Tombol Aksi */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link
              href="#tools"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("tools")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 inline-flex items-center gap-2"
            >
              Get Started for Free
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  d="M9.75 4.5l-7.5 7.5 7.5 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/learn-more"
              className="border border-gray-300 hover:border-blue-500 text-gray-700 px-6 py-3 rounded-lg transition duration-300"
            >
              Learn more
            </Link>
          </motion.div>
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
    icon: "🚀",
  },
  {
    title: "Bug Fixing & Debugging",
    description:
      "Fix issues in existing websites or apps—both front-end and back-end. Remote service with quick turnaround.",
    icon: "🔧",
  },
  {
    title: "IT Support & Maintenance",
    description:
      "Remote support for system setup, server configuration, troubleshooting, and regular maintenance.",
    icon: "🛠️",
  },
  {
    title: "System Installation & Configuration",
    description:
      "Remote setup or reinstallation of Linux-based systems for stable and optimized performance.",
    icon: "⚙️",
  },
  {
    title: "Remote Technical Support",
    description:
      "Help resolve software issues, perform checks, or assist users via remote sessions.",
    icon: "📡",
  },
];

function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Layanan"
          description="Jasa yang saya tawarkan sebagai Software Engineer"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description: string;
  link?: string;
}

export const SectionHeader = ({
  title,
  description,
  link = "#",
}: SectionHeaderProps) => {
  return (
    <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <Link
        href={link}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Lihat Semua →
      </Link>
    </div>
  );
};

interface Tool {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string; // Tambahkan properti kategori
  isNew?: boolean; // Optional: to mark as "New"
}

// Data Mockup
const tools: Tool[] = [
  {
    id: 1,
    name: "Gabungkan PDF",
    description:
      "Gabungkan PDF dengan urutan yang Anda inginkan agar penggabungan PDF termudah.",
    icon: "https://picsum.photos/id/10/50",
    category: "PDF",
  },
  {
    id: 2,
    name: "Pisahkan PDF",
    description:
      "Pisahkan satu halaman atau semuanya agar mudah dikonversi menjadi file PDF terpisah.",
    icon: "https://picsum.photos/id/20/50",
    category: "PDF",
  },
  {
    id: 3,
    name: "Kompres PDF",
    description:
      "Kurangi ukuran file dengan tetap mengoptimalkan kualitas PDF maksimal.",
    icon: "https://picsum.photos/id/30/50",
    category: "PDF",
  },
  {
    id: 4,
    name: "Edit Gambar",
    description:
      "Edit gambar dengan alat pemotongan, penyesuaian warna, dan filter.",
    icon: "https://picsum.photos/id/40/50",
    category: "Images",
  },
  {
    id: 5,
    name: "Konversi JPG ke PNG",
    description:
      "Konversi file gambar JPG menjadi format PNG dengan kualitas tinggi.",
    icon: "https://picsum.photos/id/50/50",
    category: "Images",
  },
  {
    id: 6,
    name: "Zoom Meeting",
    description: "Alat konferensi video untuk rapat online.",
    icon: "https://picsum.photos/id/60/50",
    category: "Collaboration",
  },
  {
    id: 7,
    name: "Trello Board",
    description: "Manajemen proyek dengan board kolaboratif.",
    icon: "https://picsum.photos/id/70/50",
    category: "Collaboration",
  },
];

// Mendapatkan daftar kategori unik dari data tools
const categories = Array.from(new Set(tools.map((tool) => tool.category)));

function ToolsProductivity() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter tools berdasarkan kategori yang dipilih
  const filteredTools = selectedCategory
    ? tools.filter((tool) => tool.category === selectedCategory)
    : tools;

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Productivity Tools</h2>
        <p className="mb-8">
          Daftar fitur produktivitas yang membantu meningkatkan efisiensi kerja.
        </p>

        {/* Kategori */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              !selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Tools */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 space-y-2">
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={40}
                  height={40}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <h3 className="text-lg font-semibold">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
                {tool.isNew && (
                  <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                    Baru!
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
