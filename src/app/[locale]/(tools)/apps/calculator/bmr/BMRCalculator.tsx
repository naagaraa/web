/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const activityLevels = [
  { id: "sedentary", label: "Jarang bergerak (tidak olahraga)", factor: 1.2 },
  { id: "light", label: "Aktivitas ringan (1–3 hari/minggu)", factor: 1.375 },
  { id: "moderate", label: "Aktivitas sedang (3–5 hari/minggu)", factor: 1.55 },
  { id: "active", label: "Aktivitas tinggi (6–7 hari/minggu)", factor: 1.725 },
  {
    id: "very-active",
    label: "Sangat aktif (kerja fisik berat/latihan 2x/hari)",
    factor: 1.9,
  },
];

export default function BMRAndTDEECalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState<"maintain" | "lose" | "gain">("maintain");
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculate = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (height < 100 || weight < 20 || age < 1) {
      setBmr(null);
      setTdee(null);
      return;
    }

    let bmrValue: number;
    if (gender === "male") {
      bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    bmrValue = Math.max(800, bmrValue); // hindari terlalu rendah

    const selectedActivity = activityLevels.find((a) => a.id === activity);
    const tdeeValue = bmrValue * (selectedActivity?.factor || 1.55);

    setBmr(Math.round(bmrValue));
    setTdee(Math.round(tdeeValue));
  };

  const resetForm = () => {
    setGender("male");
    setHeight(170);
    setWeight(70);
    setAge(25);
    setActivity("moderate");
    setGoal("maintain");
    setBmr(null);
    setTdee(null);
  };

  // Rekomendasi kalori berdasarkan tujuan
  const getTargetCalories = () => {
    if (!tdee) return null;
    switch (goal) {
      case "lose":
        return Math.max(1200, tdee - 500); // defisit 500 kkal
      case "gain":
        return tdee + 300; // surplus moderat
      default:
        return tdee;
    }
  };

  const targetCalories = getTargetCalories();

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Calculator */}
      <section className="space-y-6">
        {/* Gender */}
        <div className="border border-gray-200 shadow-sm grid grid-cols-2">
          <button
            type="button"
            className={`py-3 text-center font-medium transition ${
              gender === "male"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setGender("male")}
          >
            ♂ Laki-laki
          </button>
          <button
            type="button"
            className={`py-3 text-center font-medium transition ${
              gender === "female"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setGender("female")}
          >
            ♀ Perempuan
          </button>
        </div>

        {/* Height */}
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">Tinggi Badan (cm)</label>
          <input
            type="range"
            min={100}
            max={250}
            step={1}
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="w-full accent-blue-600"
          />
          <input
            type="number"
            min={100}
            max={250}
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value) || 170)}
            className="w-full border border-gray-200 p-2 text-center"
          />
        </div>

        {/* Weight & Age */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Berat Badan (kg)",
              value: weight,
              setter: setWeight,
              min: 20,
              max: 300,
            },
            {
              label: "Usia (tahun)",
              value: age,
              setter: setAge,
              min: 1,
              max: 120,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-gray-200 shadow-sm p-4 space-y-2"
            >
              <label className="block text-gray-700 font-medium">
                {item.label}
              </label>
              <div className="flex justify-between items-center gap-2">
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-100 border hover:bg-gray-200"
                  onClick={() =>
                    item.setter(Math.max(item.min, item.value - 1))
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  min={item.min}
                  max={item.max}
                  value={item.value}
                  onChange={(e) =>
                    item.setter(parseInt(e.target.value) || item.min)
                  }
                  className="w-full border border-gray-200 p-1 text-center"
                />
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-100 border hover:bg-gray-200"
                  onClick={() =>
                    item.setter(Math.min(item.max, item.value + 1))
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Level */}
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block text-gray-700 font-medium">
            Tingkat Aktivitas Fisik
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full border border-gray-200 p-2"
          >
            {activityLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Goal */}
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block text-gray-700 font-medium">Tujuan Anda</label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "lose", label: "Turun BB" },
                { id: "maintain", label: "Pertahankan" },
                { id: "gain", label: "Naik BB" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`py-2 text-sm font-medium rounded transition ${
                  goal === opt.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setGoal(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Hitung Kebutuhan Kalori
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 bg-gray-100 text-gray-800 py-3 font-semibold hover:bg-gray-200 transition shadow-sm"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {bmr !== null && tdee !== null && targetCalories !== null && (
          <div className="border border-gray-200 shadow-sm p-6 mt-4 bg-blue-50 text-blue-800 space-y-4">
            <h3 className="font-bold text-lg">Apa yang Harus Anda Lakukan?</h3>

            <div className="space-y-3 text-sm">
              <p>
                🔹{" "}
                <strong>
                  Kebutuhan dasar tubuh Anda saat tidur/istirahat:
                </strong>{" "}
                {bmr} kkal/hari.
              </p>
              <p>
                🔹{" "}
                <strong>
                  Kebutuhan kalori harian Anda (termasuk aktivitas):
                </strong>{" "}
                {tdee} kkal/hari.
              </p>
              <p>
                🔹{" "}
                <strong>
                  Target kalori harian untuk{" "}
                  {goal === "lose"
                    ? "menurunkan berat badan"
                    : goal === "gain"
                    ? "menambah berat badan"
                    : "mempertahankan berat badan"}
                  :
                </strong>{" "}
                <span className="font-bold">{targetCalories} kkal/hari</span>.
              </p>
            </div>

            {/* Tips Aksi Nyata */}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="font-semibold mb-2">Tips Praktis untuk Anda:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>
                  Minum air putih minimal <strong>8 gelas (2 liter)</strong> per
                  hari — metabolisme butuh air!
                </li>
                <li>
                  Makan dalam porsi kecil tapi sering (3x makan utama + 2x
                  camilan sehat).
                </li>
                <li>
                  Pastikan setiap makan mengandung: <strong>protein</strong>{" "}
                  (telur, ayam, tahu), <strong>serat</strong> (sayur, buah), dan{" "}
                  <strong>karbohidrat kompleks</strong> (nasi merah, oat).
                </li>
                {goal === "lose" && (
                  <>
                    <li>
                      Hindari minuman manis, gorengan, dan camilan tinggi gula.
                    </li>
                    <li>
                      Tambah jalan kaki 30 menit/hari — bisa bakar 150–200 kkal!
                    </li>
                  </>
                )}
                {goal === "gain" && (
                  <>
                    <li>
                      Tambah asupan protein (susu, telur, dada ayam) dan kalori
                      sehat (kacang, alpukat, minyak zaitun).
                    </li>
                    <li>
                      Latihan beban 2–3x/minggu agar berat yang naik adalah
                      otot, bukan lemak.
                    </li>
                  </>
                )}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setBmr(null);
                setTdee(null);
              }}
              className="mt-4 bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Hitung Ulang
            </button>
          </div>
        )}
      </section>

      {/* Right Column: Info */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Apa Itu BMR & TDEE?</h2>
        <p className="text-gray-700">
          <strong>BMR</strong> = Kalori yang dibakar tubuh saat Anda tidur atau
          duduk diam. Ini adalah "biaya hidup" tubuh Anda.
        </p>
        <p className="text-gray-700">
          <strong>TDEE</strong> = Total kalori yang Anda bakar dalam sehari,
          termasuk jalan, kerja, olahraga, dll.
        </p>
        <p className="text-gray-700">
          Dengan tahu TDEE, Anda bisa atur makan agar:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>Turun berat:</strong> makan di bawah TDEE
          </li>
          <li>
            <strong>Naik berat:</strong> makan di atas TDEE
          </li>
          <li>
            <strong>Pertahankan:</strong> makan sesuai TDEE
          </li>
        </ul>
        <p className="text-gray-700 text-sm italic">
          ⚠️ Jangan makan di bawah 1200 kkal/hari tanpa pengawasan dokter — bisa
          bahaya!
        </p>
        <div className="flex justify-center mt-4">
          <img
            src="https://png.pngtree.com/png-vector/20230525/ourmid/pngtree-metabolic-process-of-woman-on-diet-landing-element-diet-vector-png-image_52215910.jpg"
            className="w-3/4 h-auto object-contain"
          />
        </div>
      </section>
    </main>
  );
}
