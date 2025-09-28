import { Metadata } from "next";
import BloodGlucoseCalc from "./BloodGlucoseCalc";
import { Suspense } from "react";

export async function generateMetadata(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id"
      ? "Kalkulator Risiko Diabetes"
      : "Blood Glucose Risk Calculator";
  const description =
    locale === "id"
      ? "Perkirakan risiko diabetes berdasarkan usia, berat badan, dan riwayat keluarga."
      : "Estimate your diabetes risk based on age, weight, and family history.";

  return {
    title,
    description,
    keywords: [
      "blood sugar calculator",
      "diabetes risk",
      "glucose calculator",
      "kalkulator gula darah",
    ],
    openGraph: { title, description, type: "website" },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BloodGlucoseCalc />;
    </Suspense>
  );
}
