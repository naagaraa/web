"use client";

import React, { useState } from "react";
import { BurnoutResults } from "./BurnoutResults";
import Link from "next/link";

const questions = [
  {
    id: 1,
    text: "Saya merasa lelah secara emosional dari pekerjaan saya.",
    category: "EE",
  },
  {
    id: 2,
    text: "Saya merasa kehabisan tenaga di akhir hari kerja.",
    category: "EE",
  },
  {
    id: 3,
    text: "Saya merasa lelah saat bangun pagi untuk bekerja.",
    category: "EE",
  },
  {
    id: 4,
    text: "Bekerja seharian penuh sangat menguras tenaga.",
    category: "EE",
  },
  { id: 5, text: "Saya merasa burnout karena pekerjaan saya.", category: "EE" },
  {
    id: 6,
    text: "Saya merasa frustrasi dengan pekerjaan saya.",
    category: "EE",
  },
  { id: 7, text: "Saya merasa bekerja terlalu keras.", category: "EE" },
  {
    id: 8,
    text: "Berinteraksi dengan orang seharian sangat melelahkan.",
    category: "EE",
  },
  {
    id: 9,
    text: "Saya merasa berada di ujung batas kemampuan saya.",
    category: "EE",
  },
  {
    id: 10,
    text: "Saya merasa memperlakukan orang seperti objek.",
    category: "DP",
  },
  {
    id: 11,
    text: "Saya menjadi lebih kasar terhadap orang lain.",
    category: "DP",
  },
  {
    id: 12,
    text: "Saya khawatir pekerjaan ini mengeraskan perasaan saya.",
    category: "DP",
  },
  {
    id: 13,
    text: "Saya tidak terlalu peduli dengan apa yang terjadi pada orang lain.",
    category: "DP",
  },
  {
    id: 14,
    text: "Saya merasa orang menyalahkan saya atas masalah mereka.",
    category: "DP",
  },
  {
    id: 15,
    text: "Saya merasa memberi pengaruh positif pada orang lain.",
    category: "PA",
  },
  { id: 16, text: "Saya merasa sangat energik.", category: "PA" },
  {
    id: 17,
    text: "Saya bisa memahami perasaan orang lain dengan mudah.",
    category: "PA",
  },
  {
    id: 18,
    text: "Saya mampu menyelesaikan masalah secara efektif.",
    category: "PA",
  },
  {
    id: 19,
    text: "Saya merasa bahagia setelah bekerja dekat dengan orang lain.",
    category: "PA",
  },
  {
    id: 20,
    text: "Saya telah mencapai banyak hal berarti dalam pekerjaan.",
    category: "PA",
  },
  { id: 21, text: "Saya merasa segar setelah bekerja.", category: "PA" },
  {
    id: 22,
    text: "Saya menghadapi masalah emosional dengan tenang.",
    category: "PA",
  },
];

const scale = [
  "Tidak Pernah",
  "Beberapa kali setahun",
  "Sekali sebulan",
  "Beberapa kali sebulan",
  "Sekali seminggu",
  "Beberapa kali seminggu",
  "Setiap hari",
];

const QUESTIONS_PER_PAGE = 1;

export function BurnoutChecker() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setShowResult(true);
    } else {
      alert("Silakan isi semua pertanyaan terlebih dahulu.");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentPage(0);
    setShowResult(false);
  };

  const canGoNext =
    currentQuestions.every((q) => answers[q.id] !== undefined) &&
    currentPage < totalPages - 1;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Burnout Checker
        </h1>

        {!showResult ? (
          <>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentPage + 1) / totalPages) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Pertanyaan {startIndex + 1} dari {questions.length}
              </p>
            </div>

            {currentQuestions.map((q) => (
              <div key={q.id} className="border p-4 rounded-lg shadow-sm mb-6">
                <p className="mb-2 font-medium text-lg text-gray-800">
                  {q.id}. {q.text}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  {scale.map((label, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={i}
                        checked={answers[q.id] === i}
                        onChange={() => handleChange(q.id, i)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === 0}
              >
                Sebelumnya
              </button>

              {currentPage === totalPages - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lihat Hasil
                </button>
              ) : (
                <button
                  onClick={() =>
                    canGoNext
                      ? setCurrentPage((p) => p + 1)
                      : alert("Silakan jawab pertanyaan ini terlebih dahulu.")
                  }
                  className={`px-6 py-2 rounded ${
                    canGoNext
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Selanjutnya
                </button>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleReset}
                className="text-sm text-red-600 hover:underline"
              >
                Reset Tes
              </button>
            </div>
          </>
        ) : (
          <>
            <BurnoutResults answers={answers} questions={questions} />
            <div className="flex justify-center mt-6">
              <button
                onClick={handleReset}
                className="text-sm text-red-600 hover:underline"
              >
                Ulangi Tes
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
