"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const t = {
  en: {
    title: "Pregnancy Calculator",
    description:
      "Estimate pregnancy week and due date based on LMP (Last Menstrual Period).",
    lmp: "First day of last menstrual period (LMP)",
    calculate: "Calculate",
    result: "Results",
    pregnancyAge: "Pregnancy Age",
    dueDate: "Estimated Due Date",
    weeks: "weeks",
    days: "days",
    language: "Language",
  },
  id: {
    title: "Kalkulator Kehamilan",
    description:
      "Hitung usia kehamilan dan HPL berdasarkan HPHT (Hari Pertama Haid Terakhir).",
    lmp: "Tanggal HPHT (Hari Pertama Haid Terakhir)",
    calculate: "Hitung",
    result: "Hasil",
    pregnancyAge: "Usia Kehamilan",
    dueDate: "Perkiraan Tanggal Persalinan (HPL)",
    weeks: "minggu",
    days: "hari",
    language: "Bahasa",
  },
};

export default function PregnancyCalc() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const tr = t[locale];

  const [lmpDate, setLmpDate] = useState("");
  const [result, setResult] = useState<null | {
    pregnancyWeeks: number;
    pregnancyDays: number;
    dueDate: string;
  }>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lmpDate) return;

    const lmp = new Date(lmpDate);
    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const pregnancyWeeks = Math.floor(diffDays / 7);
    const pregnancyDays = diffDays % 7;

    const due = new Date(lmp);
    due.setDate(due.getDate() + 280); // HPL = HPHT + 280 hari

    setResult({
      pregnancyWeeks,
      pregnancyDays,
      dueDate: due.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
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

      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label htmlFor="lmp" className="block text-sm font-medium mb-1">
            {tr.lmp}
          </label>
          <input
            id="lmp"
            type="date"
            value={lmpDate}
            onChange={(e) => setLmpDate(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {tr.calculate}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-green-100 rounded text-green-800">
          <h2 className="font-semibold mb-2">{tr.result}</h2>
          <p>
            {tr.pregnancyAge}:{" "}
            <strong>
              {result.pregnancyWeeks} {tr.weeks}, {result.pregnancyDays}{" "}
              {tr.days}
            </strong>
          </p>
          <p>
            {tr.dueDate}: <strong>{result.dueDate}</strong>
          </p>
        </div>
      )}
    </main>
  );
}
