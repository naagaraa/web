import Link from "next/link";
import Base64Tool from "./Base64Tool";

export const metadata = {
  title: "Base64 Encoder & Decoder",
  description: "Encode dan decode teks ke/dari Base64 secara instan.",
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
      <Base64Tool />
    </>
  );
}
