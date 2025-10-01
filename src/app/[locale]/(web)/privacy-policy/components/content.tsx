"use client";

import Footer from "@/src/components/layout/Footer";
import { useState } from "react";

const revisions = [
  {
    year: 2025,
    date: "2025",
    content: (
      <>
        <p>
          Kami menghargai privasi Anda. Semua data diproses sepenuhnya di
          browser Anda dan tidak disimpan atau diakses oleh server kami.
        </p>
        <h2 className="text-xl font-semibold mt-6">1. Pengumpulan Data</h2>
        <p>
          Tidak ada data pengguna yang dikumpulkan atau disimpan. Semua
          perhitungan dan proses terjadi secara lokal di perangkat Anda.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Penggunaan Data</h2>
        <p>
          Karena data tidak dikirim ke server, kami tidak menggunakan data untuk
          analitik atau tujuan lainnya.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Keamanan</h2>
        <p>
          Data Anda aman karena tidak pernah meninggalkan perangkat Anda.
          Seluruh pengolahan terjadi di sisi client.
        </p>
      </>
    ),
  },
  {
    year: 2024,
    date: "2024",
    content: (
      <>
        <p>
          Kami menghargai privasi Anda. Semua data diproses sepenuhnya di
          browser Anda dan tidak disimpan atau diakses oleh server kami.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Pengumpulan Data</h2>
        <p>
          Tidak ada data pengguna yang dikumpulkan atau disimpan. Semua
          perhitungan dan proses terjadi secara lokal di perangkat Anda.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Penggunaan Data</h2>
        <p>
          Karena data tidak dikirim ke server, kami tidak menggunakan data untuk
          analitik atau tujuan lainnya.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyContent() {
  const [selectedRevision, setSelectedRevision] = useState(revisions[0]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
          <h2 className="text-lg font-semibold mb-4">Revisions</h2>
          <ul className="space-y-2">
            {revisions.map((rev) => (
              <li key={rev.year}>
                <button
                  onClick={() => setSelectedRevision(rev)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedRevision.year === rev.year
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {rev.date}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-600">
            Last updated: {selectedRevision.date}
          </p>

          {/* Render content sesuai revisi */}
          {selectedRevision.content}
        </main>
      </div>

      <Footer />
    </>
  );
}
