"use client";
import { useState } from "react";
import CryptoJS from "crypto-js";
import blake from "blakejs";

export default function HashTool() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({
    sha1: "",
    sha256: "",
    sha384: "",
    sha512: "",
    md5: "",
    ripemd160: "",
    blake2b: "",
  });
  const [activeTab, setActiveTab] = useState("hash");

  const handleGenerate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const getHash = async (algorithm: AlgorithmIdentifier) => {
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    setHashes({
      sha1: await getHash("SHA-1"),
      sha256: await getHash("SHA-256"),
      sha384: await getHash("SHA-384"),
      sha512: await getHash("SHA-512"),
      md5: CryptoJS.MD5(input).toString(),
      ripemd160: CryptoJS.RIPEMD160(input).toString(),
      blake2b: blake.blake2bHex(data),
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hash Generator</h1>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "hash" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("hash")}
        >
          Generator
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "desc" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("desc")}
        >
          Deskripsi
        </button>
      </div>

      {activeTab === "desc" ? (
        <div className="bg-gray-100 p-4 rounded text-sm break-all">
          <p className="mb-1 select-all break-all">
            <strong>MD5</strong>: Cepat, tapi sudah tidak aman untuk keamanan
            tinggi.
          </p>
          <p className="mb-1 select-all break-all">
            <strong>SHA-1</strong>: Mulai ditinggalkan karena rawan collision.
          </p>
          <p className="mb-1 select-all break-all">
            <strong>SHA-256 / 384 / 512</strong>: Aman dan banyak digunakan di
            aplikasi modern.
          </p>
          <p className="mb-1 select-all break-all">
            <strong>RIPEMD-160</strong>: Sering digunakan di dunia
            cryptocurrency.
          </p>
          <p className="mb-1 select-all break-all">
            <strong>BLAKE2b</strong>: Sangat cepat dan aman, alternatif modern
            untuk SHA.
          </p>
        </div>
      ) : (
        <>
          <textarea
            className="w-full border rounded p-2 mb-4 resize-none"
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan teks yang ingin di-hash..."
          />

          <button
            onClick={handleGenerate}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Generate Hash
          </button>

          <div className="px-4 py-6 sm:px-6 md:px-8 max-w-4xl mx-auto w-full">
            <p className="mb-1 select-all break-all ">
              <strong>SHA-1:</strong> {hashes.sha1}
            </p>
            <p className="mb-1 select-all break-all">
              <strong>SHA-256:</strong> {hashes.sha256}
            </p>
            <p className="mb-1 select-all break-all">
              <strong>SHA-384:</strong> {hashes.sha384}
            </p>
            <p className="mb-1 select-all break-all">
              <strong>SHA-512:</strong> {hashes.sha512}
            </p>
            <p className="mb-1 select-all break-all">
              <strong>MD5:</strong> {hashes.md5}
            </p>
            <p className="mb-1 select-all break-all">
              <strong>RIPEMD-160:</strong> {hashes.ripemd160}
            </p>
            <p className="mb-1 select-all break-all">
              <strong>BLAKE2b:</strong> {hashes.blake2b}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
