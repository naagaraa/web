import Link from "next/link";
import ImageCropTool from "./ImageCropTool";

export const metadata = {
  title: "Image Crop Tool",
  description: "Potong gambar dengan mudah dan unduh hasilnya.",
};

export default function Page() {
  return (
    <>
      <ImageCropTool />
    </>
  );
}
