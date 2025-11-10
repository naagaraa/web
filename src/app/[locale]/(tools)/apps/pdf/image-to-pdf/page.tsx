// src/app/tools/image-to-pdf/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import ImageToPdfTool from "./components/ImageToPdfTool";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Image to PDF Converter",
    description:
      "Ubah gambar (JPG/PNG) menjadi file PDF secara instan. Semua proses terjadi di browser — tidak ada data yang dikirim atau disimpan.",
    keywords: [
      "image to pdf",
      "convert image to pdf",
      "jpg to pdf",
      "png to pdf",
      "privacy first",
    ],
    openGraph: {
      title: "Image to PDF – Konversi Cepat & Aman",
      description:
        "100% offline. Tidak ada upload ke server. Hasil langsung diunduh.",
      type: "website",
    },
  };
}

export default function ImageToPdfPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <ImageToPdfTool />
    </Suspense>
  );
}
