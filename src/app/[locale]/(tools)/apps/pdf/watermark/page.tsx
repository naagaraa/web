// src/app/tools/pdf/watermark/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import PdfWatermarkTool from "./components/PdfWatermarkTool";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PDF Watermark",
    description:
      "Tambahkan teks atau logo sebagai watermark ke PDF Anda. Semua proses di browser — tidak ada data disimpan.",
    keywords: [
      "pdf watermark",
      "tambah watermark pdf",
      "proteksi pdf",
      "privacy first",
    ],
    openGraph: {
      title: "PDF Watermark – Tambahkan Watermark Secara Instan",
      description: "100% offline. Tidak ada upload ke server.",
      type: "website",
    },
  };
}

export default function PdfWatermarkPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <PdfWatermarkTool />
    </Suspense>
  );
}
