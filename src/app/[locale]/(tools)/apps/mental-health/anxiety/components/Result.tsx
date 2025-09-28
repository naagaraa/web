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
    level = "Kecemasan Minimal";
    description =
      "Tingkat kecemasan Anda rendah. Terus pertahankan kesehatan mental yang baik.";
    advice =
      "Tetap pertahankan gaya hidup sehat: tidur cukup, olahraga, dan manajemen stres ringan.";
    color = "bg-green-100 text-green-800";
  } else if (score <= 9) {
    level = "Kecemasan Ringan";
    description =
      "Kecemasan ringan terdeteksi. Perhatikan gejala, gunakan teknik relaksasi bila perlu.";
    advice =
      "Coba latihan pernapasan, meditasi ringan, olahraga rutin, atau journaling. Perhatikan pola tidur dan waktu istirahat.";
    color = "bg-yellow-100 text-yellow-800";
  } else if (score <= 14) {
    level = "Kecemasan Sedang";
    description =
      "Kecemasan sedang. Disarankan evaluasi lebih lanjut atau konsultasi ringan dengan profesional.";
    advice =
      "Pertimbangkan untuk berbicara dengan psikolog/terapis, gunakan teknik coping, catat pemicu kecemasan, dan perkuat support system.";
    color = "bg-orange-100 text-orange-800";
  } else {
    level = "Kecemasan Berat";
    description =
      "Kecemasan tinggi. Segera konsultasikan dengan tenaga kesehatan mental profesional.";
    advice =
      "Segera konsultasikan dengan psikolog atau psikiater, pertimbangkan terapi profesional, dan gunakan metode relaksasi darurat untuk meredakan gejala sementara.";
    color = "bg-red-100 text-red-800";
  }

  const chartData = answers.map((value, index) => ({
    name: `Q${index + 1}`,
    value,
  }));

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">Hasil Cek Kecemasan</h2>
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

      {/* Description */}
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Advice / Penanganan */}
      <div className="p-4 mb-6 bg-gray-50 rounded-lg border-l-4 border-blue-400">
        <h3 className="font-semibold mb-2">Saran Penanganan:</h3>
        <p className="text-gray-700">{advice}</p>
      </div>

      {/* Chart */}
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

      {/* Penjelasan tambahan */}
      <p className="text-gray-500 text-sm mb-6">
        Penjelasan: Grafik menunjukkan skor tiap pertanyaan. Semakin tinggi,
        semakin sering Anda mengalami gejala kecemasan terkait pertanyaan
        tersebut.
      </p>

      {/* Tombol Cek Ulang */}
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
