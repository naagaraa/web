"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const translations = {
  en: {
    title: "Water Intake Calculator",
    description: "Calculate how much water you should drink daily.",
    weight: "Weight (kg)",
    activity: "Activity Level",
    low: "Low (little to no exercise)",
    moderate: "Moderate (some exercise)",
    high: "High (intense workouts or heat)",
    calculate: "Calculate Water Needs",
    result: "Recommended water intake:",
    liter: "liters/day",
    language: "Language",
  },
  id: {
    title: "Kalkulator Air Minum",
    description: "Hitung jumlah air minum harian yang Anda butuhkan.",
    weight: "Berat Badan (kg)",
    activity: "Tingkat Aktivitas",
    low: "Rendah (jarang berolahraga)",
    moderate: "Sedang (olahraga ringan)",
    high: "Tinggi (olahraga berat atau cuaca panas)",
    calculate: "Hitung Kebutuhan Air",
    result: "Kebutuhan air minum harian:",
    liter: "liter/hari",
    language: "Bahasa",
  },
};

type ActivityLevel = "low" | "moderate" | "high";

export default function WaterCalculator() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const t = translations[locale];

  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [waterNeed, setWaterNeed] = useState<number | null>(null);

  const calculateWater = (e: React.FormEvent) => {
    e.preventDefault();

    let multiplier = 0.033;
    if (activity === "moderate") multiplier = 0.04;
    else if (activity === "high") multiplier = 0.05;

    const result = weight * multiplier;
    setWaterNeed(Math.round(result * 100) / 100); // round to 2 decimal places
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

      <form onSubmit={calculateWater} className="grid gap-4">
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
          <label htmlFor="activity" className="mb-1 text-sm font-medium">
            {t.activity}
          </label>
          <select
            id="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value as ActivityLevel)}
            className="w-full border rounded p-2"
          >
            <option value="low">{t.low}</option>
            <option value="moderate">{t.moderate}</option>
            <option value="high">{t.high}</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors w-full"
        >
          {t.calculate}
        </button>
      </form>

      {waterNeed && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded text-center">
          {t.result} <strong>{waterNeed}</strong> {t.liter}
        </div>
      )}
    </main>
  );
}
