"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const translations = {
  en: {
    title: "BMR Calculator",
    description:
      "Calculate your Basal Metabolic Rate (BMR) – the number of calories your body burns at rest.",
    age: "Age",
    weight: "Weight (kg)",
    height: "Height (cm)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    calculate: "Calculate BMR",
    result: "Your BMR is",
    kcal: "kcal/day",
    language: "Language",
  },
  id: {
    title: "Kalkulator BMR",
    description:
      "Hitung Basal Metabolic Rate (BMR) Anda – jumlah kalori yang dibakar tubuh saat istirahat.",
    age: "Usia",
    weight: "Berat Badan (kg)",
    height: "Tinggi Badan (cm)",
    gender: "Jenis Kelamin",
    male: "Laki-laki",
    female: "Perempuan",
    calculate: "Hitung BMR",
    result: "BMR Anda adalah",
    kcal: "kkal/hari",
    language: "Bahasa",
  },
};

export default function BMRCalculator() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const t = translations[locale];

  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState("male");
  const [bmr, setBMR] = useState<number | null>(null);

  const calculateBMR = (e: React.FormEvent) => {
    e.preventDefault();

    let result = 0;
    if (gender === "male") {
      result = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      result = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    setBMR(Math.round(result));
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

      <form onSubmit={calculateBMR} className="grid gap-4">
        <div className="flex flex-col">
          <label htmlFor="age" className="mb-1 text-sm font-medium">
            {t.age}
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
            className="w-full border rounded p-2"
          />
        </div>

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
            className="w-full border rounded p-2"
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
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="mb-1 text-sm font-medium">
            {t.gender}
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors w-full"
        >
          {t.calculate}
        </button>
      </form>

      {bmr && (
        <div className="p-4 bg-green-100 text-green-800 rounded text-center">
          {t.result}: <strong>{bmr}</strong> {t.kcal}
        </div>
      )}
    </main>
  );
}
