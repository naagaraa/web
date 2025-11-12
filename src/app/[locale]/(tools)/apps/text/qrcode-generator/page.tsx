// src/app/tools/qr-code/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import QRCodeGenerator from "./components/QrCodeGenerator";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "QR Code Generator",
    description:
      "Buat QR code dari teks atau tautan secara instan. Semua proses terjadi di browser — tidak ada data dikirim atau disimpan.",
    keywords: [
      "qr code generator",
      "buat qr code",
      "qr code online",
      "privacy first qr",
      "download qr code",
    ],
    openGraph: {
      title: "QR Code Generator – Buat QR Secara Instan",
      description:
        "100% offline. Tidak ada data dikirim ke server. Hasil langsung diunduh sebagai PNG.",
      type: "website",
    },
  };
}

export default function QRCodePage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <QRCodeGenerator />
    </Suspense>
  );
}
