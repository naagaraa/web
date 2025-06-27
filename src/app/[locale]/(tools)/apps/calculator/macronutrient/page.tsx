import { Metadata } from "next";
import MacronutrientCalc from "./MacronutrientCalc";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id"
      ? "Kalkulator Nutrisi Harian"
      : "Daily Macronutrient Calculator";
  const description =
    locale === "id"
      ? "Hitung pembagian kalori harian menjadi karbohidrat, protein, dan lemak."
      : "Calculate how your daily calories should be divided into carbs, protein, and fat.";

  return {
    title,
    description,
    keywords: [
      "macronutrient calculator",
      "kalkulator nutrisi",
      "karbohidrat protein lemak",
      "fitness nutrition",
    ],
    openGraph: { title, description, type: "website" },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MacronutrientCalc />
    </Suspense>
  );
}
