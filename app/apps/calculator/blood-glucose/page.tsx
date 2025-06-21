import { Metadata } from "next";
import BloodGlucoseCalc from "./BloodGlucoseCalc";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
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
  return <BloodGlucoseCalc />;
}
