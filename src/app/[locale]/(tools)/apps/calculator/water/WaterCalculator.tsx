"use client";

import { useState } from "react";

const activityLevels = [
  { id: "sedentary", label: "Jarang bergerak", factor: 1 },
  { id: "light", label: "Aktivitas ringan (1-3x/minggu)", factor: 1.1 },
  { id: "moderate", label: "Aktivitas sedang (3-5x/minggu)", factor: 1.2 },
  { id: "active", label: "Aktivitas tinggi (6-7x/minggu)", factor: 1.3 },
];

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState<"normal" | "intense">("normal");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const baseIntake = weight * 35; // 35 ml per kg berat badan
    const selectedActivity = activityLevels.find((a) => a.id === activity);
    let total = baseIntake * (selectedActivity?.factor || 1);
    if (goal === "intense") total *= 1.2; // tambahan untuk olahraga intens

    setResult(Math.round(total) / 1000); // konversi ml -> liter
  };

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Form */}
      <section className="space-y-6">
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block font-medium">Berat Badan (kg)</label>
          <input
            type="number"
            min={20}
            max={300}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full border p-2"
          />
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block font-medium">Tingkat Aktivitas Fisik</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full border p-2"
          >
            {activityLevels.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block font-medium">Tujuan</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setGoal("normal")}
              className={`py-2 font-medium rounded ${
                goal === "normal"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setGoal("intense")}
              className={`py-2 font-medium rounded ${
                goal === "intense"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Olahraga Intens
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700"
        >
          Hitung Kebutuhan Air
        </button>

        {result !== null && (
          <div className="border border-gray-200 shadow-sm p-6 mt-4 bg-blue-50 text-blue-800 space-y-3">
            <h3 className="font-bold text-lg">Hasil Perhitungan</h3>
            <p>
              💧 Kebutuhan air harian Anda sekitar{" "}
              <strong>{result} liter</strong>.
            </p>
            <p>
              Rekomendasi: Minum secara bertahap sepanjang hari, misal 8 gelas
              (~250ml per gelas).
            </p>
          </div>
        )}
      </section>

      {/* Right Column: Info */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Tentang Kebutuhan Air Harian
        </h2>
        <p>
          Tubuh manusia memerlukan cukup cairan untuk menjaga fungsi organ,
          metabolisme, dan suhu tubuh.
        </p>
        <p>Aturan umum:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>35 ml air per kg berat badan.</li>
          <li>Tambahan jika olahraga atau aktivitas berat.</li>
          <li>Minum secara berkala, bukan sekaligus banyak.</li>
        </ul>
        <p className="text-sm italic text-gray-600">
          ⚠️ Catatan: Kalkulator ini bersifat edukasi. Kondisi khusus (hamil,
          penyakit ginjal, jantung) mungkin memerlukan konsultasi dokter.
        </p>
      </section>
    </main>
  );
}
