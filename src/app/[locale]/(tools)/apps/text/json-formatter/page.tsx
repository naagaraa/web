import Link from "next/link";
import { JsonFormatter } from "./JsonFormatter";

export const metadata = {
  title: "JSON Formatter",
  description: "Format dan validasi JSON secara instan.",
};

export default function Page() {
  return (
    <>
      <Link
        href="/apps"
        className="block mt-20 mx-auto text-blue-600 hover:underline text-sm"
      >
        ← Kembali ke Aplikasi
      </Link>

      <JsonFormatter />
    </>
  );
}
