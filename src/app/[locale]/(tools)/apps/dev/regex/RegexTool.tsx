"use client";

import { useState } from "react";

export default function RegexTool() {
  const [activeTab, setActiveTab] = useState<"tester" | "deskripsi">("tester");
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleMatch = () => {
    try {
      const regex = new RegExp(pattern, "g");
      const found: string[] = [];
      const iterator = text.matchAll(regex);
      let result = iterator.next();
      while (!result.done) {
        found.push(result.value[0]);
        result = iterator.next();
      }
      setMatches(found);
      setError("");
    } catch (err: any) {
      setMatches([]);
      setError("Regex tidak valid.");
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "tester"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("tester")}
        >
          Tester
        </button>
        <button
          className={`ml-4 px-4 py-2 font-medium ${
            activeTab === "deskripsi"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("deskripsi")}
        >
          Deskripsi
        </button>
      </div>

      {activeTab === "tester" && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pola Regex
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Misalnya: \\d+"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Teks untuk Diuji
            </label>
            <textarea
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 min-h-[120px]"
              placeholder="Masukkan teks di sini..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button
            onClick={handleMatch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Jalankan Regex
          </button>

          {error && (
            <p className="text-red-500 text-sm font-medium mt-2">{error}</p>
          )}

          {matches.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Hasil Match:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                {matches.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {matches.length === 0 && !error && text && (
            <p className="text-sm text-gray-500 mt-2">Tidak ada match.</p>
          )}

          {/* Panduan penggunaan */}
          <div className="mt-6 border-t pt-6 text-sm text-gray-800 space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
              🧪 Cara Menggunakan Regex Tester
            </h3>

            <p>
              Masukkan <strong>pola Regex</strong> pada kolom pertama dan teks
              yang ingin diuji pada kolom kedua. Klik <em>“Jalankan Regex”</em>{" "}
              untuk melihat hasil pencocokan.
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-gray-900">Contoh Penggunaan:</p>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                <p>
                  <strong>Pola:</strong>{" "}
                  <code className="bg-gray-200 text-gray-900 px-1 rounded font-mono">
                    \d+
                  </code>
                </p>
                <p>
                  <strong>Teks:</strong>{" "}
                  <code className="bg-gray-200 text-gray-900 px-1 rounded font-mono">
                    Nomor saya 123 dan 456
                  </code>
                </p>
                <p>
                  <strong>Hasil:</strong>{" "}
                  <code className="bg-green-100 text-green-800 px-1 rounded font-mono">
                    123
                  </code>
                  ,{" "}
                  <code className="bg-green-100 text-green-800 px-1 rounded font-mono">
                    456
                  </code>
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                <p>
                  <strong>Pola:</strong>{" "}
                  <code className="bg-gray-200 text-gray-900 px-1 rounded font-mono">
                    hello
                  </code>
                </p>
                <p>
                  <strong>Teks:</strong>{" "}
                  <code className="bg-gray-200 text-gray-900 px-1 rounded font-mono">
                    hello world, hello regex
                  </code>
                </p>
                <p>
                  <strong>Hasil:</strong>{" "}
                  <code className="bg-green-100 text-green-800 px-1 rounded font-mono">
                    hello
                  </code>
                  ,{" "}
                  <code className="bg-green-100 text-green-800 px-1 rounded font-mono">
                    hello
                  </code>
                </p>
              </div>
            </div>

            <p className="text-gray-700 italic">
              ⚠️ Jika regex tidak valid, akan muncul pesan error. Pastikan
              formatnya benar dan escape karakter khusus seperti tanda kurung,
              titik, dll.
            </p>
          </div>
        </div>
      )}

      {activeTab === "deskripsi" && (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Apa Itu Regex?</h2>
          <p>
            Regex (Regular Expression) adalah pola yang digunakan untuk
            mencocokkan string. Umumnya digunakan untuk validasi, pencarian, dan
            manipulasi teks.
          </p>
          <h3>Contoh Pola</h3>
          <ul>
            <li>
              <code>\d+</code>: mencocokkan satu atau lebih digit angka.
            </li>
            <li>
              <code>\w+</code>: mencocokkan satu atau lebih karakter
              huruf/angka.
            </li>
            <li>
              <code>[a-z]{3}</code>: mencocokkan tepat tiga huruf kecil.
            </li>
            <li>
              <code>^Hello</code>: mencocokkan teks yang diawali dengan “Hello”.
            </li>
            <li>
              <code>world$</code>: mencocokkan teks yang diakhiri dengan
              “world”.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
