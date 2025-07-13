"use client";

import { useState } from "react";
import Heading from "@/src/components/ui/Heading";
import Footer from "@/src/components/layout/Footer";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function DocsPage() {
  return (
    <>
      <Heading name="Docs" title="Dokumentasi Alat Produktivitas" />
      <DocsSection />
      <Footer />
    </>
  );
}

function DocsSection() {
  const sections = [
    {
      title: "🧠 Mental & Kesehatan",
      content: `
### **Blood Glucose**
Hitung dan pantau kadar gula darah harian Anda.

### **BMI**
Menghitung Body Mass Index berdasarkan tinggi dan berat badan.

### **BMR**
Mengukur kebutuhan kalori harian Anda dalam keadaan istirahat.

### **Calorie**
Menghitung konsumsi dan kebutuhan kalori harian.

### **Macronutrient**
Tentukan distribusi protein, karbohidrat, dan lemak.

### **Pregnancy**
Perkiraan tanggal kelahiran dan status kehamilan.

### **Sleep Time**
Rencanakan waktu tidur yang optimal untuk produktivitas.

### **Vitamins**
Cek kebutuhan vitamin harian berdasarkan usia dan gender.

### **Water**
Rekomendasi jumlah air minum harian.
      `,
    },
    {
      title: "💬 Kesehatan Mental",
      content: `
### **Anxiety**
Alat bantu evaluasi dan manajemen kecemasan.

### **Depression**
Skrining awal dan informasi seputar depresi.

### **Burnout Checker**
Tes untuk mengukur tingkat burnout emosional.
      `,
    },
    {
      title: "📄 Alat Dokumen",
      content: `
### **PDF Tools**
Gabung, kompres, atau pisahkan file PDF Anda.

### **Text Tools**
Alat bantu analisis, konversi, atau edit teks.
      `,
    },
    {
      title: "🧰 Tools Developer",
      content: `
### **JWT Decoder**
Dekode dan periksa struktur token JWT dengan mudah.

### **Base64 Encoder/Decoder**
Encode dan decode teks ke atau dari format Base64.

### **JSON Formatter**
Format dan perindah struktur JSON dengan validasi otomatis.
      `,
    },
    {
      title: "🖼️ Image Tools",
      content: `
### **Image Compressor**
Kompres gambar tanpa kehilangan kualitas signifikan.

### **Image Converter**
Ubah format gambar ke JPG, PNG, WebP, dll.

### **Image Cropper**
Potong gambar dengan aspek rasio bebas atau tetap.

### **Image Watermark**
Tambahkan watermark teks atau logo ke gambar.
      `,
    },
    {
      title: "🔧 Network & Utilitas",
      content: `
### **QR Code Generator**
Buat dan unduh QR Code dari teks atau tautan.

### **Conversion Tools**
Konversi IP ke biner, CIDR ke subnet mask, dan sebaliknya.
      `,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-10 text-center"
        >
          Panduan & Fitur Alat
        </motion.h2>

        <div className="space-y-4">
          {sections.map((sec, i) => (
            <SaaSAccordion key={i} title={sec.title} content={sec.content} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Accordion dengan gaya SaaS (tanpa Radix)
function SaaSAccordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 text-left text-base font-medium transition"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`px-5 py-4 text-sm bg-white transition-all duration-300 overflow-hidden ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
