"use client";

import { useState } from "react";

interface SubnetRequest {
  name: string;
  hosts: number;
}

interface SubnetResult extends SubnetRequest {
  network: string;
  prefix: number;
  mask: string;
  firstHost: string;
  lastHost: string;
  broadcast: string;
  total: number;
  usable: number;
}

function ipToInt(ip: number[]): number {
  return (ip[0] << 24) | (ip[1] << 16) | (ip[2] << 8) | ip[3];
}

function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

function prefixToMask(prefix: number): string {
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  return intToIp(mask);
}

function ipToBigInt(ip: number[]): bigint {
  return (
    (BigInt(ip[0]) << BigInt(24)) |
    (BigInt(ip[1]) << BigInt(16)) |
    (BigInt(ip[2]) << BigInt(8)) |
    BigInt(ip[3])
  );
}

function isValidNetwork(ip: number[], prefix: number): boolean {
  const ipBig = ipToBigInt(ip);
  const mask = (BigInt(0xffffffff) << BigInt(32 - prefix)) & BigInt(0xffffffff);
  return (ipBig & mask) === ipBig;
}

function calculateVLSM(
  baseIp: string,
  prefix: number,
  requests: SubnetRequest[]
): SubnetResult[] | string {
  const ipParts = baseIp.split(".").map(Number);
  if (
    ipParts.length !== 4 ||
    ipParts.some((n) => isNaN(n) || n < 0 || n > 255)
  ) {
    return "IP tidak valid";
  }

  if (!isValidNetwork(ipParts, prefix)) {
    return "⚠️ Alamat jaringan tidak sesuai dengan prefix (bukan network address). Contoh: 192.168.0.0/24";
  }

  const baseInt = ipToInt(ipParts) >>> 0;
  let current = baseInt;
  const results: SubnetResult[] = [];

  const sorted = [...requests].sort((a, b) => b.hosts - a.hosts);

  for (const req of sorted) {
    const needed = req.hosts + 2;
    let subnetPrefix = 32;
    while (1 << (32 - subnetPrefix) < needed) subnetPrefix--;

    const blockSize = 1 << (32 - subnetPrefix);

    if (current + blockSize - 1 > baseInt + (1 << (32 - prefix)) - 1) {
      return "⚠️ Kebutuhan subnet melebihi kapasitas network dasar.";
    }

    results.push({
      ...req,
      network: intToIp(current),
      prefix: subnetPrefix,
      mask: prefixToMask(subnetPrefix),
      firstHost: intToIp(current + 1),
      lastHost: intToIp(current + blockSize - 2),
      broadcast: intToIp(current + blockSize - 1),
      total: blockSize,
      usable: blockSize - 2,
    });

    current += blockSize;
  }

  return results;
}

export default function VLSMCalculator() {
  const [baseIp, setBaseIp] = useState("192.168.0.0");
  const [prefix, setPrefix] = useState(24);
  const [requests, setRequests] = useState<SubnetRequest[]>([
    { name: "Subnet A", hosts: 50 },
    { name: "Subnet B", hosts: 20 },
  ]);
  const [results, setResults] = useState<SubnetResult[] | string | null>(null);

  const addRequest = () => {
    setRequests([
      ...requests,
      {
        name: `Subnet ${String.fromCharCode(65 + requests.length)}`,
        hosts: 10,
      },
    ]);
  };

  const updateRequest = (
    index: number,
    key: keyof SubnetRequest,
    value: string | number
  ) => {
    const newReqs = [...requests];
    (newReqs[index] as any)[key] =
      typeof value === "string" ? value : Number(value);
    setRequests(newReqs);
  };

  const removeRequest = (index: number) => {
    setRequests(requests.filter((_, i) => i !== index));
  };

  const calculate = () => {
    setResults(calculateVLSM(baseIp, prefix, requests));
  };

  return (
    <main className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Form */}
      <section className="space-y-6">
        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block font-medium">
            Alamat Jaringan Dasar (IP)
          </label>
          <input
            type="text"
            value={baseIp}
            onChange={(e) => setBaseIp(e.target.value)}
            className="w-full border p-2"
          />
        </div>

        <div className="border border-gray-200 shadow-sm p-4 space-y-2">
          <label className="block font-medium">Prefix (CIDR)</label>
          <input
            type="number"
            min={1}
            max={30}
            value={prefix}
            onChange={(e) => setPrefix(Number(e.target.value))}
            className="w-full border p-2"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Daftar Subnet</h3>
          {requests.map((req, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={req.name}
                onChange={(e) => updateRequest(i, "name", e.target.value)}
                className="flex-1 border p-2"
              />
              <input
                type="number"
                min={1}
                value={req.hosts}
                onChange={(e) =>
                  updateRequest(i, "hosts", Number(e.target.value))
                }
                className="w-24 border p-2"
              />
              <button
                type="button"
                onClick={() => removeRequest(i)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequest}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            + Tambah Subnet
          </button>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700"
        >
          Hitung VLSM
        </button>

        {results && typeof results === "string" && (
          <div className="p-4 bg-red-100 text-red-800 border border-red-200">
            {results}
          </div>
        )}

        {results && Array.isArray(results) && (
          <div className="overflow-x-auto border border-gray-200 mt-4">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Subnet</th>
                  <th className="p-2 border">Network</th>
                  <th className="p-2 border">Mask</th>
                  <th className="p-2 border">Prefix</th>
                  <th className="p-2 border">Usable</th>
                  <th className="p-2 border">Range Host</th>
                  <th className="p-2 border">Broadcast</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td className="border p-1">{r.name}</td>
                    <td className="border p-1">{r.network}</td>
                    <td className="border p-1">{r.mask}</td>
                    <td className="border p-1">/{r.prefix}</td>
                    <td className="border p-1">{r.usable}</td>
                    <td className="border p-1">
                      {r.firstHost} – {r.lastHost}
                    </td>
                    <td className="border p-1">{r.broadcast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Right Column: Info */}
      <section className="hidden lg:flex flex-col border border-gray-200 shadow-sm p-6 bg-gray-50 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Apa itu VLSM?</h2>
        <p>
          <strong>VLSM (Variable Length Subnet Mask)</strong> adalah cara
          membagi sebuah jaringan besar menjadi beberapa jaringan kecil (subnet)
          dengan ukuran berbeda sesuai kebutuhan.
        </p>
        <p>
          Ini berguna kalau ada bagian jaringan yang butuh banyak alamat
          (misalnya untuk ratusan komputer), dan ada juga yang hanya butuh
          sedikit (misalnya untuk 5 perangkat). Dengan VLSM, kita tidak
          membuang-buang alamat IP.
        </p>

        <h3 className="font-semibold text-gray-700">
          Cara Menggunakan Kalkulator:
        </h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-700">
          <li>
            Masukkan <strong>alamat network dasar</strong> (contoh:
            <code className="bg-gray-200 px-1 rounded">192.168.0.0</code>) dan
            prefix (misalnya{" "}
            <code className="bg-gray-200 px-1 rounded">/24</code>).
          </li>
          <li>
            Tambahkan <strong>daftar subnet</strong> yang dibutuhkan, lengkap
            dengan jumlah host (perangkat) di setiap subnet.
          </li>
          <li>
            Klik <strong>Hitung VLSM</strong>. Hasilnya akan menampilkan:
            <ul className="list-disc list-inside ml-4">
              <li>Alamat network tiap subnet</li>
              <li>Subnet mask / prefix</li>
              <li>Jumlah host yang bisa digunakan</li>
              <li>Range alamat host yang valid</li>
              <li>Alamat broadcast</li>
            </ul>
          </li>
        </ol>

        <h3 className="font-semibold text-gray-700">Contoh:</h3>
        <p className="text-sm text-gray-700">
          Jika Anda punya{" "}
          <code className="bg-gray-200 px-1 rounded">192.168.0.0/24</code>
          (256 alamat total), lalu butuh 50 host untuk Lab A, 20 host untuk Lab
          B, dan 10 host untuk Lab C, maka kalkulator akan otomatis membagi
          network supaya tiap subnet pas sesuai kebutuhan.
        </p>

        <p className="text-sm italic text-gray-600">
          ⚠️ Catatan: Kalkulasi ini hanya untuk IPv4. Hasil ini bersifat edukasi
          dan latihan. Untuk implementasi nyata, pastikan konsultasi dengan
          network engineer.
        </p>
      </section>
    </main>
  );
}
