import { Metadata } from "next";
import { Suspense } from "react";
import QuizPage from "./components/QuizPage";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tes Depresi",
    description:
      "Cek tingkat depresi Anda menggunakan skala PHQ-9 dengan dashboard interaktif.",
  };
}

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <QuizPage />
      <p>cooming soon</p>
    </Suspense>
  );
}
