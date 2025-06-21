"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const t = {
  en: {
    title: "Vitamin & Supplement Calculator",
    description:
      "Estimate your daily vitamin and mineral needs based on age, gender, and health conditions.",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    condition: "Special Condition",
    none: "None",
    pregnant: "Pregnant",
    breastfeeding: "Breastfeeding",
    vegan: "Vegan",
    smoker: "Smoker",
    calculate: "Calculate",
    result: "Suggested Daily Intake (RDA)",
    language: "Language",
  },
  id: {
    title: "Kalkulator Vitamin & Suplemen",
    description:
      "Perkirakan kebutuhan harian vitamin dan mineral berdasarkan usia, jenis kelamin, dan kondisi tertentu.",
    age: "Usia",
    gender: "Jenis Kelamin",
    male: "Laki-laki",
    female: "Perempuan",
    condition: "Kondisi Khusus",
    none: "Tidak Ada",
    pregnant: "Hamil",
    breastfeeding: "Menyusui",
    vegan: "Vegan",
    smoker: "Perokok",
    calculate: "Hitung",
    result: "Asupan Harian yang Disarankan (AKG)",
    language: "Bahasa",
  },
};

const baseRDA = {
  vitaminC: { male: 90, female: 75 }, // mg
  iron: { male: 8, female: 18 }, // mg
  calcium: 1000, // mg
  vitaminD: 600, // IU
  b12: 2.4, // µg
};

export default function VitaminCalculator() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const tr = t[locale];

  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [condition, setCondition] = useState("none");
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calculateRDA = (e: React.FormEvent) => {
    e.preventDefault();

    const rda = {
      vitaminC: baseRDA.vitaminC[gender],
      iron: baseRDA.iron[gender],
      calcium: baseRDA.calcium,
      vitaminD: baseRDA.vitaminD,
      b12: baseRDA.b12,
    };

    // Adjust based on condition
    if (condition === "pregnant") {
      rda.iron += 9;
      rda.vitaminC += 10;
      rda.b12 += 0.4;
    }
    if (condition === "breastfeeding") {
      rda.iron -= 1;
      rda.vitaminC += 15;
      rda.b12 += 0.6;
    }
    if (condition === "vegan") {
      rda.b12 += 1;
    }
    if (condition === "smoker") {
      rda.vitaminC += 35;
    }

    setResult(rda);
  };

  return (
    <main className="max-w-xl mx-auto p-4 mt-24 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">{tr.title}</h1>
        <p className="text-gray-600 text-sm">{tr.description}</p>
      </header>

      <div className="flex justify-end gap-2">
        <label className="text-sm">{tr.language}</label>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as "en" | "id")}
          className="border p-1 rounded text-sm"
        >
          <option value="en">EN</option>
          <option value="id">ID</option>
        </select>
      </div>

      <form onSubmit={calculateRDA} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">{tr.age}</label>
          <input
            type="number"
            min="1"
            max="120"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{tr.gender}</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full border rounded p-2"
          >
            <option value="male">{tr.male}</option>
            <option value="female">{tr.female}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">{tr.condition}</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="none">{tr.none}</option>
            <option value="pregnant">{tr.pregnant}</option>
            <option value="breastfeeding">{tr.breastfeeding}</option>
            <option value="vegan">{tr.vegan}</option>
            <option value="smoker">{tr.smoker}</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {tr.calculate}
        </button>
      </form>

      {result && (
        <div className="bg-green-100 p-4 rounded space-y-2">
          <h2 className="font-semibold">{tr.result}</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Vitamin C: {result.vitaminC} mg</li>
            <li>Iron: {result.iron} mg</li>
            <li>Calcium: {result.calcium} mg</li>
            <li>Vitamin D: {result.vitaminD} IU</li>
            <li>Vitamin B12: {result.b12.toFixed(1)} µg</li>
          </ul>
        </div>
      )}
    </main>
  );
}
