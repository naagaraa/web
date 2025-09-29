"use client";

interface QuestionCardProps {
  question: string;
  options: { label: string; value: number }[];
  selected?: number;
  onSelect: (value: number) => void;
}

export default function QuestionCard({
  question,
  options,
  selected,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="p-6 shadow-md bg-white">
      <p className="text-lg font-semibold mb-6">{question}</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`p-4 text-center cursor-pointer font-medium transition-all
              ${
                selected === opt.value
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
