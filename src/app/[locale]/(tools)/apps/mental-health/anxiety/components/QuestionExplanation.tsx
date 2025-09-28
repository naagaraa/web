interface ExplanationProps {
  index: number;
}

const explanations = [
  "Merasa gugup, cemas, atau tegang: perasaan gelisah yang sering muncul.",
  "Tidak bisa menghentikan atau mengendalikan kekhawatiran: kesulitan untuk berhenti khawatir.",
  "Terlalu banyak khawatir tentang berbagai hal: khawatir berlebihan terkait banyak hal.",
  "Sulit untuk rileks: merasa tegang atau sulit santai.",
  "Terasa gelisah sehingga sulit untuk duduk tenang: badan terasa gelisah, ingin bergerak terus.",
  "Mudah marah atau tersinggung: menjadi cepat tersinggung atau jengkel.",
  "Merasa takut seolah sesuatu yang buruk akan terjadi: perasaan takut berlebihan terhadap masa depan.",
];

export default function QuestionExplanation({ index }: ExplanationProps) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="font-semibold mb-2">Penjelasan Pertanyaan</h2>
      <p>{explanations[index]}</p>
    </div>
  );
}
