import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import FilterImage from "./FilterImageTools";

export async function generateMetadata(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title = locale === "id" ? "Alat Filter Gambar" : "Image Filter Tool";
  const description =
    locale === "id"
      ? "Tambahkan berbagai filter profesional pada gambar Anda secara online, termasuk Black & White, Sepia, dan banyak lainnya."
      : "Apply professional image filters online, including Black & White, Sepia, and many more.";

  return {
    title,
    description,
    keywords: [
      "image filter",
      "foto editor",
      "filter gambar",
      "online photo tools",
      "photo effects",
      "black and white",
      "sepia",
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
      <FilterImage />
    </Suspense>
  );
}
