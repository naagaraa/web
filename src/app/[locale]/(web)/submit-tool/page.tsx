"use client";

import { useState } from "react";
import Heading from "@/src/components/ui/Heading";
import Footer from "@/src/components/layout/Footer";

export default function SubmitToolPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    customCategory: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category =
      form.category === "custom" ? form.customCategory.trim() : form.category;

    if (!category) {
      setMessage("❌ Kategori belum diisi.");
      return;
    }

    // TODO: Ganti console.log dengan submit ke backend
    console.log({
      name: form.name,
      category,
      description: form.description,
    });

    setMessage("✅ Tool kamu berhasil disubmit!");
    setForm({ name: "", category: "", customCategory: "", description: "" });
  };

  return (
    <>
      <Heading name="Submit a Tool" title="Kirim Alat Produktivitas Kamu" />
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Formulir Request Tools</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium">Nama Tool</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Kategori</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md mt-1"
              >
                <option value="">-- Pilih Kategori --</option>
                <option>Calculator</option>
                <option>Mental Health</option>
                <option>PDF Tools</option>
                <option>Image Tools</option>
                <option>Dev Tools</option>
                <option>Utilities</option>
                <option>Network</option>
                <option value="custom">Lainnya (isi manual)</option>
              </select>
            </div>

            {form.category === "custom" && (
              <div>
                <label className="block text-sm font-medium">
                  Kategori Baru
                </label>
                <input
                  name="customCategory"
                  value={form.customCategory}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: AI Tools"
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">
                Deskripsi Singkat
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border px-3 py-2 rounded-md mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit Tool
            </button>

            {message && <p className="text-green-600 mt-2">{message}</p>}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
