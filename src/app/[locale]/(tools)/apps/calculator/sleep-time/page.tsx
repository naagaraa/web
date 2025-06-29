import { Metadata } from "next";
import SleepTimeCalc from "./SleepTimeCalc";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
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
    <Suspense fallback={<div>Loading...</div>}>
      <SleepTimeCalc />
    </Suspense>
  );
}
