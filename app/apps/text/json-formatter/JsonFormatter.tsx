"use client";

import { useState } from "react";
import { ClipboardCheck, Trash2, Code2 } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError("");
    } catch (err: any) {
      setError("JSON tidak valid: " + err.message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (err: any) {
      setError("JSON tidak valid: " + err.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <main className="max-w-4xl mx-auto mt-24 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">JSON Formatter</h1>

      <div className="space-y-4">
        <textarea
          rows={10}
          placeholder="Tempelkan atau ketikkan JSON di sini..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleFormat}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 text-sm"
          >
            <Code2 className="w-4 h-4" /> Format
          </button>

          <button
            onClick={handleMinify}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center gap-1 text-sm"
          >
            <Code2 className="w-4 h-4" /> Minify
          </button>

          <button
            onClick={handleCopy}
            disabled={!output}
            className={`px-4 py-2 rounded flex items-center gap-1 text-sm ${
              output
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ClipboardCheck className="w-4 h-4" /> Salin
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1 text-sm"
          >
            <Trash2 className="w-4 h-4" /> Reset
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm font-medium">{error}</div>
        )}

        {output && (
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          />
        )}
      </div>
    </main>
  );
}
