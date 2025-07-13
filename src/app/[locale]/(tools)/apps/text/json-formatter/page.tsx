import Link from "next/link";
import { JsonFormatter } from "./JsonFormatter";
import Image from "next/image";
import ScrollToTopButton from "../../../editor/ScrollToTopButton";

export const metadata = {
  title: "JSON Formatter",
  description: "Format dan validasi JSON secara instan.",
};

export default function Page() {
  return (
    <>
      <div className="relative flex flex-col md:flex-row min-h-screen">
        {/* Kiri: Konten Tools */}
        <div className="w-full md:w-1/2 h-screen overflow-auto px-6 pt-6 pb-12 bg-white z-10">
          <Link
            prefetch
            href="/apps"
            className="text-blue-600 hover:underline text-sm text-start mb-6 block"
          >
            ← Kembali ke Aplikasi
          </Link>

          <div className="space-y-6">
            <JsonFormatter />
          </div>
        </div>

        {/* Kanan: Gambar Ilustrasi */}
        <div className="hidden md:block relative w-full md:w-1/2 h-screen">
          <Image
            src="https://images.unsplash.com/photo-1712333758344-6f508f678588?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Base64 Illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        <ScrollToTopButton />
      </div>
    </>
  );
}
