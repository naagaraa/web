"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const t = {
  en: {
    title: "Macronutrient Calculator",
    description:
      "Split your daily calorie intake into carbs, protein, and fat.",
    calories: "Daily Calories",
    carbs: "Carbs (%)",
    protein: "Protein (%)",
    fat: "Fat (%)",
    calculate: "Calculate",
    result: "Your daily macronutrient needs:",
    grams: "grams",
    language: "Language",
  },
  id: {
    title: "Kalkulator Nutrisi",
    description:
      "Bagi asupan kalori harian Anda menjadi karbohidrat, protein, dan lemak.",
    calories: "Kalori Harian",
    carbs: "Karbohidrat (%)",
    protein: "Protein (%)",
    fat: "Lemak (%)",
    calculate: "Hitung",
    result: "Kebutuhan makronutrien harian Anda:",
    grams: "gram",
    language: "Bahasa",
  },
};

export default function MacronutrientCalc() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const tr = t[locale];

  const [calories, setCalories] = useState(2000);
  const [carbs, setCarbs] = useState(50);
  const [protein, setProtein] = useState(20);
  const [fat, setFat] = useState(30);
  const [result, setResult] = useState<null | {
    carbs: number;
    protein: number;
    fat: number;
  }>(null);

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();

    const total = carbs + protein + fat;
    if (total !== 100) {
      alert("Total percentage must equal 100%");
      return;
    }

    const calsFromCarbs = (calories * carbs) / 100;
    const calsFromProtein = (calories * protein) / 100;
    const calsFromFat = (calories * fat) / 100;

    setResult({
      carbs: Math.round(calsFromCarbs / 4),
      protein: Math.round(calsFromProtein / 4),
      fat: Math.round(calsFromFat / 9),
    });
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4 mt-24">
      <header className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          {tr.title}
        </h1>
        <p className="text-gray-600 text-sm text-center sm:text-left">
          {tr.description}
        </p>
      </header>

      <div className="flex justify-end items-center mb-4">
        <label htmlFor="locale-select" className="text-sm font-medium mr-2">
          {tr.language}
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

      <form onSubmit={calculateMacros} className="grid gap-4">
        <div className="flex flex-col">
          <label htmlFor="calories" className="text-sm font-medium mb-1">
            {tr.calories}
          </label>
          <input
            id="calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            required
            className="border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">{tr.carbs}</label>
            <input
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(Number(e.target.value))}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">{tr.protein}</label>
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(Number(e.target.value))}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">{tr.fat}</label>
            <input
              type="number"
              value={fat}
              onChange={(e) => setFat(Number(e.target.value))}
              className="border p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
        >
          {tr.calculate}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-green-100 text-green-800 rounded text-center space-y-1">
          <p>{tr.result}</p>
          <p>
            {tr.carbs}: <strong>{result.carbs}</strong> {tr.grams}
          </p>
          <p>
            {tr.protein}: <strong>{result.protein}</strong> {tr.grams}
          </p>
          <p>
            {tr.fat}: <strong>{result.fat}</strong> {tr.grams}
          </p>
        </div>
      )}
    </main>
  );
}
