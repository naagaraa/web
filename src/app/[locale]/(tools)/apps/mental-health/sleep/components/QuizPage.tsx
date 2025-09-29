"use client";

import { useState } from "react";
import QuestionIllustration from "./QuestionIllustration";
import ResultDashboard from "./ResultDashboard";
import QuestionCard from "../../anxiety/components/QuestionCard";
import OnboardingStepper from "@/src/components/Onboarding";

const questions = [
  "Kurang minat atau kesenangan dalam melakukan aktivitas sehari-hari",
  "Merasa sedih, murung, atau putus asa",
  "Kesulitan tidur atau tidur berlebihan",
  "Merasa lelah atau kurang energi",
  "Nafsu makan berkurang atau berlebihan",
  "Merasa buruk terhadap diri sendiri",
  "Kesulitan berkonsentrasi",
  "Melambat atau gelisah secara fisik",
  "Berpikir lebih baik kalau mati atau ingin menyakiti diri sendiri",
];

const explanations = [
  "Kurangnya minat atau kesenangan bisa menandakan gejala depresi.",
  "Perasaan sedih, murung, atau putus asa sering muncul pada depresi.",
  "Perubahan pola tidur bisa menjadi indikasi depresi.",
  "Merasa lelah atau lemah secara fisik atau mental.",
  "Perubahan nafsu makan dapat terkait depresi.",
  "Perasaan rendah diri atau bersalah berlebihan.",
  "Kesulitan fokus atau mengambil keputusan.",
  "Perubahan gerak fisik, lebih lambat atau gelisah.",
  "Pikiran tentang kematian atau menyakiti diri sendiri butuh perhatian profesional.",
];

const options = [
  { label: "Tidak sama sekali", value: 0 },
  { label: "Beberapa hari", value: 1 },
  { label: "Lebih dari setengah hari", value: 2 },
  { label: "Hampir setiap hari", value: 3 },
];

export default function QuizPage() {
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

  const depressionSteps = [
    {
      title: "Selamat datang",
      description: "Cek tingkat depresi Anda menggunakan PHQ-9.",
      image:
        "https://img.freepik.com/free-vector/world-mental-health-day-hand-drawn_23-2148657685.jpg",
    },
    {
      title: "Cara penggunaan",
      description:
        "Jawablah pertanyaan berdasarkan 2 minggu terakhir. Ketuk kotak jawaban sesuai perasaan Anda.",
      image:
        "https://img.freepik.com/free-vector/social-media-detox-concept_23-2148780238.jpg",
    },
    {
      title: "Mulai cek",
      description: "Tekan Mulai untuk memulai pemeriksaan depresi Anda.",
      image:
        "https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-solving-business-problem_74855-15797.jpg",
    },
  ];

  // ✅ Conditional rendering Onboarding untuk Depression
  if (onboarding) {
    return (
      <OnboardingStepper
        steps={depressionSteps}
        onFinish={() => setOnboarding(false)}
      />
    );
  }

  // ✅ Conditional rendering Result untuk Depression
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

        {/* Explanation */}
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
