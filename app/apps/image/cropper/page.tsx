import Link from "next/link";
import ImageCropTool from "./ImageCropTool";

export const metadata = {
  title: "Image Crop Tool",
  description: "Potong gambar dengan mudah dan unduh hasilnya.",
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
      <ImageCropTool />
    </>
  );
}
