import { Metadata } from "next";
import WaterCalculator from "./WaterCalculator";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id"
      ? "Kalkulator Air Minum Harian"
      : "Daily Water Intake Calculator";
  const description =
    locale === "id"
      ? "Hitung kebutuhan air minum harian Anda berdasarkan berat badan dan aktivitas."
      : "Calculate your daily water intake based on your weight and activity level.";

  return {
    title,
    description,
    keywords: [
      "water intake calculator",
      "kebutuhan air harian",
      "hydration calculator",
      "kalkulator air minum",
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default function Page() {
  return <WaterCalculator />;
}
