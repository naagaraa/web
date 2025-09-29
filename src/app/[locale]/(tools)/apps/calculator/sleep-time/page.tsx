import { Metadata } from "next";
import SleepTimeCalc from "./SleepTimeCalc";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export async function generateMetadata(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id" ? "Kalkulator Waktu Tidur" : "Sleep Time Calculator";
  const description =
    locale === "id"
      ? "Hitung waktu tidur ideal agar bangun lebih segar berdasarkan siklus tidur REM."
      : "Calculate ideal sleep time to wake up refreshed based on REM sleep cycles.";

  return {
    title,
    description,
    keywords: [
      "sleep calculator",
      "waktu tidur",
      "sleep cycle",
      "REM sleep",
      "tidur ideal",
    ],
    openGraph: { title, description, type: "website" },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <SleepTimeCalc />
    </Suspense>
  );
}
