import { Metadata } from "next";

import { Suspense } from "react";
import AnxietyQuiz from "./components/AnxietyQuiz";

export async function generateMetadata(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title = locale === "id" ? "Cek Kecemasan" : "Anxiety Checker";
  const description =
    locale === "id"
      ? "Cek tingkat kecemasan Anda berdasarkan skala GAD-7."
      : "Check your anxiety level using the GAD-7 scale.";

  return {
    title,
    description,
    keywords: ["anxiety", "GAD-7", "mental health", "kecemasan"],
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
      <AnxietyQuiz />
    </Suspense>
  );
}
