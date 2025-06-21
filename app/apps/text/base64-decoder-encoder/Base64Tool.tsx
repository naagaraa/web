"use client";

import { useState } from "react";
import { Copy, Trash } from "lucide-react";

// UI Components
const Button = ({
  children,
  onClick,
  variant = "default",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "destructive";
  disabled?: boolean;
}) => {
  const base = "px-4 py-2 rounded text-sm flex items-center";
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

const Textarea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-2 border border-gray-300 rounded font-mono text-sm"
  />
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded border border-gray-200 shadow-sm">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);

// Main Component
export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError("");
    } catch (err) {
      setOutput("");
      setError("Input tidak valid untuk proses decoding.");
    }
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <main className="max-w-3xl mx-auto mt-24 p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Base64 Encoder & Decoder
      </h1>
      <p className="text-sm text-center text-gray-600">
        Encode atau decode teks menggunakan format Base64.
      </p>

      <div className="flex justify-center gap-4">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
        >
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
        >
          Decode
        </Button>
        <Button variant="destructive" onClick={reset}>
          <Trash className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      <Textarea
        placeholder={`Masukkan teks untuk di-${mode}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
      />

      <Button onClick={handleConvert}>Convert</Button>

      {error && (
        <p className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
          {error}
        </p>
      )}

      {output && (
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">Hasil</span>
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(output);
                    alert("Hasil disalin ke clipboard.");
                  } catch {
                    alert("Gagal menyalin.");
                  }
                }}
              >
                <Copy className="w-4 h-4 mr-1" /> Salin
              </Button>
            </div>
            <pre className="whitespace-pre-wrap text-sm break-all">
              {output}
            </pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
