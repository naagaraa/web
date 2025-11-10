// src/app/tools/pdf/split/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import PdfSplitterTool from "./components/PdfSplitterTool";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PDF Splitter",
    description:
      "Pisahkan file PDF berdasarkan halaman. Ekstrak halaman tertentu atau pisah tiap halaman. Semua proses di browser — tidak ada data disimpan.",
    keywords: [
      "split pdf",
      "pisah pdf",
      "ekstrak halaman pdf",
      "pdf splitter",
      "privacy first",
    ],
    openGraph: {
      title: "PDF Splitter – Pisah Halaman PDF Secara Instan",
      description: "100% offline. Tidak ada upload ke server.",
      type: "website",
    },
  };
}

export default function PdfSplitPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <PdfSplitterTool />
    </Suspense>
  );
}
