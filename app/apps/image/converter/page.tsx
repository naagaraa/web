import Link from "next/link";
import ImageConverterTool from "./ImageConverter";

export const metadata = {
  title: "Image Format Converter",
  description: "Konversi gambar ke PNG, JPG, atau WebP secara online.",
};

export default function Page() {
  return (
    <>
      <Link
        href="/apps"
        className="block mt-20 mx-auto text-blue-600 hover:underline text-sm text-center"
      >
        ← Kembali ke Aplikasi
      </Link>
      <ImageConverterTool />
    </>
  );
}
