/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function BloodGlucoseCalc() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(180); // cm
  const [weight, setWeight] = useState(75);
  const [age, setAge] = useState(24);
  const [risk, setRisk] = useState<string | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Kurus";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Gemuk";
    return "Obesitas";
  };

  const calculateRisk = (e?: React.FormEvent) => {
    e?.preventDefault();

    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(Math.round(calculatedBMI * 10) / 10);

    let score = 0;
    if (age > 45) score += 2;
    else if (age >= 35) score += 1;

    if (weight > 80) score += 2;
    else if (weight >= 70) score += 1;

    if (score <= 2) setRisk("Rendah");
    else if (score <= 4) setRisk("Sedang");
    else setRisk("Tinggi");
  };

  const resetForm = () => {
    setGender("male");
    setHeight(180);
    setWeight(75);
    setAge(24);
    setRisk(null);
    setBmi(null);
  };

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
            ♂ Pria
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
            ♀ Wanita
          </button>
        </div>

        {/* Height */}
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">Tinggi (cm)</label>
          <input
            type="range"
            min={150}
            max={210}
            step={1}
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="w-full accent-blue-600"
          />
          <input
            type="number"
            min={150}
            max={210}
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="w-full border border-gray-200 p-2 text-center"
          />
        </div>

        {/* Weight & Age */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Berat (kg)",
              value: weight,
              setter: setWeight,
              min: 30,
              max: 200,
            },
            { label: "Usia", value: age, setter: setAge, min: 1, max: 120 },
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
                  onClick={() => item.setter(item.value - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  min={item.min}
                  max={item.max}
                  value={item.value}
                  onChange={(e) => item.setter(parseInt(e.target.value))}
                  className="w-full border border-gray-200 p-1 text-center"
                />
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-100 border hover:bg-gray-200"
                  onClick={() => item.setter(item.value + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={calculateRisk}
            className="flex-1 bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Hitung Risiko
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
        {risk && bmi && (
          <div className="border border-gray-200 shadow-sm p-6 mt-4 bg-green-50 text-green-800">
            <h3 className="font-bold text-lg mb-2">Hasil Risiko</h3>
            <p className="text-xl font-semibold">{risk}</p>
            <p className="mt-2">
              BMI: <strong>{bmi}</strong> ({getBMICategory(bmi)})
            </p>
            <button
              type="button"
              onClick={() => setRisk(null)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Hitung Lagi
            </button>
          </div>
        )}
      </section>

      {/* Right Column: Info / Doodle */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Tentang BMI</h2>
        <p className="text-gray-700">
          BMI (Body Mass Index) digunakan untuk mengukur apakah berat badan Anda
          proporsional dengan tinggi badan.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>Kurus:</strong> BMI &lt; 18.5
          </li>
          <li>
            <strong>Normal:</strong> BMI 18.5 - 24.9
          </li>
          <li>
            <strong>Gemuk:</strong> BMI 25 - 29.9
          </li>
          <li>
            <strong>Obesitas:</strong> BMI ≥ 30
          </li>
        </ul>
        <p className="text-gray-700">
          Gunakan kalkulator di kiri untuk menghitung BMI dan risiko Anda
          berdasarkan usia, berat, dan tinggi badan.
        </p>
        <div className="flex justify-center mt-4">
          <img
            src="https://img.freepik.com/vektor-premium/indeks-massa-tubuh-konsep-penurunan-berat-badan-skala-bmi-sebelum-dan-sesudah-diet-dan-kebugaran-gaya-hidup-sehat-ilustrasi-vektor_476325-1424.jpg"
            alt="BMI Illustration"
            className="w-3/4 h-auto"
          />
        </div>
      </section>
    </main>
  );
}
