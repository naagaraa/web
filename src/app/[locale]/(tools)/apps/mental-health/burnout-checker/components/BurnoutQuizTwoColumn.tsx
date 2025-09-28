"use client";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionIllustration from "./QuestionIllustration";
import ResultDashboard from "./ResultDashboard";
import OnboardingStepper from "@/src/components/Onboarding";

const burnoutQuestions = [
  "Merasa lelah secara emosional karena pekerjaan",
  "Merasa tidak termotivasi atau kehilangan semangat kerja",
  "Merasa pekerjaan membebani terlalu banyak waktu dan energi",
  "Merasa jarang mendapatkan dukungan dari rekan kerja",
  "Merasa kurang prestasi atau produktivitas menurun",
  "Sering merasa sinis atau negatif terhadap pekerjaan",
  "Sulit memisahkan pekerjaan dan kehidupan pribadi",
];

const burnoutExplanations = [
  "Energi emosional menurun, sering lelah.",
  "Motivasi kerja berkurang, merasa kehilangan semangat.",
  "Beban kerja terasa berat dan menguras tenaga.",
  "Kurangnya dukungan sosial di tempat kerja.",
  "Prestasi terasa menurun, kurang produktif.",
  "Muncul sikap sinis terhadap pekerjaan.",
  "Kesulitan menjaga keseimbangan kerja & kehidupan pribadi.",
];

const burnoutOptions = [
  { label: "Tidak pernah", value: 0 },
  { label: "Jarang", value: 1 },
  { label: "Kadang-kadang", value: 2 },
  { label: "Sering", value: 3 },
];

export default function BurnoutQuizTwoColumn() {
  const [answers, setAnswers] = useState<number[]>(
    Array(burnoutQuestions.length).fill(-1)
  );
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [onboarding, setOnboarding] = useState(true);

  const handleSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (current < burnoutQuestions.length - 1) setCurrent(current + 1);
      else setSubmitted(true);
    }, 200);
  };

  const burnoutSteps = [
    {
      title: "Selamat datang",
      description: "Cek tingkat burnout Anda dengan singkat dan mudah.",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-mental-health-problems_23-2149092122.jpg",
    },
    {
      title: "Cara penggunaan",
      description:
        "Jawablah pertanyaan dengan jujur. Ketuk kotak jawaban sesuai kondisi Anda.",
      image:
        "https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148892434.jpg",
    },
    {
      title: "Mulai cek",
      description: "Tekan Mulai untuk memulai pemeriksaan burnout Anda.",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg",
    },
  ];

  if (onboarding) {
    return (
      <OnboardingStepper
        steps={burnoutSteps}
        onFinish={() => setOnboarding(false)}
      />
    );
  }

  if (submitted) {
    return (
      <ResultDashboard
        answers={answers}
        onRestart={() => {
          setAnswers(Array(burnoutQuestions.length).fill(-1));
          setCurrent(0);
          setSubmitted(false);
          setOnboarding(true);
        }}
      />
    );
  }

  const progress = ((current + 1) / burnoutQuestions.length) * 100;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="w-full h-3 bg-gray-200 mb-6">
          <div
            className="h-3 bg-yellow-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <QuestionCard
          question={burnoutQuestions[current]}
          options={burnoutOptions}
          selected={answers[current]}
          onSelect={handleSelect}
        />

        <div className="mt-4 p-4 bg-gray-50 border shadow-sm">
          <p className="text-gray-700">{burnoutExplanations[current]}</p>
        </div>

        <p className="text-sm text-gray-600 mt-2 text-center">
          Pertanyaan {current + 1} dari {burnoutQuestions.length}
        </p>
      </div>

      <QuestionIllustration questionIndex={current} />
    </div>
  );
}
