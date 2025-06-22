// app/image/compressor/page.tsx
import type { Metadata } from "next";
import ImageCompressor from "./ImageCompressor";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Compressor | Kompres Gambar Online Cepat",
  description:
    "Kompres gambar JPEG secara online tanpa kehilangan kualitas. Atur kualitas gambar dan unduh hasil kompresi.",
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-24 space-y-6">
      <Link
        href="/apps"
        className="text-blue-600 hover:underline block text-sm"
        prefetch
      >
        ← Kembali ke Tools
      </Link>

      <ImageCompressor />
    </div>
  );
}
