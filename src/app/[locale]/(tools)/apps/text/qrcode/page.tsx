import Link from "next/link";
import QRCodeGenerator from "./QrCodeGenerator";
import Footer from "@/src/components/layout/Footer";

export const metadata = {
  title: "QR Code Generator",
  description: "Buat dan unduh QR Code dari teks, tautan, atau data Anda.",
};

export default function Page() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 mt-24 space-y-12 mb-24">
        <Link
          href="/apps"
          className="text-blue-600 hover:underline text-sm block text-center"
        >
          ← Kembali ke Aplikasi
        </Link>

        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold">QR Code Generator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Buat QR Code secara instan dari teks atau tautan. Cocok untuk
            berbagi URL, kontak, atau data lainnya secara cepat dan praktis.
          </p>

          {/* <div className="flex justify-center mt-6">
            <Image
              src={qrcodeexample} // Pastikan gambar ini ada di public/
              alt="Contoh QR Code"
              width={200}
              height={200}
              className="rounded border shadow"
            />
          </div> */}
        </section>

        <section>
          <QRCodeGenerator />
        </section>
      </main>
      <Footer />
    </>
  );
}
