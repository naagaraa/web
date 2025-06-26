"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const translations = {
  en: {
    title: "Calorie Calculator",
    description: "Calculate your daily calorie needs and track your intake.",
    age: "Age",
    weight: "Weight (kg)",
    height: "Height (cm)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    activity: "Activity Level",
    sedentary: "Sedentary (little to no exercise)",
    light: "Light (1–3 days/week)",
    moderate: "Moderate (3–5 days/week)",
    active: "Active (6–7 days/week)",
    very_active: "Very Active (physical job + exercise)",
    calculate: "Calculate",
    result: "Estimated daily calorie needs:",
    kcal: "kcal",
    language: "Language",
  },
  id: {
    title: "Kalkulator Kalori",
    description: "Hitung kebutuhan kalori harian dan pantau asupan Anda.",
    age: "Usia",
    weight: "Berat Badan (kg)",
    height: "Tinggi Badan (cm)",
    gender: "Jenis Kelamin",
    male: "Laki-laki",
    female: "Perempuan",
    activity: "Tingkat Aktivitas",
    sedentary: "Duduk (tidak berolahraga)",
    light: "Ringan (1–3 hari/minggu)",
    moderate: "Sedang (3–5 hari/minggu)",
    active: "Aktif (6–7 hari/minggu)",
    very_active: "Sangat Aktif (kerja fisik + olahraga)",
    calculate: "Hitung",
    result: "Perkiraan kebutuhan kalori harian:",
    kcal: "kkal",
    language: "Bahasa",
  },
};

type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export default function Page() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const t = translations[locale];
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();

    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const dailyCalories = bmr * activityMultipliers[activityLevel];
    setCalories(Math.round(dailyCalories));
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4 mt-24 sm:mt-24">
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

      <form onSubmit={calculateCalories} className="grid gap-4">
        <div className="flex flex-col">
          <label htmlFor="age" className="mb-1 text-sm font-medium">
            {t.age}
          </label>
          <input
            id="age"
            type="number"
            min="1"
            max="120"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="weight" className="mb-1 text-sm font-medium">
            {t.weight}
          </label>
          <input
            id="weight"
            type="number"
            min="1"
            step="0.1"
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
            min="1"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            required
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
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
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="activity" className="mb-1 text-sm font-medium">
            {t.activity}
          </label>
          <select
            id="activity"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="sedentary">{t.sedentary}</option>
            <option value="light">{t.light}</option>
            <option value="moderate">{t.moderate}</option>
            <option value="active">{t.active}</option>
            <option value="very_active">{t.very_active}</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors w-full"
        >
          {t.calculate}
        </button>
      </form>

      {calories && (
        <div className="p-4 bg-green-100 text-green-800 rounded text-center">
          {t.result} <strong>{calories}</strong> {t.kcal}
        </div>
      )}
    </main>
  );
}
