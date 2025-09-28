"use client";

import { useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionIllustration from "./QuestionIllustration";
import ResultDashboard from "./Result";
import OnboardingStepper from "../../../../../../../components/Onboarding";

const questions = [
  "Merasa gugup, cemas, atau tegang",
  "Tidak bisa menghentikan atau mengendalikan kekhawatiran",
  "Terlalu banyak khawatir tentang berbagai hal",
  "Sulit untuk rileks",
  "Terasa gelisah sehingga sulit untuk duduk tenang",
  "Mudah marah atau tersinggung",
  "Merasa takut seolah sesuatu yang buruk akan terjadi",
];

const explanations = [
  "Perasaan gelisah yang sering muncul.",
  "Kesulitan untuk berhenti khawatir.",
  "Khawatir berlebihan terkait banyak hal.",
  "Merasa tegang atau sulit santai.",
  "Badan terasa gelisah, ingin bergerak terus.",
  "Mudah tersinggung atau jengkel.",
  "Perasaan takut berlebihan terhadap masa depan.",
];

const options = [
  { label: "Tidak sama sekali", value: 0 },
  { label: "Beberapa hari", value: 1 },
  { label: "Lebih dari setengah hari", value: 2 },
  { label: "Hampir setiap hari", value: 3 },
];

export default function AnxietyQuizTwoColumn() {
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [onboarding, setOnboarding] = useState(true);

  const handleSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (current < questions.length - 1) setCurrent(current + 1);
      else setSubmitted(true);
    }, 200);
  };

  const anxietySteps = [
    {
      title: "Selamat datang",
      description: "Cek tingkat kecemasan dengan GAD-7",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-mental-health-problems_23-2149092122.jpg",
    },
    {
      title: "Cara penggunaan",
      description: "Jawab pertanyaan dengan jujur. Ketuk kotak jawaban.",
      image:
        "https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148892434.jpg",
    },
    {
      title: "Mulai cek",
      description: "Tekan Mulai untuk memulai pemeriksaan.",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg",
    },
  ];

  // ✅ Conditional rendering Onboarding
  if (onboarding) {
    return (
      <OnboardingStepper
        steps={anxietySteps}
        onFinish={() => setOnboarding(false)}
      />
    );
  }

  // ✅ Conditional rendering Result
  if (submitted) {
    return (
      <ResultDashboard
        answers={answers}
        onRestart={() => {
          setAnswers(Array(questions.length).fill(-1));
          setCurrent(0);
          setSubmitted(false);
        }}
      />
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Quiz column */}
      <div>
        <div className="w-full h-3 bg-gray-200 mb-6">
          <div
            className="h-3 bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <QuestionCard
          question={questions[current]}
          options={options}
          selected={answers[current]}
          onSelect={handleSelect}
        />

        <div className="mt-4 p-4 bg-gray-50 border shadow-sm">
          <p className="text-gray-700">{explanations[current]}</p>
        </div>

        <p className="text-sm text-gray-600 mt-2 text-center">
          Pertanyaan {current + 1} dari {questions.length}
        </p>
      </div>

      {/* Illustration column */}
      <QuestionIllustration questionIndex={current} />
    </div>
  );
}
