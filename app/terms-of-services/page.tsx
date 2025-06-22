import Footer from "@/components/UI/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Syarat dan ketentuan penggunaan layanan.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-sm text-gray-600">Last updated: June 2025</p>

        <p>
          Dengan menggunakan aplikasi ini, Anda menyetujui syarat dan ketentuan
          berikut. Harap baca dengan cermat.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Penggunaan Aplikasi</h2>
        <p>
          Aplikasi ini disediakan sebagaimana adanya, tanpa jaminan apa pun.
          Pengguna bertanggung jawab penuh atas penggunaan dan hasil yang
          diperoleh.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Tidak Ada Jaminan</h2>
        <p>
          Kami tidak memberikan jaminan atas keakuratan, ketersediaan, atau
          keamanan aplikasi ini. Kami tidak bertanggung jawab atas kerugian
          akibat penggunaan alat ini.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Privasi dan Keamanan</h2>
        <p>
          Aplikasi ini berjalan sepenuhnya di sisi client (browser). Kami tidak
          menyimpan, memproses, atau mengakses data Anda. Seluruh kalkulasi dan
          pengolahan data terjadi secara lokal di perangkat Anda.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Perubahan Ketentuan</h2>
        <p>
          Ketentuan ini dapat diperbarui sewaktu-waktu. Versi terbaru akan
          selalu tersedia di halaman ini. Lanjutkan penggunaan aplikasi berarti
          Anda menyetujui perubahan tersebut.
        </p>
      </div>
      <Footer />
    </>
  );
}
