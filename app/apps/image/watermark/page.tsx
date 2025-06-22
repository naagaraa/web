import Link from "next/link";
import ImageWatermarkTool from "./ImageWatermarkTool";

export const metadata = {
  title: "Image Watermark Tool",
  description:
    "Tambahkan watermark teks ke gambar dengan mudah dan unduh hasilnya.",
};

export default function Page() {
  return (
    <>
      <Link
        prefetch
        href="/apps"
        className="block mt-20 mx-auto text-blue-600 hover:underline text-sm text-center"
      >
        ← Kembali ke Aplikasi
      </Link>
      <ImageWatermarkTool />
    </>
  );
}
