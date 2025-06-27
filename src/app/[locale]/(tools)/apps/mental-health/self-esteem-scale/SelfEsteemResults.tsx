"use client";

import React from "react";

export function SelfEsteemResults({
  answers,
  questions,
  onReset,
}: {
  answers: { [key: number]: number };
  questions: { id: number; text: string; reverse: boolean }[];
  onReset: () => void;
}) {
  const totalScore = questions.reduce((acc, q) => {
    const answer = answers[q.id];
    return acc + (q.reverse ? 5 - answer : answer);
  }, 0);

  const interpretation =
    totalScore >= 25
      ? "Harga diri Anda termasuk dalam kategori *tinggi*. Ini menandakan sikap positif terhadap diri sendiri."
      : totalScore >= 15
      ? "Harga diri Anda *sedang*. Ada kemungkinan keraguan atau fluktuasi penilaian terhadap diri sendiri."
      : "Harga diri Anda *rendah*. Sebaiknya pertimbangkan untuk berbicara dengan profesional atau konselor.";

  return (
    <div className="bg-white rounded shadow p-6 space-y-4 text-center">
      <h2 className="text-xl font-semibold">Hasil Tes Self-Esteem Anda</h2>
      <p className="text-4xl font-bold">{totalScore} / 40</p>
      <p className="text-gray-700">{interpretation}</p>

      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Ulangi Tes
      </button>
    </div>
  );
}
