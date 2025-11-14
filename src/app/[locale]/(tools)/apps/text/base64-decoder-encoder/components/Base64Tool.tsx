"use client";

import { useState } from "react";
import { Copy, Trash, FileText, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function Base64Tool() {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Hasil berhasil disalin!", {
        duration: 2000,
        position: "bottom-center",
      });
    } catch (err) {
      toast.error("Gagal menyalin hasil.", {
        duration: 2500,
        position: "bottom-center",
      });
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    toast.success("Input direset.", {
      duration: 1500,
      position: "bottom-center",
    });
  };

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => setIsEditing(false);

  // ✅ MODE AWAL: TAMPILAN PROMOSI
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Base64 Encoder & Decoder
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Encode text to Base64 or decode it back — all in your browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Konversi
          </button>

          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            100% client-side • No data leaves your device
          </div>
        </div>
      </div>
    );
  }

  // ✅ MODE EDITING: PAKAI NATIVE TOOL LAYOUT
  return (
    <NativeToolLayout
      title="Base64"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled: !input && !output,
        loading: false,
      }}
      topControls={
        <div className="px-2 flex flex-wrap gap-2">
          <button
            onClick={() => setMode("encode")}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium ${
              mode === "encode"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Encode
          </button>

          <button
            onClick={() => setMode("decode")}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium ${
              mode === "decode"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Decode
          </button>

          <button
            onClick={handleCopy}
            disabled={!output}
            className={`flex-1 min-w-[100px] py-2 rounded text-sm font-medium flex items-center justify-center gap-1 ${
              output
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Copy className="size-3.5" /> Salin
          </button>
        </div>
      }
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-3xl mx-auto w-full space-y-5">
        <Textarea
          placeholder={`Masukkan teks untuk di-${mode}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
        />

        <button
          onClick={handleConvert}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700"
        >
          Convert
        </button>

        {error && (
          <div className="text-red-600 text-sm font-medium p-2 bg-red-100 rounded">
            {error}
          </div>
        )}

        {output && (
          <Card>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm break-all font-mono">
                {output}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </NativeToolLayout>
  );
}

// 🔽 Komponen lokal
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
    className="w-full p-2.5 border border-gray-300 rounded-lg font-mono text-sm bg-white"
  />
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-gray-200 bg-white">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-3">{children}</div>
);
