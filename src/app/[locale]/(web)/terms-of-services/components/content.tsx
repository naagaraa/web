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
          Dengan menggunakan aplikasi ini, Anda menyetujui syarat dan ketentuan
          versi 2025. Semua data diproses sepenuhnya di browser Anda dan tidak
          disimpan di server.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Penggunaan Aplikasi</h2>
        <p>
          Aplikasi ini disediakan sebagaimana adanya. Pengguna bertanggung jawab
          penuh atas penggunaan dan hasil yang diperoleh.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Tidak Ada Jaminan</h2>
        <p>
          Kami tidak memberikan jaminan atas keakuratan, ketersediaan, atau
          keamanan aplikasi ini. Kami tidak bertanggung jawab atas kerugian
          akibat penggunaan alat ini.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Privasi dan Keamanan</h2>
        <p>
          Semua kalkulasi dan pengolahan data terjadi secara lokal di perangkat
          Anda. Tidak ada data yang disimpan di server.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Perubahan Ketentuan</h2>
        <p>
          Ketentuan ini dapat diperbarui sewaktu-waktu. Versi terbaru akan
          selalu tersedia di halaman ini. Lanjutkan penggunaan aplikasi berarti
          Anda menyetujui perubahan tersebut.
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
          Dengan menggunakan aplikasi ini, Anda menyetujui syarat dan ketentuan
          versi 2024. Semua data diproses di browser dan tidak disimpan di
          server.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Penggunaan Aplikasi</h2>
        <p>
          Aplikasi ini disediakan sebagaimana adanya. Pengguna bertanggung jawab
          penuh atas penggunaan dan hasil yang diperoleh.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Tidak Ada Jaminan</h2>
        <p>
          Kami tidak memberikan jaminan atas keakuratan, ketersediaan, atau
          keamanan aplikasi ini. Kami tidak bertanggung jawab atas kerugian
          akibat penggunaan alat ini.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Privasi dan Keamanan</h2>
        <p>
          Semua kalkulasi dan pengolahan data terjadi secara lokal di perangkat
          Anda. Tidak ada data yang disimpan di server.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Perubahan Ketentuan</h2>
        <p>
          Ketentuan ini dapat diperbarui sewaktu-waktu. Versi terbaru akan
          selalu tersedia di halaman ini. Lanjutkan penggunaan aplikasi berarti
          Anda menyetujui perubahan tersebut.
        </p>
      </>
    ),
  },
];

export default function TermsOfServiceContent() {
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
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-sm text-gray-600">
            Last updated: {selectedRevision.date}
          </p>

          {selectedRevision.content}
        </main>
      </div>

      <Footer />
    </>
  );
}
