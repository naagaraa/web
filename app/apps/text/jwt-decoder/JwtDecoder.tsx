"use client";

import { useState } from "react";
import { Copy, Trash } from "lucide-react";
import toast from "react-hot-toast";

// Local Button component
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

// Local Card component
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded border border-gray-200 shadow-sm">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);

// Local Textarea component
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

// JWT Decoder Main
export default function JwtDecoder() {
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

  return (
    <main className="max-w-3xl mx-auto mt-24 space-y-6 p-4">
      <h1 className="text-2xl font-bold text-center">JWT Decoder</h1>
      <p className="text-sm text-center text-gray-600">
        Paste token JWT Anda untuk melihat detail header dan payload.
      </p>

      <p className="text-sm text-center text-gray-600">
        Tempel token JWT Anda untuk melihat detail bagian{" "}
        <code className="bg-gray-100 px-1 rounded">header</code> dan{" "}
        <code className="bg-gray-100 px-1 rounded">payload</code>. Token JWT
        terdiri dari 3 bagian yang dipisahkan oleh titik:{" "}
        <code>header.payload.signature</code>.
      </p>
      <p className="text-sm text-center text-gray-600">
        Contoh token JWT:
        <br />
        <code className="text-xs break-all bg-gray-100 rounded px-2 py-1 inline-block mt-2">
          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkaXR5YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MDAwMDAwMH0.DxDJ8o0Fb_qCG-lvbgL0KD05zAJrUNo9FRap5wwJZ4U
        </code>
      </p>

      <Textarea
        placeholder="Masukkan token JWT di sini..."
        value={token}
        onChange={(e) => handleInputChange(e.target.value)}
        rows={4}
      />

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(token);
              toast.success("Token berhasil disalin ke clipboard!");
            } catch (err) {
              toast.error("Gagal menyalin token.");
            }
          }}
          disabled={!token}
        >
          <Copy className="w-4 h-4 mr-1" /> Salin Token
        </Button>

        <Button variant="destructive" onClick={() => setToken("")}>
          <Trash className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded">
          {error}
        </p>
      )}

      {!error && (header || payload) && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h2 className="font-semibold mb-2 text-sm">Header</h2>
              <pre className="text-xs whitespace-pre-wrap break-all">
                {header}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-semibold mb-2 text-sm">Payload</h2>
              <pre className="text-xs whitespace-pre-wrap break-all">
                {payload}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
