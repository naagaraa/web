"use client";

import { useState } from "react";

type Sex = "male" | "female";

type Condition = "none" | "pregnant" | "lactating" | "vegetarian" | "elderly";

// Simplified RDA table based on NIH / ODS guidance (common adult values)
// NOTE: these are general estimates for demo purposes. See notes in UI.
const BASE_RDA = {
  adult_male: {
    vitaminA: 900,
    vitaminC: 90,
    vitaminD: 15,
    vitaminE: 15,
    vitaminK: 120,
    folate: 400,
    b12: 2.4,
    calcium: 1000,
    iron: 8,
    magnesium: 400,
    zinc: 11,
    iodine: 150,
  },
  adult_female: {
    vitaminA: 700,
    vitaminC: 75,
    vitaminD: 15,
    vitaminE: 15,
    vitaminK: 90,
    folate: 400,
    b12: 2.4,
    calcium: 1000,
    iron: 18,
    magnesium: 310,
    zinc: 8,
    iodine: 150,
  },
  older_male: {
    vitaminA: 900,
    vitaminC: 90,
    vitaminD: 20,
    vitaminE: 15,
    vitaminK: 120,
    folate: 400,
    b12: 2.4,
    calcium: 1200,
    iron: 8,
    magnesium: 420,
    zinc: 11,
    iodine: 150,
  },
  older_female: {
    vitaminA: 700,
    vitaminC: 75,
    vitaminD: 20,
    vitaminE: 15,
    vitaminK: 90,
    folate: 400,
    b12: 2.4,
    calcium: 1200,
    iron: 8,
    magnesium: 320,
    zinc: 8,
    iodine: 150,
  },
};

type ProfileKey = keyof typeof BASE_RDA;

export default function VitaminSupplementCalc() {
  const [age, setAge] = useState<number>(30);
  const [sex, setSex] = useState<Sex>("female");
  const [condition, setCondition] = useState<Condition>("none");
  const [report, setReport] = useState<any>(null);

  const compute = () => {
    // choose base group
    const isOlder = age >= 71;
    const groupKey: ProfileKey = isOlder
      ? (`older_${sex}` as ProfileKey)
      : (`adult_${sex}` as ProfileKey);
    const base = BASE_RDA[groupKey];

    // clone
    const rda = { ...base };

    // Adjustments for special conditions (simplified)
    if (condition === "pregnant") {
      rda.folate = 600;
      rda.iron = 27;
    }

    if (condition === "lactating") {
      rda.folate = 500;
      rda.iron = 9;
      rda.vitaminA = rda.vitaminA + 100;
    }

    if (condition === "vegetarian") {
      rda.iron = Math.max(rda.iron, 18);
      rda.b12 = Math.max(rda.b12, 2.4);
    }

    if (condition === "elderly") {
      rda.vitaminD = Math.max(rda.vitaminD, 20);
      rda.b12 = Math.max(rda.b12, 2.4);
    }

    setReport({ age, sex, condition, rda });
  };

  const reset = () => {
    setAge(30);
    setSex("female");
    setCondition("none");
    setReport(null);
  };

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="space-y-6">
        <h1 className="text-2xl font-bold">Vitamin & Supplement Calculator</h1>
        <p className="text-sm text-gray-600">
          Estimasi kebutuhan harian vitamin & mineral utama berdasarkan usia,
          jenis kelamin, dan kondisi umum. Angka yang dipakai adalah estimasi
          dari pedoman internasional (contoh: NIH/ODS). Ini{" "}
          <strong>bukan</strong> rekomendasi medis individual.
        </p>

        <div className="border p-4 bg-gray-50 space-y-3">
          <label className="block text-sm font-medium">Usia</label>
          <input
            type="number"
            min={0}
            max={120}
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            className="w-full border p-2"
          />

          <label className="block text-sm font-medium">Jenis Kelamin</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSex("female")}
              className={`py-2 ${
                sex === "female" ? "bg-gray-800 text-white" : "bg-gray-100"
              }`}
            >
              Perempuan
            </button>
            <button
              type="button"
              onClick={() => setSex("male")}
              className={`py-2 ${
                sex === "male" ? "bg-gray-800 text-white" : "bg-gray-100"
              }`}
            >
              Laki-laki
            </button>
          </div>

          <label className="block text-sm font-medium">
            Kondisi khusus (pilih salah satu jika sesuai)
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as Condition)}
            className="w-full border p-2"
          >
            <option value="none">Tidak ada</option>
            <option value="pregnant">Hamil</option>
            <option value="lactating">Menyusui</option>
            <option value="vegetarian">Vegetarian / Plant-based</option>
            <option value="elderly">Lansia</option>
          </select>

          <div className="flex gap-4">
            <button
              onClick={compute}
              className="flex-1 bg-blue-600 text-white py-2"
            >
              Hitung
            </button>
            <button onClick={reset} className="flex-1 bg-gray-100">
              Reset
            </button>
          </div>
        </div>

        {report && (
          <div className="border p-6 bg-green-50 space-y-4">
            <h3 className="font-bold text-lg">
              Hasil Estimasi Kebutuhan Harian
            </h3>
            <p className="text-sm text-gray-700">
              Usia: {report.age} — Jenis kelamin: {report.sex} — Kondisi:{" "}
              {report.condition}
            </p>

            <div className="overflow-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Nutrien</th>
                    <th className="py-2">Kebutuhan Harian (estimasi)</th>
                    <th className="py-2">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(report.rda).map(([k, v]: any) => (
                    <tr key={k} className="border-b">
                      <td className="py-2 font-medium">
                        {formatNutrientName(k)}
                      </td>
                      <td className="py-2">{v}</td>
                      <td className="py-2">{unitForNutrient(k)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p className="font-semibold">Penjelasan singkat:</p>
              <ul className="list-disc list-inside">
                <li>
                  Angka di atas adalah estimasi RDA/DRI umum — sumber: NIH/ODS
                  dan pedoman profesi.
                </li>
                <li>
                  Jika Anda memiliki kondisi medis (mis. penyakit ginjal,
                  anemia, defisiensi), konsultasikan dokter sebelum mengonsumsi
                  suplemen.
                </li>
                <li>
                  Beberapa vitamin (mis. vitamin D, B12, zat besi) lebih aman
                  dikonsumsi setelah pemeriksaan darah.
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      <aside className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-white space-y-4">
        <h2 className="text-xl font-bold">Tentang RDA & Suplemen</h2>
        <p className="text-sm text-gray-700">
          RDA = Recommended Dietary Allowance — angka yang memberikan kebutuhan
          rata-rata untuk kelompok sehat. Sumber data umum: NIH Office of
          Dietary Supplements (ODS) dan publikasi profesional.
        </p>
        <p className="text-sm text-gray-700">Mengapa perlu berhati-hati:</p>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>
            Beberapa suplemen memiliki <strong>upper limits</strong> — terlalu
            banyak berbahaya (mis. vitamin A, D, zat besi).
          </li>
          <li>Interaksi obat & kondisi medis dapat mengubah kebutuhan.</li>
          <li>
            Pemeriksaan darah membantu menargetkan suplemen yang benar-benar
            dibutuhkan.
          </li>
        </ul>
        <p className="text-xs text-gray-600 italic">
          Disclaimer: Ini adalah alat edukasi. Untuk rekomendasi pribadi,
          konsultasikan ke dokter atau ahli gizi. Sumber data umum: NIH ODS,
          ACOG (untuk kehamilan).
        </p>
      </aside>
    </main>
  );
}

function formatNutrientName(key: string) {
  const map: any = {
    vitaminA: "Vitamin A",
    vitaminC: "Vitamin C",
    vitaminD: "Vitamin D",
    vitaminE: "Vitamin E",
    vitaminK: "Vitamin K",
    folate: "Folate (DFE)",
    b12: "Vitamin B12",
    calcium: "Kalsium",
    iron: "Zat Besi",
    magnesium: "Magnesium",
    zinc: "Zinc (Seng)",
    iodine: "Iodium",
  };
  return map[key] || key;
}

function unitForNutrient(key: string) {
  const map: any = {
    vitaminA: "mcg RAE",
    vitaminC: "mg",
    vitaminD: "mcg",
    vitaminE: "mg",
    vitaminK: "mcg",
    folate: "mcg DFE",
    b12: "mcg",
    calcium: "mg",
    iron: "mg",
    magnesium: "mg",
    zinc: "mg",
    iodine: "mcg",
  };
  return map[key] || "";
}
