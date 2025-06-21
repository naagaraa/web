"use client";

import React, { useState } from "react";
import { SelfEsteemResults } from "./SelfEsteemResults";

const questions = [
  {
    id: 1,
    text: "Saya merasa diri saya layak, setidaknya sama seperti orang lain.",
    reverse: false,
  },
  {
    id: 2,
    text: "Saya merasa saya memiliki sejumlah kualitas yang baik.",
    reverse: false,
  },
  {
    id: 3,
    text: "Secara umum, saya cenderung merasa seperti orang gagal.",
    reverse: true,
  },
  {
    id: 4,
    text: "Saya mampu melakukan banyak hal sebaik kebanyakan orang lain.",
    reverse: false,
  },
  {
    id: 5,
    text: "Saya merasa tidak banyak hal yang bisa saya banggakan.",
    reverse: true,
  },
  {
    id: 6,
    text: "Saya memiliki sikap positif terhadap diri saya sendiri.",
    reverse: false,
  },
  {
    id: 7,
    text: "Secara keseluruhan, saya merasa puas dengan diri saya.",
    reverse: false,
  },
  {
    id: 8,
    text: "Saya berharap bisa lebih menghargai diri saya.",
    reverse: true,
  },
  {
    id: 9,
    text: "Kadang saya merasa tidak berguna sama sekali.",
    reverse: true,
  },
  { id: 10, text: "Kadang saya merasa saya tidak berguna.", reverse: true },
];

const options = [
  "Sangat Tidak Setuju",
  "Tidak Setuju",
  "Setuju",
  "Sangat Setuju",
];

export function SelfEsteemScale() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const handleChange = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Harap jawab semua pertanyaan terlebih dahulu.");
      return;
    }
    setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6 mt-24">
      <h1 className="text-2xl font-bold text-center">Self-Esteem Scale</h1>

      {!showResult ? (
        <>
          {questions.map((q) => (
            <div key={q.id} className="border p-4 rounded shadow">
              <p className="font-medium mb-2">
                {q.id}. {q.text}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {options.map((opt, i) => (
                  <label key={i} className="text-sm flex items-center gap-1">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === i + 1}
                      onChange={() => handleChange(q.id, i + 1)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Lihat Hasil Skor
          </button>
        </>
      ) : (
        <SelfEsteemResults
          answers={answers}
          questions={questions}
          onReset={handleReset}
        />
      )}
    </main>
  );
}
