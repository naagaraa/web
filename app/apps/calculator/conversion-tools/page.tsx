// app/page.tsx
import type { Metadata } from "next";
import ConversionTools from "./ConversionTools";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Network Tools | IP & Subnet Calculator, VLSM, DNS, WHOIS",
  description:
    "Kumpulan alat jaringan seperti IP calculator, VLSM, DNS Lookup, WHOIS dan lainnya.",
};

export default function page() {
  return (
    <>
      <Link
        prefetch
        href="/apps"
        className="block mt-20 mx-auto text-blue-600 hover:underline text-sm text-center"
      >
        ← Kembali ke Aplikasi
      </Link>
      <ConversionTools />
    </>
  );
}
