import { Metadata } from "next";
import BMRCalculator from "./BMRCalculator";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title = locale === "id" ? "Kalkulator BMR" : "BMR Calculator";
  const description =
    locale === "id"
      ? "Hitung BMR (Basal Metabolic Rate) Anda untuk mengetahui kebutuhan kalori saat istirahat total."
      : "Calculate your BMR (Basal Metabolic Rate) to know how many calories your body needs at rest.";

  return {
    title,
    description,
    keywords: [
      "BMR calculator",
      "kalkulator BMR",
      "basal metabolic rate",
      "kalori istirahat",
      "diet",
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default function Page() {
  return <BMRCalculator />;
}
