"use client";

import { useState } from "react";
import {
  Code2,
  ClipboardCheck,
  Trash2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function JsonFormatter() {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast.success("JSON berhasil disalin!", {
        duration: 2000,
        position: "bottom-center",
      });
    } catch (err) {
      toast.error("Gagal menyalin JSON.", {
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
            Format & minify JSON
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Beautify or minify your JSON code instantly — all in your browser.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Format JSON
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
      title="JSON Formatter"
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
            onClick={handleFormat}
            className="flex-1 min-w-[100px] py-2 bg-blue-600 text-white rounded text-sm font-medium flex items-center justify-center gap-1"
          >
            <Code2 className="size-3.5" /> Format
          </button>

          <button
            onClick={handleMinify}
            className="flex-1 min-w-[100px] py-2 bg-gray-700 text-white rounded text-sm font-medium flex items-center justify-center gap-1"
          >
            <Code2 className="size-3.5" /> Minify
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
            <ClipboardCheck className="size-3.5" /> Salin
          </button>
        </div>
      }
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-3xl mx-auto w-full space-y-4">
        <textarea
          rows={10}
          placeholder="Tempelkan atau ketikkan JSON di sini..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <div className="text-red-600 text-sm font-medium p-2 bg-red-100 rounded">
            {error}
          </div>
        )}

        {output && (
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono bg-gray-50 text-gray-800"
          />
        )}
      </div>
    </NativeToolLayout>
  );
}
