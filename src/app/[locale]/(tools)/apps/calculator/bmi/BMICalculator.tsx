/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function BMICalculator() {
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(70); // kg
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Kurus (Underweight)";
    if (bmi < 25) return "Normal (Healthy Weight)";
    if (bmi < 30) return "Gemuk (Overweight)";
    return "Obesitas (Obese)";
  };

  const calculateBMI = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (height <= 0 || weight <= 0) {
      setBmi(null);
      setCategory(null);
      return;
    }

    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(calculatedBMI * 10) / 10;

    setBmi(roundedBMI);
    setCategory(getBMICategory(roundedBMI));
  };

  const resetForm = () => {
    setHeight(170);
    setWeight(70);
    setBmi(null);
    setCategory(null);
  };

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Calculator */}
      <section className="space-y-6">
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

        {/* Weight */}
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block text-gray-700 font-medium">
            Berat Badan (kg)
          </label>
          <div className="flex justify-between items-center gap-2">
            <button
              type="button"
              className="w-8 h-8 bg-gray-100 border hover:bg-gray-200"
              onClick={() => setWeight(Math.max(20, weight - 1))}
            >
              -
            </button>
            <input
              type="number"
              min={20}
              max={300}
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value) || 70)}
              className="w-full border border-gray-200 p-1 text-center"
            />
            <button
              type="button"
              className="w-8 h-8 bg-gray-100 border hover:bg-gray-200"
              onClick={() => setWeight(weight + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={calculateBMI}
            className="flex-1 bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Hitung BMI
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
        {bmi !== null && category && (
          <div className="border border-gray-200 shadow-sm p-6 mt-4 bg-blue-50 text-blue-800">
            <h3 className="font-bold text-lg mb-2">Hasil BMI Anda</h3>
            <p className="text-2xl font-bold">{bmi}</p>
            <p className="mt-2">
              Kategori: <strong>{category}</strong>
            </p>
            <button
              type="button"
              onClick={() => {
                setBmi(null);
                setCategory(null);
              }}
              className="mt-4 bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Hitung Ulang
            </button>
          </div>
        )}
      </section>

      {/* Right Column: Info / Doodle */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Tentang BMI (Body Mass Index)
        </h2>
        <p className="text-gray-700">
          BMI adalah ukuran sederhana yang diperkenalkan oleh{" "}
          <strong>Adolphe Quetelet</strong>, seorang statistikawan Belgia, pada
          tahun 1830-an. Karena itu, BMI juga dikenal sebagai{" "}
          <em>Quetelet Index</em>.
        </p>
        <p className="text-gray-700">
          Pada abad ke-20, <strong>Organisasi Kesehatan Dunia (WHO)</strong>{" "}
          mengadopsi BMI sebagai standar internasional untuk mengklasifikasikan
          status gizi orang dewasa.
        </p>
        <p className="text-gray-700">
          Rumus BMI:
          <br />
          <code className="font-mono bg-gray-100 px-2 py-1 rounded">
            BMI = berat (kg) / [tinggi (m)]²
          </code>
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>Kurus (Underweight):</strong> BMI {"<"} 18.5
          </li>
          <li>
            <strong>Normal (Healthy Weight):</strong> BMI 18.5 – 24.9
          </li>
          <li>
            <strong>Gemuk (Overweight):</strong> BMI 25 – 29.9
          </li>
          <li>
            <strong>Obesitas (Obese):</strong> BMI ≥ 30
          </li>
        </ul>
        <p className="text-gray-700 text-sm italic">
          Catatan: BMI tidak membedakan antara massa otot, lemak, atau
          distribusi lemak tubuh. Oleh karena itu, hasilnya mungkin kurang
          akurat untuk atlet, lansia, atau wanita hamil.
        </p>
        <div className="flex justify-center mt-4">
          <img
            src="https://img.freepik.com/vektor-premium/indeks-massa-tubuh-konsep-penurunan-berat-badan-skala-bmi-sebelum-dan-sesudah-diet-dan-kebugaran-gaya-hidup-sehat-ilustrasi-vektor_476325-1424.jpg"
            alt="Ilustrasi BMI"
            className="w-3/4 h-auto object-contain"
          />
        </div>
      </section>
    </main>
  );
}
