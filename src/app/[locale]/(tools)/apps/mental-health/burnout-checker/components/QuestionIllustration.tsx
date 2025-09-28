"use client";

import Image from "next/image";

interface QuestionIllustrationProps {
  questionIndex: number;
}

export const illustrations = [
  "https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-mental-health-problems_23-2149092122.jpg",
  "https://img.freepik.com/free-vector/social-media-detox-concept_23-2148780238.jpg",
  "https://img.freepik.com/free-vector/world-mental-health-day-hand-drawn_23-2148657685.jpg",
  "https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148892434.jpg",
  "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg",
  "https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-solving-business-problem_74855-15797.jpg",
  "https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-solving-business-problem_74855-15797.jpg",
  "https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-solving-business-problem_74855-15797.jpg",
  "https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-solving-business-problem_74855-15797.jpg",
];
export default function QuestionIllustration({
  questionIndex,
}: QuestionIllustrationProps) {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <Image
        src={illustrations[questionIndex]}
        alt={`Ilustrasi pertanyaan ${questionIndex + 1}`}
        width={500}
        height={400}
        className="object-contain"
        priority
      />
    </div>
  );
}
