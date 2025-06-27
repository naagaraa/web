import Footer from "@/src/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kebijakan privasi pengguna layan.",
};

export default function page() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-gray-600">Last updated: June 2025</p>

        <p>
          Kami sangat menghargai privasi Anda. Aplikasi ini dirancang untuk
          menjaga kerahasiaan Anda dengan tidak menyimpan atau mengirimkan data
          apa pun ke server kami.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          1. Tidak Ada Pengumpulan Data
        </h2>
        <p>
          Semua proses, termasuk kalkulasi dan manipulasi file, dilakukan
          sepenuhnya di browser Anda. Kami tidak memiliki akses ke file atau
          informasi apa pun yang Anda masukkan.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          2. Tidak Ada Cookie atau Pelacakan
        </h2>
        <p>
          Aplikasi ini tidak menggunakan cookie, pelacak, atau layanan analytics
          pihak ketiga. Penggunaan bersifat anonim dan tidak dapat ditelusuri.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Keamanan Data</h2>
        <p>
          Karena seluruh proses dilakukan di sisi client, tidak ada data yang
          dikirimkan atau disimpan di server. Hal ini menjamin privasi dan
          keamanan Anda secara maksimal.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Perubahan Kebijakan</h2>
        <p>
          Kebijakan ini dapat berubah tanpa pemberitahuan terlebih dahulu. Versi
          terbaru akan selalu tersedia di halaman ini.
        </p>
      </div>
      <Footer />
    </>
  );
}
