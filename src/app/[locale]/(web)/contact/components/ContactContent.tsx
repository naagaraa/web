"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    need: "",
    message: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Jalankan reCAPTCHA v3
      const token = await (window as any).grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit" }
      );

      // Payload form + token
      const payload = {
        ...formData,
        company: formData.company || "N/A",
        token,
      };

      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Form berhasil dikirim!");
        setFormData({
          name: "",
          email: "",
          company: "",
          industry: "",
          need: "",
          message: "",
          budget: "",
        });
      } else {
        console.error(result);
        toast.error("Gagal mengirim form, coba lagi.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengirim form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left column: Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Web Development & IT Support
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Solusi praktis untuk startup, tim kecil, maupun perusahaan yang
            membutuhkan sistem handal tanpa ribet.
          </p>

          <div className="space-y-6">
            <FeatureItem
              title="Alat Internal Custom"
              description="Bangun sistem untuk inventaris, laporan, atau workflow sesuai kebutuhan tim."
            />
            <FeatureItem
              title="Dukungan IT Jarak Jauh"
              description="Setup, troubleshooting, dan konfigurasi server dilakukan dengan cepat dari jarak jauh."
            />
            <FeatureItem
              title="Pemeliharaan Berkala"
              description="Pastikan sistem berjalan lancar dengan pembaruan, perbaikan bug, dan pengecekan rutin."
            />
          </div>
        </div>

        {/* Right column: Form */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-md transition hover:shadow-lg transform-gpu hover:-translate-y-1 hover:scale-[1.02]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Nama lengkap"
              value={formData.name}
              onChange={(e: any) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e: any) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              placeholder="Nama perusahaan (opsional)"
              value={formData.company}
              onChange={(e: any) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
            <Select
              value={formData.industry}
              onChange={(e: any) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              options={[
                "Startup",
                "UKM",
                "Enterprise",
                "NGO / Komunitas",
                "Freelancer",
                "Lainnya",
              ]}
              placeholder="Jenis industri"
              required
            />
            <Select
              value={formData.need}
              onChange={(e: any) =>
                setFormData({ ...formData, need: e.target.value })
              }
              options={[
                "Web Development",
                "Dukungan IT",
                "Keduanya",
                "Lainnya",
              ]}
              placeholder="Kebutuhan"
              required
            />
            <TextArea
              value={formData.message}
              onChange={(e: any) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Ceritakan sedikit tentang proyek Anda..."
              required
            />
            <Select
              value={formData.budget}
              onChange={(e: any) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              options={["< Rp5 juta", "Rp5–20 juta", "> Rp20 juta"]}
              placeholder="Estimasi anggaran (opsional)"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// === Reusable Components ===

function Input({ type = "text", ...props }) {
  return (
    <input
      type={type}
      {...props}
      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
    />
  );
}

function Select({ value, onChange, options, placeholder, required }: any) {
  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
    >
      <option value="">{placeholder}</option>
      {options.map((opt: string, i: number) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function TextArea({ value, onChange, placeholder }: any) {
  return (
    <textarea
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
    />
  );
}

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
