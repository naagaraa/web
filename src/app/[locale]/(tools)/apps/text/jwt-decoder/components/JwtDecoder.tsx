"use client";

import { useState, useEffect } from "react";
import { Copy, Trash, FileText, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function JwtDecoder() {
  const [isEditing, setIsEditing] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");

  const decodeJWT = (input: string) => {
    const parts = input.split(".");
    if (parts.length !== 3) {
      setError("Token JWT harus memiliki 3 bagian (header.payload.signature)");
      setHeader("");
      setPayload("");
      return;
    }

    try {
      const h = atob(parts[0]);
      const p = atob(parts[1]);
      setHeader(JSON.stringify(JSON.parse(h), null, 2));
      setPayload(JSON.stringify(JSON.parse(p), null, 2));
      setError("");
    } catch {
      setError("Format JWT tidak valid atau tidak dapat didekode.");
      setHeader("");
      setPayload("");
    }
  };

  const handleInputChange = (val: string) => {
    setToken(val);
    if (val.trim() === "") {
      setHeader("");
      setPayload("");
      setError("");
      return;
    }
    decodeJWT(val);
  };

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success("Token berhasil disalin!", {
        duration: 2000,
        position: "bottom-center",
      });
    } catch (err) {
      toast.error("Gagal menyalin token.", {
        duration: 2500,
        position: "bottom-center",
      });
    }
  };

  const handleReset = () => {
    setToken("");
    setHeader("");
    setPayload("");
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
            Decode JWT tokens
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Paste your JWT to see header and payload in a human-readable format.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Decode JWT
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
      title="JWT Decoder"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled: !token,
        loading: false,
      }}
      topControls={
        <div className="px-2">
          <button
            onClick={handleCopyToken}
            disabled={!token}
            className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
              token
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <Copy className="size-3.5" />
              Salin Token
            </div>
          </button>
        </div>
      }
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-3xl mx-auto w-full space-y-5">
        <Textarea
          placeholder="Masukkan token JWT di sini..."
          value={token}
          onChange={(e) => handleInputChange(e.target.value)}
          rows={4}
        />

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        {!error && (header || payload) && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent>
                <h2 className="font-semibold mb-2 text-sm">Header</h2>
                <pre className="text-xs whitespace-pre-wrap break-all font-mono">
                  {header}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="font-semibold mb-2 text-sm">Payload</h2>
                <pre className="text-xs whitespace-pre-wrap break-all font-mono">
                  {payload}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Informasi tambahan di bawah */}
        <div className="text-xs text-gray-600 space-y-2">
          <p>
            Token JWT terdiri dari 3 bagian yang dipisahkan titik:{" "}
            <code className="bg-gray-100 px-1 rounded">
              header.payload.signature
            </code>
          </p>
          <p className="font-mono text-[10px] break-all bg-gray-100 p-2 rounded">
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkaXR5YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDAwMDAwMH0.DxDJ8o0Fb_qCG-lvbgL0KD05zAJrUNo9FRap5wwJZ4U
          </p>
        </div>
      </div>
    </NativeToolLayout>
  );
}

// 🔽 Komponen lokal (dipindahkan ke dalam file yang sama untuk konsistensi)
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
