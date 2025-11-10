// src/app/tools/pdf/merge/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import PdfMergerTool from "./components/PdfMergerTool";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PDF Merger",
    description:
      "Gabungkan beberapa file PDF menjadi satu dokumen. Semua proses terjadi di browser — tidak ada file dikirim atau disimpan.",
    keywords: [
      "merge pdf",
      "gabung pdf",
      "pdf merger",
      "combine pdf",
      "privacy first",
    ],
    openGraph: {
      title: "PDF Merger – Gabung PDF Secara Instan",
      description:
        "100% offline. Tidak ada upload ke server. Hasil langsung diunduh.",
      type: "website",
    },
  };
}

export default function PdfMergePage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <PdfMergerTool />
    </Suspense>
  );
}
