import { Metadata } from "next";
import { Suspense } from "react";
import DepressionQuizTwoColumn from "./components/BurnoutQuizTwoColumn";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tes Depresi",
    description:
      "Cek tingkat depresi Anda menggunakan skala PHQ-9 dengan dashboard interaktif.",
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <DepressionQuizTwoColumn />
    </Suspense>
  );
}
