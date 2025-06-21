import { Metadata } from "next";
import BMICalculator from "./BMICalculator";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title = locale === "id" ? "Kalkulator BMI" : "BMI Calculator";
  const description =
    locale === "id"
      ? "Hitung indeks massa tubuh (BMI) Anda dan ketahui apakah berat badan Anda ideal."
      : "Calculate your Body Mass Index (BMI) and check if your weight is ideal.";

  return {
    title,
    description,
    keywords: [
      "BMI calculator",
      "kalkulator BMI",
      "ideal weight",
      "body mass index",
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default function Page() {
  return <BMICalculator />;
}
