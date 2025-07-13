import Link from "next/link";
import Image from "next/image";
import PomodoroTool from "./PomodoroTool";
import ScrollToTopButton from "../../../editor/ScrollToTopButton";

export const metadata = {
  title: "Pomodoro Timer",
  description:
    "Fokus dengan teknik Pomodoro — 25 menit kerja, 5 menit istirahat.",
};

export default function Page() {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      {/* Kiri: Konten Tools */}
      <div className="w-full md:w-1/2 h-screen overflow-auto px-6 pt-6 pb-12 bg-white z-10">
        <Link
          prefetch
          href="/apps"
          className="text-blue-600 hover:underline text-sm text-start mb-6 block"
        >
          ← Kembali ke Aplikasi
        </Link>

        <div className="space-y-6">
          <PomodoroTool />
        </div>
      </div>

      {/* Kanan: Gambar */}
      <div className="hidden md:block relative w-full md:w-1/2 h-screen">
        <Image
          src="https://images.unsplash.com/photo-1712333758344-6f508f678588"
          alt="Pomodoro Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
