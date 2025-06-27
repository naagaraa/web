import type { Metadata } from "next";
import IPCalculator from "./IPCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IP Calculator | Subnetting Tool Online",
  description:
    "Hitung subnet mask, network address, broadcast address, dan host IP dengan kalkulator IP & CIDR subnetting online.",
  keywords: [
    "IP calculator",
    "subnet calculator",
    "cidr calculator",
    "subnetting",
    "network calculator",
    "kalkulator IP",
  ],
  openGraph: {
    title: "IP Calculator | Subnetting Tool Online",
    description:
      "Alat gratis untuk menghitung subnet, CIDR, dan alamat jaringan. Cocok untuk teknisi jaringan & DevOps.",
    url: "https://yourdomain.com/ip-calculator",
    siteName: "Network Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Calculator | Subnetting Tool",
    description:
      "Kalkulator subnet CIDR online untuk teknisi jaringan dan sysadmin.",
  },
};

export default function IPCalcPage() {
  return (
    <>
      <Link
        prefetch
        href="/apps"
        className="block mt-20 mx-auto text-blue-600 hover:underline text-sm text-center"
      >
        ← Kembali ke Aplikasi
      </Link>
      <main className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">IP Subnet Calculator</h1>
        <IPCalculator />
      </main>
    </>
  );
}
