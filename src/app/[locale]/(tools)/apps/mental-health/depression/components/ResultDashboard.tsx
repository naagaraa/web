"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ResultDashboardProps {
  answers: number[];
  onRestart: () => void;
}

export default function ResultDashboard({
  answers = [],
  onRestart,
}: ResultDashboardProps) {
  const score = answers.reduce((a, b) => a + b, 0);

  let level = "";
  let description = "";
  let advice = "";
  let color = "";

  if (score <= 4) {
    level = "Depresi Minimal";
    description =
      "Tingkat depresi rendah. Tetap pertahankan kesehatan mental yang baik.";
    advice = "Tidur cukup, olahraga ringan, dan manajemen stres sederhana.";
    color = "bg-green-100 text-green-800";
  } else if (score <= 9) {
    level = "Depresi Ringan";
    description =
      "Depresi ringan terdeteksi. Perhatikan gejala dan gunakan teknik relaksasi.";
    advice =
      "Latihan pernapasan, meditasi ringan, olahraga rutin, atau journaling. Perhatikan pola tidur.";
    color = "bg-yellow-100 text-yellow-800";
  } else if (score <= 14) {
    level = "Depresi Sedang";
    description =
      "Depresi sedang. Disarankan evaluasi lebih lanjut atau konsultasi ringan.";
    advice =
      "Bicarakan dengan psikolog/terapis, catat pemicu depresi, perkuat support system.";
    color = "bg-orange-100 text-orange-800";
  } else if (score <= 19) {
    level = "Depresi Moderat";
    description = "Depresi moderat. Sebaiknya segera konsultasi profesional.";
    advice =
      "Konsultasi psikolog/psikiater, terapi kognitif/psikoterapi, perkuat dukungan sosial.";
    color = "bg-red-200 text-red-800";
  } else {
    level = "Depresi Berat";
    description =
      "Depresi berat. Segera hubungi tenaga kesehatan mental profesional.";
    advice =
      "Konsultasi segera, pertimbangkan terapi intensif, dan pastikan lingkungan aman.";
    color = "bg-red-300 text-red-900";
  }

  const chartData = answers.map((value, index) => ({
    name: `Q${index + 1}`,
    value,
  }));

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">Hasil Tes Depresi</h2>
          <p className="text-gray-500">
            Skor total: <span className="font-semibold">{score}</span>
          </p>
        </div>
        <div
          className={`mt-3 md:mt-0 px-4 py-2 rounded-full font-semibold ${color}`}
        >
          {level}
        </div>
      </div>

      <p className="text-gray-700 mb-4">{description}</p>

      <div className="p-4 mb-6 bg-gray-50 rounded-lg border-l-4 border-blue-400">
        <h3 className="font-semibold mb-2">Saran Penanganan:</h3>
        <p className="text-gray-700">{advice}</p>
      </div>

      <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm mb-6 bg-gray-50 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }}
            />
            <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-500 text-sm mb-6">
        Penjelasan: Grafik menunjukkan skor tiap pertanyaan PHQ-9. Semakin
        tinggi, semakin sering gejala depresi muncul.
      </p>

      <div className="flex text-start">
        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Cek Ulang
        </button>
      </div>
    </div>
  );
}
