import { Metadata } from "next";
import PregnancyCalc from "./PregnancyCalc";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export async function generateMetadata(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id" ? "Kalkulator Kehamilan" : "Pregnancy Due Date Calculator";
  const description =
    locale === "id"
      ? "Hitung usia kehamilan dan perkiraan tanggal persalinan (HPL) berdasarkan HPHT."
      : "Estimate your pregnancy week and due date based on your last menstrual period (LMP).";

  return {
    title,
    description,
    keywords: [
      "pregnancy calculator",
      "due date estimator",
      "HPHT calculator",
      "kalkulator kehamilan",
      "usia kandungan",
    ],
    openGraph: { title, description, type: "website" },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <PregnancyCalc />
    </Suspense>
  );
}
