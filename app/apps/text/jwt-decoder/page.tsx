import Link from "next/link";
import JwtDecoder from "./JwtDecoder";

export const metadata = {
  title: "JWT Decoder",
  description: "Dekode token JWT dan lihat header & payload-nya secara instan.",
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
      <JwtDecoder />
    </>
  );
}
