// src/app/tools/pdf/rotate/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import PdfRotatorTool from "./components/PdfRotatorTool";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PDF Rotator",
    description:
      "Putar halaman PDF sesuai kebutuhan. Pilih halaman dan sudut rotasi. Semua proses di browser — tidak ada data disimpan.",
    keywords: [
      "rotate pdf",
      "putar pdf",
      "pdf rotator",
      "rotate pages",
      "privacy first",
    ],
    openGraph: {
      title: "PDF Rotator – Putar Halaman PDF Secara Instan",
      description: "100% offline. Tidak ada upload ke server.",
      type: "website",
    },
  };
}

export default function PdfRotatePage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <PdfRotatorTool />
    </Suspense>
  );
}
