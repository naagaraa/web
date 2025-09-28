// src/app/[locale]/(tools)/apps/calculator/blood-glucose/page.tsx
import { Metadata } from "next";
import BloodGlucoseCalc from "./BloodGlucoseCalc";
import { Suspense } from "react";

// Metadata in Bahasa Indonesia only
export const metadata: Metadata = {
  title: "Kalkulator Risiko Diabetes",
  description:
    "Perkirakan risiko diabetes berdasarkan usia, berat badan, dan riwayat keluarga.",
  keywords: ["kalkulator gula darah", "risiko diabetes", "glukosa", "diabetes"],
  openGraph: {
    title: "Kalkulator Risiko Diabetes",
    description:
      "Perkirakan risiko diabetes berdasarkan usia, berat badan, dan riwayat keluarga.",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <BloodGlucoseCalc />
    </Suspense>
  );
}
