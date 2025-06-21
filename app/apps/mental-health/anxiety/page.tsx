"use client";

import React, { useState } from "react";

const questions = [
  "Merasa gugup, cemas, atau tegang",
  "Tidak dapat menghentikan atau mengontrol kekhawatiran",
  "Terlalu mengkhawatirkan berbagai hal",
  "Kesulitan untuk rileks",
  "Menjadi gelisah sehingga sulit untuk duduk diam",
  "Cepat merasa jengkel atau mudah tersinggung",
  "Merasa seolah sesuatu buruk akan terjadi",
];

const options = [
  { label: "Tidak sama sekali", value: 0 },
  { label: "Beberapa hari", value: 1 },
  { label: "Lebih dari separuh hari", value: 2 },
  { label: "Hampir setiap hari", value: 3 },
];

export default function AnxietyTest() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(null));
  const [score, setScore] = useState<number | null>(null);

  const handleStart = () => {
    setStarted(true);
  };

  const handleChange = (value: number) => {
    const updated = [...answers];
    updated[currentStep] = value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[currentStep] === null) return;
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const total = answers.reduce((acc, cur) => acc + cur, 0);
    setScore(total);
  };

  const getResult = (score: number) => {
    if (score <= 4) return "Minimal kecemasan";
    if (score <= 9) return "Kecemasan ringan";
    if (score <= 14) return "Kecemasan sedang";
    return "Kecemasan berat";
  };

  if (!started) {
    return (
      <main className="max-w-xl mx-auto mt-24 p-6 text-center">
        <h1 className="text-xl font-bold mb-4">
          Tes Gangguan Kecemasan (GAD-7)
        </h1>
        <p className="mb-6">
          Silakan mulai tes dengan menekan tombol di bawah ini. Anda akan
          menjawab 7 pertanyaan tentang perasaan dalam 2 minggu terakhir.
        </p>
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Mulai Tes
        </button>
      </main>
    );
  }

  if (score !== null) {
    return (
      <main className="max-w-xl mx-auto mt-24 p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Hasil Tes</h2>
        <div className="p-6 bg-green-100 rounded">
          <p>
            Skor total: <strong>{score}</strong>
          </p>
          <p className="mt-2 font-medium">{getResult(score)}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto mt-24 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-center">
        Pertanyaan {currentStep + 1} dari {questions.length}
      </h2>

      <div className="border p-4 rounded shadow-sm">
        <p className="font-medium">{questions[currentStep]}</p>
        <div className="mt-4 space-y-2">
          {options.map((opt, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`q${currentStep}`}
                value={opt.value}
                checked={answers[currentStep] === opt.value}
                onChange={() => handleChange(opt.value)}
                className="cursor-pointer"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Kembali
        </button>

        {currentStep === questions.length - 1 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={answers[currentStep] === null}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Selesai
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={answers[currentStep] === null}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Selanjutnya
          </button>
        )}
      </div>
    </main>
  );
}
