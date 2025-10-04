import { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/src/components/BackButton";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import ImageRotate from "./ImageRotate";

export async function generateMetadata(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const locale = searchParams?.locale === "id" ? "id" : "en";

  const title =
    locale === "id"
      ? "Alat Rotasi & Flip Gambar Online – Gratis & Cepat"
      : "Online Image Rotate & Flip Tool – Free & Fast";

  const description =
    locale === "id"
      ? "Putar, balik, dan sesuaikan gambar Anda secara online tanpa instalasi. Dukungan rotasi 90°, 180°, flip horizontal/vertikal. 100% gratis, aman, dan berbasis browser."
      : "Rotate, flip, and adjust your images online—no installation needed. Supports 90°, 180° rotation and horizontal/vertical flipping. 100% free, secure, and browser-based.";

  const keywords = [
    // English
    "image rotate tool",
    "rotate image online",
    "flip image online",
    "image rotation tool",
    "free image editor",
    "rotate photo 90 degrees",
    "flip horizontal vertical image",
    "online image transformer",

    // Indonesian
    "alat rotasi gambar",
    "putar gambar online",
    "balik gambar online",
    "kalkulator rotasi gambar",
    "edit gambar gratis",
    "putar foto 90 derajat",
    "flip horizontal vertikal gambar",
    "alat edit gambar online",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      siteName: locale === "id" ? "ToolsGambar.com" : "ImageTools.dev", // optional
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-screen" />}>
      <BackButton />
      <ImageRotate />
    </Suspense>
  );
}
