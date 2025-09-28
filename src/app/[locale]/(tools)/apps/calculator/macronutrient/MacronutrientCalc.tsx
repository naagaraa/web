/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

// Opsi distribusi makro sesuai rekomendasi
const macroOptions = {
  general: {
    label: "Umum / sehat",
    carb: [0.45, 0.55],
    protein: [0.15, 0.25],
    fat: [0.25, 0.35],
  },
  fitness: {
    label: "Fitness (muscle gain)",
    carb: [0.4, 0.5],
    protein: [0.2, 0.3],
    fat: [0.2, 0.3],
  },
  lowcarb: {
    label: "Low carb / diabetes-friendly",
    carb: [0.3, 0.4],
    protein: [0.2, 0.3],
    fat: [0.3, 0.4],
  },
};

const COLORS = ["#4F46E5", "#16A34A", "#F59E0B"];

export default function MacronutrientCalc() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState<"maintain" | "lose" | "gain">("maintain");
  const [macroType, setMacroType] = useState<"general" | "fitness" | "lowcarb">(
    "general"
  );
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

    bmrValue = Math.max(800, bmrValue);

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
    setMacroType("general");
    setBmr(null);
    setTdee(null);
  };

  const getTargetCalories = () => {
    if (!tdee) return null;
    switch (goal) {
      case "lose":
        return Math.max(1200, tdee - 500);
      case "gain":
        return tdee + 300;
      default:
        return tdee;
    }
  };

  const targetCalories = getTargetCalories();

  const macros = targetCalories
    ? {
        carb: Math.round(
          (targetCalories *
            ((macroOptions[macroType].carb[0] +
              macroOptions[macroType].carb[1]) /
              2)) /
            4
        ),
        protein: Math.round(
          (targetCalories *
            ((macroOptions[macroType].protein[0] +
              macroOptions[macroType].protein[1]) /
              2)) /
            4
        ),
        fat: Math.round(
          (targetCalories *
            ((macroOptions[macroType].fat[0] + macroOptions[macroType].fat[1]) /
              2)) /
            9
        ),
      }
    : null;

  const chartData = macros
    ? [
        { name: "Karbohidrat", value: macros.carb },
        { name: "Protein", value: macros.protein },
        { name: "Lemak", value: macros.fat },
      ]
    : [];

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

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Tinggi Badan (cm)",
              value: height,
              setter: setHeight,
              min: 100,
              max: 250,
            },
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

        {/* Macro Type */}
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block text-gray-700 font-medium">
            Pilih Distribusi Makro
          </label>
          <select
            value={macroType}
            onChange={(e) => setMacroType(e.target.value as any)}
            className="w-full border border-gray-200 p-2"
          >
            {Object.entries(macroOptions).map(([id, opt]) => (
              <option key={id} value={id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Hitung
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
        {bmr !== null && tdee !== null && targetCalories !== null && macros && (
          <div className="border border-gray-200 shadow-sm p-6 mt-4 bg-blue-50 text-blue-800 space-y-4">
            <h3 className="font-bold text-lg">Hasil Perhitungan</h3>
            <p>
              BMR Anda: <strong>{bmr} kkal</strong>
            </p>
            <p>
              TDEE Anda: <strong>{tdee} kkal</strong>
            </p>
            <p>
              Target Kalori ({goal}): <strong>{targetCalories} kkal</strong>
            </p>

            <div className="mt-4">
              <h4 className="font-semibold">Rekomendasi Makronutrien:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>
                  Karbohidrat: <strong>{macros.carb} g</strong>
                </li>
                <li>
                  Protein: <strong>{macros.protein} g</strong>
                </li>
                <li>
                  Lemak: <strong>{macros.fat} g</strong>
                </li>
              </ul>
            </div>

            <div className="mt-6 h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}g`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <p className="text-sm italic text-gray-700">
              Grafik ini membantu Anda melihat perbandingan karbohidrat,
              protein, dan lemak sesuai kebutuhan harian.
            </p>
          </div>
        )}
      </section>

      {/* Right Column: Info */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Apa Itu Kalkulator Makronutrien?
        </h2>
        <p className="text-gray-700">
          Setelah menghitung BMR dan TDEE, kebutuhan kalori dibagi ke dalam
          makronutrien: karbohidrat, protein, dan lemak.
        </p>
        <p className="text-gray-700">
          Distribusi bisa berbeda tergantung tujuan dan kondisi:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>Umum/sehat:</strong> Karbo 45–55%, Protein 15–25%, Lemak
            25–35%
          </li>
          <li>
            <strong>Fitness:</strong> Karbo 40–50%, Protein 20–30%, Lemak 20–30%
          </li>
          <li>
            <strong>Low carb:</strong> Karbo 30–40%, Protein 20–30%, Lemak
            30–40%
          </li>
        </ul>
        <p className="text-gray-700 text-sm italic">
          ⚠️ Angka ini adalah estimasi. Untuk kondisi medis khusus,
          konsultasikan ke dokter gizi.
        </p>
      </section>
    </main>
  );
}
