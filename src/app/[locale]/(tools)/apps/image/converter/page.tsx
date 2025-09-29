import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import ImageConverter from "./ImageConverter";

export async function generateMetadata(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
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
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <ImageConverter />
    </Suspense>
  );
}
