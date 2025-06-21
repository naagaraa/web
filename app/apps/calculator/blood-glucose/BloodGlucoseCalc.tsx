"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const t = {
  en: {
    title: "Diabetes Risk Calculator",
    description:
      "Estimate your risk of type 2 diabetes based on your age, weight, activity, and family history.",
    age: "Age",
    weight: "Weight (kg)",
    familyHistory: "Family history of diabetes",
    physicalActivity: "Physically active (3+ times/week)",
    yes: "Yes",
    no: "No",
    calculate: "Calculate",
    result: "Your estimated diabetes risk is:",
    low: "Low",
    moderate: "Moderate",
    high: "High",
    language: "Language",
  },
  id: {
    title: "Kalkulator Risiko Diabetes",
    description:
      "Perkirakan risiko diabetes tipe 2 berdasarkan usia, berat badan, aktivitas, dan riwayat keluarga.",
    age: "Usia",
    weight: "Berat Badan (kg)",
    familyHistory: "Riwayat keluarga dengan diabetes",
    physicalActivity: "Aktif secara fisik (3+ kali/minggu)",
    yes: "Ya",
    no: "Tidak",
    calculate: "Hitung",
    result: "Perkiraan risiko diabetes Anda:",
    low: "Rendah",
    moderate: "Sedang",
    high: "Tinggi",
    language: "Bahasa",
  },
};

export default function BloodGlucoseCalc() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const tr = t[locale];

  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [familyHistory, setFamilyHistory] = useState("no");
  const [physicalActivity, setPhysicalActivity] = useState("yes");
  const [risk, setRisk] = useState<string | null>(null);

  const calculateRisk = (e: React.FormEvent) => {
    e.preventDefault();

    let score = 0;
    if (age > 45) score += 2;
    else if (age >= 35) score += 1;

    if (weight > 80) score += 2;
    else if (weight >= 70) score += 1;

    if (familyHistory === "yes") score += 2;
    if (physicalActivity === "no") score += 1;

    if (score <= 2) setRisk(tr.low);
    else if (score <= 4) setRisk(tr.moderate);
    else setRisk(tr.high);
  };

  return (
    <main className="max-w-xl mx-auto p-4 mt-24 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">{tr.title}</h1>
        <p className="text-gray-600 text-sm">{tr.description}</p>
      </header>

      <div className="flex justify-end items-center gap-2">
        <label htmlFor="locale-select" className="text-sm">
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

      <form onSubmit={calculateRisk} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{tr.age}</label>
          <input
            type="number"
            min={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{tr.weight}</label>
          <input
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {tr.familyHistory}
          </label>
          <select
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="yes">{tr.yes}</option>
            <option value="no">{tr.no}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {tr.physicalActivity}
          </label>
          <select
            value={physicalActivity}
            onChange={(e) => setPhysicalActivity(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="yes">{tr.yes}</option>
            <option value="no">{tr.no}</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {tr.calculate}
        </button>
      </form>

      {risk && (
        <div className="bg-green-100 text-green-800 p-4 rounded text-center mt-4">
          <strong>
            {tr.result} {risk}
          </strong>
        </div>
      )}
    </main>
  );
}
