// src/app/tools/pdf/compress/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import PdfCompressTool from "./components/pdfCompressTool"; // ← komponen client di folder yang sama

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kompres PDF",
    description:
      "Kurangi ukuran file PDF secara instan di browser. Tanpa upload ke server — privasi terjaga.",
    keywords: [
      "kompres pdf",
      "perkecil ukuran pdf",
      "pdf kecil",
      "compress pdf online",
      "privacy first",
    ],
    openGraph: {
      title: "Kompres PDF – Kurangi Ukuran File Secara Instan",
      description: "100% offline. Tidak ada data yang dikirim ke server.",
      type: "website",
    },
  };
}

export default function PdfCompressPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <PdfCompressTool />
    </Suspense>
  );
}
