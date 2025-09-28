"use client";

import { useState } from "react";

export default function BloodGlucoseCalc() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState<string>("170");
  const [weight, setWeight] = useState<string>("70");
  const [waist, setWaist] = useState<string>("85");
  const [age, setAge] = useState<string>("40");
  const [physicalActivity, setPhysicalActivity] = useState<boolean>(true);
  const [fruitVeggieIntake, setFruitVeggieIntake] = useState<boolean>(true);
  const [hypertensionMed, setHypertensionMed] = useState<boolean>(false);
  const [highBloodSugarHistory, setHighBloodSugarHistory] =
    useState<boolean>(false);
  const [familyDiabetes, setFamilyDiabetes] = useState<boolean>(false);

  const [report, setReport] = useState<{
    score: number;
    bmi: number;
    waistRisk: string;
    components: Record<string, { points: number; label: string }>;
    riskCategory: string;
    recommendation: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateRisk = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    // Helper: parse dan validasi
    const tryParse = (value: string, name: string): number => {
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) {
        throw new Error(`${name} harus berupa angka lebih dari 0.`);
      }
      return num;
    };

    let ageNum: number, heightNum: number, weightNum: number, waistNum: number;

    try {
      ageNum = tryParse(age, "Usia");
      heightNum = tryParse(height, "Tinggi badan");
      weightNum = tryParse(weight, "Berat badan");
      waistNum = tryParse(waist, "Lingkar pinggang");
    } catch (err) {
      setError((err as Error).message);
      return;
    }

    // Sekarang SEMUA variabel dijamin number > 0 → TypeScript puas!
    const bmi = weightNum / (heightNum / 100) ** 2;
    let totalScore = 0;
    const components: Record<string, { points: number; label: string }> = {};

    // 1. Usia
    let agePoints = 0;
    if (ageNum >= 45 && ageNum <= 54) agePoints = 2;
    else if (ageNum >= 55 && ageNum <= 64) agePoints = 3;
    else if (ageNum >= 65) agePoints = 4;
    totalScore += agePoints;
    components.age = { points: agePoints, label: `Usia ${ageNum} tahun` };

    // 2. BMI
    let bmiPoints = 0;
    if (bmi >= 25 && bmi < 30) bmiPoints = 1;
    else if (bmi >= 30) bmiPoints = 3;
    totalScore += bmiPoints;
    components.bmi = { points: bmiPoints, label: `BMI: ${bmi.toFixed(1)}` };

    // 3. Lingkar Pinggang
    let waistPoints = 0;
    let waistRisk = "";
    if (gender === "male") {
      if (waistNum >= 94 && waistNum <= 102) {
        waistPoints = 3;
        waistRisk = "Peningkatan risiko (94–102 cm)";
      } else if (waistNum > 102) {
        waistPoints = 4;
        waistRisk = "Risiko tinggi (>102 cm)";
      } else {
        waistRisk = "Normal (<94 cm)";
      }
    } else {
      if (waistNum >= 80 && waistNum <= 88) {
        waistPoints = 3;
        waistRisk = "Peningkatan risiko (80–88 cm)";
      } else if (waistNum > 88) {
        waistPoints = 4;
        waistRisk = "Risiko tinggi (>88 cm)";
      } else {
        waistRisk = "Normal (<80 cm)";
      }
    }
    totalScore += waistPoints;
    components.waist = {
      points: waistPoints,
      label: `Lingkar pinggang: ${waistNum} cm`,
    };

    // 4. Aktivitas Fisik
    const activityPoints = physicalActivity ? 0 : 2;
    totalScore += activityPoints;
    components.activity = {
      points: activityPoints,
      label: physicalActivity ? "Aktif (≥30 menit/hari)" : "Kurang aktif",
    };

    // 5. Konsumsi Buah/Sayur
    const dietPoints = fruitVeggieIntake ? 0 : 1;
    totalScore += dietPoints;
    components.diet = {
      points: dietPoints,
      label: fruitVeggieIntake
        ? "Makan buah/sayur tiap hari"
        : "Jarang makan buah/sayur",
    };

    // 6. Obat Hipertensi
    const hyperPoints = hypertensionMed ? 2 : 0;
    totalScore += hyperPoints;
    components.hypertension = {
      points: hyperPoints,
      label: hypertensionMed
        ? "Mengonsumsi obat hipertensi"
        : "Tidak pakai obat hipertensi",
    };

    // 7. Riwayat Gula Darah Tinggi
    const sugarPoints = highBloodSugarHistory ? 5 : 0;
    totalScore += sugarPoints;
    components.sugar = {
      points: sugarPoints,
      label: highBloodSugarHistory
        ? "Pernah gula darah tinggi"
        : "Tidak pernah gula darah tinggi",
    };

    // 8. Riwayat Keluarga Diabetes
    const familyPoints = familyDiabetes ? 3 : 0;
    totalScore += familyPoints;
    components.family = {
      points: familyPoints,
      label: familyDiabetes
        ? "Ada riwayat diabetes di keluarga"
        : "Tidak ada riwayat keluarga",
    };

    // Kategori risiko
    let riskCategory = "";
    let recommendation = "";
    if (totalScore <= 6) {
      riskCategory = "Rendah";
      recommendation =
        "Risiko Anda rendah. Pertahankan gaya hidup sehat: olahraga teratur, makan seimbang, dan cek kesehatan rutin.";
    } else if (totalScore <= 11) {
      riskCategory = "Sedang";
      recommendation =
        "Risiko sedang. Disarankan untuk meningkatkan aktivitas fisik, kurangi gula & lemak, dan pantau berat badan. Periksa gula darah setiap 1–2 tahun.";
    } else if (totalScore <= 14) {
      riskCategory = "Tinggi";
      recommendation =
        "Risiko tinggi. Segera konsultasi ke dokter untuk pemeriksaan gula darah (puasa, HbA1c). Pertimbangkan program pencegahan diabetes.";
    } else {
      riskCategory = "Sangat Tinggi";
      recommendation =
        "Risiko sangat tinggi. Anda berisiko besar mengalami diabetes dalam 10 tahun. Segera periksa ke fasilitas kesehatan untuk diagnosis dan intervensi dini.";
    }

    setReport({
      score: totalScore,
      bmi: parseFloat(bmi.toFixed(1)),
      waistRisk,
      components,
      riskCategory,
      recommendation,
    });
  };

  const resetForm = () => {
    setGender("male");
    setHeight("170");
    setWeight("70");
    setWaist("85");
    setAge("40");
    setPhysicalActivity(true);
    setFruitVeggieIntake(true);
    setHypertensionMed(false);
    setHighBloodSugarHistory(false);
    setFamilyDiabetes(false);
    setReport(null);
    setError(null);
  };

  const getClampedValue = (
    valueStr: string,
    min: number,
    max: number
  ): number => {
    const num = parseFloat(valueStr);
    return isNaN(num) ? min : Math.min(max, Math.max(min, num));
  };

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <section className="space-y-6">
        <div className="border border-gray-200 shadow-sm grid grid-cols-2">
          <button
            type="button"
            className={`py-3 text-center font-medium transition ${
              gender === "male"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setGender("male")}
          >
            ♂ Pria
          </button>
          <button
            type="button"
            className={`py-3 text-center font-medium transition ${
              gender === "female"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setGender("female")}
          >
            ♀ Wanita
          </button>
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">Tinggi (cm)</label>
          <input
            type="range"
            min={100}
            max={250}
            value={getClampedValue(height, 100, 250)}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full accent-blue-600"
          />
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border border-gray-200 p-2 text-center"
          />
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">Berat (kg)</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-200 p-2 text-center"
          />
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">
            Lingkar Pinggang (cm) – {gender === "male" ? "Pria" : "Wanita"}
          </label>
          <input
            type="range"
            min={gender === "male" ? 70 : 60}
            max={gender === "male" ? 150 : 130}
            value={getClampedValue(
              waist,
              gender === "male" ? 70 : 60,
              gender === "male" ? 150 : 130
            )}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full accent-blue-600"
          />
          <input
            type="text"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full border border-gray-200 p-2 text-center"
          />
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">Usia (tahun)</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-gray-200 p-2 text-center"
          />
        </div>

        {/* ... (semua input radio seperti sebelumnya, tanpa perubahan) */}
        <div className="border border-gray-200 shadow-sm p-4 space-y-3">
          <label className="font-medium text-gray-700 block">
            Apakah Anda beraktivitas fisik ≥30 menit/hari?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="activity"
                checked={physicalActivity}
                onChange={() => setPhysicalActivity(true)}
                className="mr-2"
              />
              Ya
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="activity"
                checked={!physicalActivity}
                onChange={() => setPhysicalActivity(false)}
                className="mr-2"
              />
              Tidak
            </label>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-3">
          <label className="font-medium text-gray-700 block">
            Apakah makan buah/sayur setiap hari?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="diet"
                checked={fruitVeggieIntake}
                onChange={() => setFruitVeggieIntake(true)}
                className="mr-2"
              />
              Ya
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="diet"
                checked={!fruitVeggieIntake}
                onChange={() => setFruitVeggieIntake(false)}
                className="mr-2"
              />
              Tidak / Jarang
            </label>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-3">
          <label className="font-medium text-gray-700 block">
            Apakah Anda menggunakan obat untuk tekanan darah tinggi?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="hypertension"
                checked={!hypertensionMed}
                onChange={() => setHypertensionMed(false)}
                className="mr-2"
              />
              Tidak
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hypertension"
                checked={hypertensionMed}
                onChange={() => setHypertensionMed(true)}
                className="mr-2"
              />
              Ya
            </label>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-3">
          <label className="font-medium text-gray-700 block">
            Pernahkah kadar gula darah Anda tinggi (misal: saat cek kesehatan)?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="sugar"
                checked={!highBloodSugarHistory}
                onChange={() => setHighBloodSugarHistory(false)}
                className="mr-2"
              />
              Tidak
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sugar"
                checked={highBloodSugarHistory}
                onChange={() => setHighBloodSugarHistory(true)}
                className="mr-2"
              />
              Ya
            </label>
          </div>
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-3">
          <label className="font-medium text-gray-700 block">
            Apakah ada saudara kandung, orang tua, atau anak yang menderita
            diabetes?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="family"
                checked={!familyDiabetes}
                onChange={() => setFamilyDiabetes(false)}
                className="mr-2"
              />
              Tidak
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="family"
                checked={familyDiabetes}
                onChange={() => setFamilyDiabetes(true)}
                className="mr-2"
              />
              Ya
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={calculateRisk}
            className="flex-1 bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition shadow-sm rounded"
          >
            Hitung Risiko
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 bg-gray-100 text-gray-800 py-3 font-semibold hover:bg-gray-200 transition shadow-sm rounded"
          >
            Reset
          </button>
        </div>

        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}
      </section>

      {/* Report */}
      <section className="space-y-6">
        {report ? (
          <div className="border border-gray-200 shadow-sm p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📊 Laporan Risiko Diabetes
            </h2>
            <div className="mb-4 p-3 bg-blue-50 rounded">
              <p className="font-semibold">
                Skor Total:{" "}
                <span className="text-blue-700">{report.score}/26</span>
              </p>
              <p className="text-lg">
                Kategori Risiko:{" "}
                <span
                  className={
                    report.riskCategory === "Rendah"
                      ? "text-green-600 font-bold"
                      : report.riskCategory === "Sedang"
                      ? "text-yellow-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {report.riskCategory}
                </span>
              </p>
            </div>
            <h3 className="font-bold text-gray-700 mb-2">Rincian Skor:</h3>
            <ul className="space-y-1 text-sm">
              {Object.entries(report.components).map(([key, comp]) => (
                <li key={key} className="flex justify-between">
                  <span>{comp.label}</span>
                  <span className="font-medium">{comp.points} poin</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <h3 className="font-bold text-gray-700 mb-1">Rekomendasi:</h3>
              <p className="text-sm text-gray-700">{report.recommendation}</p>
            </div>
            <div className="mt-4 text-xs text-gray-500 italic">
              Berdasarkan FINDRISC (Finnish Diabetes Risk Score) – alat skrining
              resmi WHO.
            </div>
            <button
              onClick={resetForm}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition rounded"
            >
              Hitung Ulang
            </button>
          </div>
        ) : (
          <div className="border border-gray-200 shadow-sm p-6 bg-gray-50 rounded-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Tentang FINDRISC
            </h2>
            <p className="text-gray-700 text-sm">
              FINDRISC adalah kuesioner risiko diabetes tipe 2 yang dikembangkan
              oleh WHO.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Skor 0–6: Risiko rendah</li>
              <li>Skor 7–11: Risiko sedang</li>
              <li>Skor 12–14: Risiko tinggi</li>
              <li>Skor ≥15: Risiko sangat tinggi</li>
            </ul>
            <div className="text-xs text-gray-600 italic mt-2">
              ⚠️ Hasil ini bukan diagnosis medis.
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
