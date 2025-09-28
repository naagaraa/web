"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface IPCalcResult {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  subnetMask: string;
  wildcardMask: string;
}

export default function IPCalculatorIndustry() {
  const [ip, setIp] = useState("192.168.0.0");
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<IPCalcResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    try {
      const ipParts = ip.split(".").map((n) => parseInt(n));
      if (
        ipParts.length !== 4 ||
        ipParts.some((n) => isNaN(n) || n < 0 || n > 255)
      ) {
        setError("IP tidak valid.");
        return;
      }
      if (cidr < 0 || cidr > 32) {
        setError("CIDR harus antara 0–32.");
        return;
      }

      const ipNum =
        (ipParts[0] << 24) +
        (ipParts[1] << 16) +
        (ipParts[2] << 8) +
        ipParts[3];
      const mask = 0xffffffff << (32 - cidr);
      const networkNum = ipNum & mask;
      const broadcastNum = networkNum | (~mask >>> 0);
      const totalHosts =
        cidr === 32 ? 1 : Math.max(0, broadcastNum - networkNum - 1);

      const numToIp = (num: number) =>
        `${(num >> 24) & 255}.${(num >> 16) & 255}.${(num >> 8) & 255}.${
          num & 255
        }`;

      const subnetMask = numToIp(mask >>> 0);
      const wildcardMask = numToIp(~mask >>> 0);

      setResult({
        network: numToIp(networkNum),
        broadcast: numToIp(broadcastNum),
        firstHost: cidr === 32 ? numToIp(networkNum) : numToIp(networkNum + 1),
        lastHost: cidr === 32 ? numToIp(networkNum) : numToIp(broadcastNum - 1),
        totalHosts,
        subnetMask,
        wildcardMask,
      });
    } catch {
      setError("Terjadi kesalahan perhitungan.");
    }
  };

  const reset = () => {
    setIp("192.168.0.0");
    setCidr(24);
    setResult(null);
    setError("");
  };

  const chartData = result
    ? [
        { name: "Network/Broadcast", value: 2 },
        { name: "Usable Hosts", value: result.totalHosts },
      ]
    : [];

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Input & Result */}
      <section className="space-y-6">
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full border border-gray-200 p-2"
          />
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="font-medium text-gray-700">CIDR / Prefix</label>
          <input
            type="number"
            min={0}
            max={32}
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value) || 24)}
            className="w-full border border-gray-200 p-2"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Hitung
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-100 text-gray-800 py-3 font-semibold hover:bg-gray-200 transition shadow-sm"
          >
            Reset
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {result && (
          <div className="space-y-4 mt-6">
            {/* Header Card */}
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center gap-2">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-700 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-6a2 2 0 012-2h6M4 6h16M4 6v12a2 2 0 002 2h12M4 6l8 6 8-6"
                  />
                </svg>
                {/* Text */}
                <h3 className="text-sm font-semibold text-blue-700 truncate">
                  Hasil Perhitungan IP
                </h3>
              </div>

              {/* Optional: CIDR display */}
              <span className="text-sm text-blue-600 truncate">
                CIDR / Prefix: {cidr}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Network */}
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">🌐 Network Address</p>
                <p className="text-lg font-medium text-gray-800 truncate">
                  {result.network}
                </p>
              </div>
              {/* Broadcast */}
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">📡 Broadcast Address</p>
                <p className="text-lg font-medium text-gray-800 truncate">
                  {result.broadcast}
                </p>
              </div>
              {/* First Host */}
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">👤 First Host</p>
                <p className="text-lg font-medium text-gray-800 truncate">
                  {result.firstHost}
                </p>
              </div>
              {/* Last Host */}
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">👤 Last Host</p>
                <p className="text-lg font-medium text-gray-800 truncate">
                  {result.lastHost}
                </p>
              </div>
              {/* Total Hosts */}
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">📊 Total Usable Hosts</p>
                <p className="text-lg font-medium text-gray-800 truncate">
                  {result.totalHosts}
                </p>
              </div>
              {/* Subnet Mask */}
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">🛡️ Subnet Mask</p>
                <p className="text-lg font-medium text-gray-800 truncate">
                  {result.subnetMask}
                </p>
              </div>
              {/* Wildcard Mask */}
              <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">🔓 Wildcard Mask</p>
                <p className="text-lg font-medium text-gray-800 truncate">
                  {result.wildcardMask}
                </p>
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col items-center">
              <h4 className="text-md font-semibold text-gray-700 mb-4 text-center">
                Visualisasi IP
              </h4>
              {chartData.length > 0 && (
                <PieChart width={280} height={220}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f3f4f6",
                      borderRadius: "0.5rem",
                      border: "none",
                    }}
                    itemStyle={{ color: "#1f2937", fontWeight: "500" }}
                  />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Right Column: Info & Edukasi */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Apa itu IP Calculator Standar Industri?
        </h2>
        <p>
          IP Calculator ini membantu menghitung Network, Broadcast, Host range,
          Subnet mask, dan Wildcard mask sesuai praktik jaringan profesional.
        </p>
        <p>Langkah penggunaan:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Masukkan IP Address valid (contoh: 192.168.0.0).</li>
          <li>Masukkan CIDR / Prefix (0–32).</li>
          <li>
            Klik "Hitung" untuk melihat hasil lengkap, termasuk visualisasi host
            vs network.
          </li>
        </ul>
        <p className="text-sm italic text-gray-600">
          ⚠️ Catatan: Hanya mendukung IPv4. Pastikan IP adalah network address
          yang valid.
        </p>
      </section>
    </main>
  );
}
