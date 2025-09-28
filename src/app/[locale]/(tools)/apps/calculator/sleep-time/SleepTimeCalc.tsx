"use client";

import { useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function SleepTimeCalc() {
  const [mode, setMode] = useState<"wake" | "sleep">("wake");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const calculate = () => {
    if (!time) return;
    const [hours, minutes] = time.split(":").map(Number);
    const base = new Date();
    base.setHours(hours, minutes, 0, 0);

    const cycles = [3, 4, 5, 6]; // jumlah siklus tidur (90 menit)
    const newResults: string[] = [];

    cycles.forEach((c) => {
      const date = new Date(base);
      if (mode === "wake") {
        // user pilih jam bangun, mundur per 90 menit
        date.setMinutes(date.getMinutes() - c * 90);
      } else {
        // user pilih jam tidur, maju per 90 menit
        date.setMinutes(date.getMinutes() + c * 90);
      }
      newResults.push(formatTime(date));
    });

    setResults(newResults);
  };

  const reset = () => {
    setTime("");
    setResults([]);
  };

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Sleep Time Calculator
        </h1>
        <p className="text-gray-600 text-sm">
          Hitung jam tidur atau bangun yang ideal berdasarkan siklus tidur 90
          menit. Pilih mode di bawah ini:
        </p>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 border border-gray-200 rounded overflow-hidden">
          <button
            type="button"
            onClick={() => setMode("wake")}
            className={`py-2 font-medium ${
              mode === "wake"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Saya ingin bangun
          </button>
          <button
            type="button"
            onClick={() => setMode("sleep")}
            className={`py-2 font-medium ${
              mode === "sleep"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Saya ingin tidur
          </button>
        </div>

        {/* Time Input */}
        <div className="border p-4 bg-gray-50 space-y-2">
          <label className="font-medium text-gray-700">
            {mode === "wake" ? "Jam Bangun" : "Jam Tidur"}
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-600 text-white py-2 font-medium hover:bg-blue-700"
          >
            Hitung
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-100 text-gray-800 py-2 font-medium hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="border p-6 bg-blue-50 space-y-4">
            <h3 className="font-bold text-lg">Rekomendasi</h3>
            {mode === "wake" ? (
              <p className="text-sm text-gray-700">
                Jika ingin bangun jam <strong>{time}</strong>, sebaiknya Anda
                tidur pada salah satu jam berikut:
              </p>
            ) : (
              <p className="text-sm text-gray-700">
                Jika ingin tidur jam <strong>{time}</strong>, sebaiknya Anda
                bangun pada salah satu jam berikut:
              </p>
            )}
            <ul className="list-disc list-inside space-y-1 text-sm">
              {results.map((r, i) => (
                <li key={i} className="font-semibold">
                  {r}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 italic">
              ⚠️ Perhitungan ini hanya perkiraan. Kualitas tidur juga
              dipengaruhi oleh rutinitas, cahaya, dan kesehatan Anda.
            </p>
          </div>
        )}
      </section>

      {/* Right Column */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Apa itu siklus tidur?
        </h2>
        <p className="text-gray-700 text-sm">
          Tidur manusia terbagi dalam <strong>siklus 90 menit</strong> yang
          terdiri dari tidur ringan, tidur dalam, dan tidur REM. Bangun di akhir
          siklus membuat tubuh terasa lebih segar dibanding bangun di tengah
          siklus.
        </p>
        <p className="text-gray-700 text-sm">
          Karena itu, kalkulator ini membantu Anda menentukan jam tidur atau
          bangun agar selaras dengan siklus alami tubuh.
        </p>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>1 siklus ≈ 90 menit</li>
          <li>Idealnya tidur 4–6 siklus (6–9 jam)</li>
          <li>Kualitas tidur lebih penting dari kuantitas</li>
        </ul>
      </section>
    </main>
  );
}
