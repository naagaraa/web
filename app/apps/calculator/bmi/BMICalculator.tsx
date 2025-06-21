"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const translations = {
  en: {
    title: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) to check if your weight is ideal.",
    weight: "Weight (kg)",
    height: "Height (cm)",
    calculate: "Calculate BMI",
    result: "Your BMI is",
    category: "Category",
    underweight: "Underweight",
    normal: "Normal weight",
    overweight: "Overweight",
    obese: "Obese",
    language: "Language",
  },
  id: {
    title: "Kalkulator BMI",
    description:
      "Hitung Indeks Massa Tubuh (BMI) Anda untuk mengetahui apakah berat Anda ideal.",
    weight: "Berat Badan (kg)",
    height: "Tinggi Badan (cm)",
    calculate: "Hitung BMI",
    result: "BMI Anda adalah",
    category: "Kategori",
    underweight: "Kurus",
    normal: "Berat Normal",
    overweight: "Berat Lebih",
    obese: "Obesitas",
    language: "Bahasa",
  },
};

function getBMICategory(bmi: number, locale: "en" | "id") {
  if (bmi < 18.5) return translations[locale].underweight;
  if (bmi < 25) return translations[locale].normal;
  if (bmi < 30) return translations[locale].overweight;
  return translations[locale].obese;
}

export default function BMICalculator() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const t = translations[locale];

  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(Math.round(calculatedBMI * 10) / 10);
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4 mt-24">
      <header className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          {t.title}
        </h1>
        <p className="text-gray-600 text-sm text-center sm:text-left">
          {t.description}
        </p>
      </header>

      <div className="flex justify-end items-center mb-4">
        <label htmlFor="locale-select" className="text-sm font-medium mr-2">
          {t.language}
        </label>
        <select
          id="locale-select"
          value={locale}
          onChange={(e) => setLocale(e.target.value as "en" | "id")}
          className="border rounded p-1 text-sm"
        >
          <option value="en">EN</option>
          <option value="id">ID</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex flex-col">
          <label htmlFor="weight" className="mb-1 text-sm font-medium">
            {t.weight}
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            required
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="height" className="mb-1 text-sm font-medium">
            {t.height}
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            required
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors w-full"
        >
          {t.calculate}
        </button>
      </form>

      {bmi && (
        <div className="p-4 bg-green-100 text-green-800 rounded text-center">
          {t.result}: <strong>{bmi}</strong> <br />
          {t.category}: <strong>{getBMICategory(bmi, locale)}</strong>
        </div>
      )}
    </main>
  );
}
