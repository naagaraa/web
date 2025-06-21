import { Metadata } from "next";
import VitaminCalculator from "./VitaminCalculator";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id"
      ? "Kalkulator Vitamin & Suplemen"
      : "Vitamin & Supplement Calculator";
  const description =
    locale === "id"
      ? "Perkirakan kebutuhan harian vitamin dan mineral Anda berdasarkan usia, jenis kelamin, dan kondisi kesehatan."
      : "Estimate your daily vitamin and mineral needs based on age, gender, and health conditions.";

  return {
    title,
    description,
    keywords: [
      "vitamin calculator",
      "kebutuhan vitamin",
      "suplemen harian",
      "diet vegan",
      "vitamin ibu hamil",
    ],
    openGraph: { title, description, type: "website" },
  };
}

export default function Page() {
  <Suspense fallback={<div>Loading...</div>}>
    <VitaminCalculator />
  </Suspense>;
}
