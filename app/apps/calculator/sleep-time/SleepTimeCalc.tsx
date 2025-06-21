"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const t = {
  en: {
    title: "Sleep Time Calculator",
    description:
      "Calculate when you should sleep or wake up based on 90-minute sleep cycles.",
    choose: "I want to...",
    sleepNow: "Sleep now",
    wakeUpAt: "Wake up at...",
    sleepAt: "Go to bed at...",
    time: "Time (HH:MM, 24h)",
    calculate: "Calculate",
    results: "You should aim to wake up at one of these times:",
    orGoToBed: "You should go to bed at one of these times:",
    language: "Language",
  },
  id: {
    title: "Kalkulator Waktu Tidur",
    description:
      "Hitung kapan harus tidur atau bangun berdasarkan siklus tidur 90 menit.",
    choose: "Saya ingin...",
    sleepNow: "Tidur sekarang",
    wakeUpAt: "Bangun pada...",
    sleepAt: "Tidur pada...",
    time: "Waktu (JJ:MM, 24 jam)",
    calculate: "Hitung",
    results: "Anda sebaiknya bangun pada salah satu waktu berikut:",
    orGoToBed: "Anda sebaiknya tidur pada salah satu waktu berikut:",
    language: "Bahasa",
  },
};

function formatTime(date: Date) {
  return date.toTimeString().slice(0, 5);
}

function addMinutes(base: Date, mins: number) {
  return new Date(base.getTime() + mins * 60_000);
}

export default function SleepTimeCalc() {
  const searchParams = useSearchParams();
  const initialLocale = searchParams.get("locale") === "id" ? "id" : "en";
  const [locale, setLocale] = useState<"en" | "id">(initialLocale);
  const tr = t[locale];

  const [mode, setMode] = useState<"now" | "wake" | "sleep">("now");
  const [customTime, setCustomTime] = useState("07:00");
  const [results, setResults] = useState<string[] | null>(null);

  const calculateTimes = (e: React.FormEvent) => {
    e.preventDefault();
    const cycles = [6, 5, 4, 3]; // number of 90-min cycles
    const buffer = 15; // minutes to fall asleep

    let base: Date;
    const now = new Date();

    if (mode === "now") {
      base = addMinutes(now, buffer);
      setResults(cycles.map((c) => formatTime(addMinutes(base, c * 90))));
    } else {
      const [hh, mm] = customTime.split(":").map(Number);
      base = new Date(now);
      base.setHours(hh);
      base.setMinutes(mm);
      base.setSeconds(0);
      base.setMilliseconds(0);

      if (mode === "wake") {
        setResults(
          cycles.map((c) =>
            formatTime(addMinutes(base, -1 * (c * 90 + buffer)))
          )
        );
      } else {
        setResults(cycles.map((c) => formatTime(addMinutes(base, c * 90))));
      }
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4 mt-24 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">{tr.title}</h1>
        <p className="text-gray-600 text-sm">{tr.description}</p>
      </header>

      <div className="flex justify-end gap-2">
        <label htmlFor="locale-select" className="text-sm">
          {tr.language}
        </label>
        <select
          id="locale-select"
          value={locale}
          onChange={(e) => setLocale(e.target.value as "en" | "id")}
          className="border p-1 rounded text-sm"
        >
          <option value="en">EN</option>
          <option value="id">ID</option>
        </select>
      </div>

      <form onSubmit={calculateTimes} className="space-y-4">
        <div>
          <label className="block font-medium text-sm mb-1">{tr.choose}</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="w-full border p-2 rounded"
          >
            <option value="now">{tr.sleepNow}</option>
            <option value="wake">{tr.wakeUpAt}</option>
            <option value="sleep">{tr.sleepAt}</option>
          </select>
        </div>

        {mode !== "now" && (
          <div>
            <label className="block text-sm mb-1">{tr.time}</label>
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {tr.calculate}
        </button>
      </form>

      {results && (
        <div className="bg-green-100 p-4 rounded text-center space-y-2">
          <p className="font-medium">
            {mode === "wake" ? tr.orGoToBed : tr.results}
          </p>
          <div className="flex justify-center flex-wrap gap-3 text-lg font-semibold">
            {results.map((time, i) => (
              <span key={i} className="bg-white px-3 py-1 rounded shadow">
                {time}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
