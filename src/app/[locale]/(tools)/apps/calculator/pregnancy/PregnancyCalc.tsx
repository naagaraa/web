"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function PregnancyCalc() {
  const [activeTab, setActiveTab] = useState<"hpht" | "usg">("hpht");

  const [hpht, setHpht] = useState("");
  const [usgDate, setUsgDate] = useState("");
  const [usgWeeks, setUsgWeeks] = useState("");
  const [usgDays, setUsgDays] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateFromHPHT = (date: Date) => {
    const edd = new Date(date);
    edd.setDate(edd.getDate() + 280);
    return edd;
  };

  const getGestationalAge = (start: Date, ref: Date) => {
    const diff = Math.floor(
      (ref.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weeks = Math.floor(diff / 7);
    const days = diff % 7;
    return { weeks, days };
  };

  const handleCalculate = () => {
    if (activeTab === "hpht" && !hpht) return;
    if (activeTab === "usg" && (!usgDate || !usgWeeks)) return;

    let edd: Date;
    let gestAge: { weeks: number; days: number } | null = null;
    const today = new Date();

    if (activeTab === "usg") {
      const baseDate = new Date(usgDate);
      const daysPregnant = parseInt(usgWeeks) * 7 + (parseInt(usgDays) || 0);
      const lmpEstimate = new Date(baseDate);
      lmpEstimate.setDate(lmpEstimate.getDate() - daysPregnant);
      edd = calculateFromHPHT(lmpEstimate);
      gestAge = getGestationalAge(lmpEstimate, today);
    } else {
      const lmp = new Date(hpht);
      edd = calculateFromHPHT(lmp);
      gestAge = getGestationalAge(lmp, today);
    }

    let trimester = "";
    if (gestAge!.weeks < 13) trimester = "Trimester 1 (0–12 minggu)";
    else if (gestAge!.weeks < 28) trimester = "Trimester 2 (13–27 minggu)";
    else trimester = "Trimester 3 (28–40 minggu)";

    const totalDays = 280;
    const daysDone = gestAge!.weeks * 7 + gestAge!.days;
    const percent = Math.min(100, Math.round((daysDone / totalDays) * 100));

    setResult({
      edd: edd.toDateString(),
      gestAge,
      trimester,
      daysDone,
      totalDays,
      percent,
    });
  };

  const reset = () => {
    setHpht("");
    setUsgDate("");
    setUsgWeeks("");
    setUsgDays("");
    setResult(null);
  };

  const chartData =
    result && result.percent
      ? [
          { name: "Sudah Berjalan", value: result.percent },
          { name: "Sisa", value: 100 - result.percent },
        ]
      : [];

  const COLORS = ["#4F46E5", "#E5E7EB"];

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Kalkulator Kehamilan
        </h1>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border border-gray-200 rounded overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveTab("hpht")}
            className={`py-2 font-medium ${
              activeTab === "hpht"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Metode 1: HPHT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("usg")}
            className={`py-2 font-medium ${
              activeTab === "usg"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Metode 2: USG
          </button>
        </div>

        {/* Form HPHT */}
        {activeTab === "hpht" && (
          <div className="border p-4 bg-gray-50 space-y-2">
            <h2 className="font-semibold">Hari Pertama Haid Terakhir</h2>
            <input
              type="date"
              value={hpht}
              onChange={(e) => setHpht(e.target.value)}
              className="w-full border p-2"
            />
            <p className="text-xs text-gray-500">
              Hanya digunakan bila Anda sudah hamil & ingin menghitung dari
              HPHT.
            </p>
          </div>
        )}

        {/* Form USG */}
        {activeTab === "usg" && (
          <div className="border p-4 bg-gray-50 space-y-2">
            <h2 className="font-semibold">Data USG</h2>
            <label className="text-sm">Tanggal USG</label>
            <input
              type="date"
              value={usgDate}
              onChange={(e) => setUsgDate(e.target.value)}
              className="w-full border p-2"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Minggu"
                value={usgWeeks}
                onChange={(e) => setUsgWeeks(e.target.value)}
                className="w-full border p-2"
              />
              <input
                type="number"
                placeholder="Hari"
                value={usgDays}
                onChange={(e) => setUsgDays(e.target.value)}
                className="w-full border p-2"
              />
            </div>
            <p className="text-xs text-gray-500">
              Jika ada data dari USG, gunakan metode ini (lebih akurat).
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleCalculate}
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
        {result && (
          <div className="border p-6 bg-blue-50 space-y-4">
            <h3 className="text-lg font-bold text-blue-800">
              Hasil Perhitungan (Estimasi, bukan diagnosis)
            </h3>
            <p>
              📅 <strong>HPL (perkiraan tanggal lahir, jika hamil):</strong>{" "}
              {result.edd}
            </p>
            <p>
              👶 <strong>Usia kehamilan (perkiraan):</strong>{" "}
              {result.gestAge.weeks} minggu {result.gestAge.days} hari
            </p>
            <p>
              🗓️ <strong>Periode saat ini (perkiraan trimester):</strong>{" "}
              {result.trimester}
            </p>

            <div className="flex justify-center">
              <PieChart width={300} height={250}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            <p className="text-sm text-gray-600">
              Grafik menunjukkan berapa persen perjalanan kehamilan yang sudah
              dijalani hingga hari ini (jika hamil).
            </p>

            <div className="mt-4 border-t pt-4">
              <h4 className="font-semibold mb-2">
                Apa yang biasanya dilakukan di {result.trimester}?
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.trimester.includes("Trimester 1") && (
                  <>
                    <li>Konsumsi asam folat harian (minimal 400 mcg).</li>
                    <li>Periksa kehamilan pertama & USG awal.</li>
                  </>
                )}
                {result.trimester.includes("Trimester 2") && (
                  <>
                    <li>USG untuk memantau tumbuh kembang janin.</li>
                    <li>Periksa tekanan darah dan kadar gula.</li>
                  </>
                )}
                {result.trimester.includes("Trimester 3") && (
                  <>
                    <li>
                      Kontrol kehamilan lebih sering (2 minggu sekali atau tiap
                      minggu).
                    </li>
                    <li>Siapkan rencana persalinan dan tanda bahaya.</li>
                  </>
                )}
              </ul>
            </div>

            <p className="text-xs text-red-600 mt-2 font-medium">
              ⚠️ Kalkulator ini tidak memastikan kehamilan. Gunakan hanya jika
              Anda sudah dipastikan hamil. Untuk kepastian, lakukan pemeriksaan
              test pack atau konsultasi dokter kandungan.
            </p>
          </div>
        )}
      </section>

      {/* Right Column */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Tentang Kalkulator Ini
        </h2>
        <p className="text-gray-700">
          <strong>HPHT</strong> = Hari Pertama Haid Terakhir. Digunakan untuk
          memperkirakan usia kehamilan bila tidak ada data USG.
        </p>
        <p className="text-gray-700">
          <strong>USG</strong> = Pemeriksaan ultrasonografi. Jika tersedia,
          hasil USG biasanya lebih akurat dibanding HPHT.
        </p>
        <p className="text-gray-700">
          <strong>Trimester</strong> adalah pembagian periode kehamilan:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>Trimester 1:</strong> 0–12 minggu
          </li>
          <li>
            <strong>Trimester 2:</strong> 13–27 minggu
          </li>
          <li>
            <strong>Trimester 3:</strong> 28–40 minggu
          </li>
        </ul>
        <p className="text-sm text-gray-600 italic">
          ⚠️ Hasil kalkulator hanya estimasi dan tidak bisa memastikan
          kehamilan. Keputusan medis tetap harus berdasarkan pemeriksaan dokter
          kandungan.
        </p>
      </section>
    </main>
  );
}
