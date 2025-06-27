import Link from "next/link";
import { SelfEsteemScale } from "./SelfEsteemScale";
import Footer from "@/src/components/layout/Footer";

export const metadata = {
  title: "Self-Esteem Scale",
  description:
    "Tes cepat untuk mengukur harga diri Anda berdasarkan skala Rosenberg.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col mt-16">
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/apps" className="text-sm text-blue-600 hover:underline">
            ← Kembali ke Tools
          </Link>
        </div>
      </header>

      {/* Konten utama */}
      <main className="flex-grow">
        <SelfEsteemScale />
      </main>

      <Footer />
    </div>
  );
}
