// src/app/tools/qr-code-reader/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import QRCodeReader from "./components/QRCodeReader";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "QR Code Reader",
    description:
      "Scan QR code langsung dari kamera atau unggah gambar. 100% offline, tidak ada data disimpan.",
    keywords: [
      "qr code reader",
      "scan qr code",
      "baca qr",
      "qr scanner online",
      "privacy first",
    ],
    openGraph: {
      title: "QR Code Reader – Scan Instan dari Kamera",
      description: "Tidak perlu izin server. Semua diproses di perangkatmu.",
      type: "website",
    },
  };
}

export default function QRCodeReaderPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <QRCodeReader />
    </Suspense>
  );
}
