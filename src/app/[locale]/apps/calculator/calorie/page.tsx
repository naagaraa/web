import { Metadata } from "next";
import CalorieCalculator from "./CalorieCalculator";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id" ? "Kalkulator Kalori Harian" : "Daily Calorie Calculator";
  const description =
    locale === "id"
      ? "Hitung kebutuhan kalori harian Anda secara akurat."
      : "Calculate your daily calorie needs accurately.";

  return {
    title,
    description,
    keywords: [
      "calorie calculator",
      "kalori harian",
      "BMR calculator",
      "diet planner",
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalorieCalculator />;
    </Suspense>
  );
}
