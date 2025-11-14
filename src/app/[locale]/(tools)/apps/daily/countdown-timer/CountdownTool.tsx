"use client";

import { useState, useEffect, useRef } from "react";
import { ShieldCheck, FileText, Timer } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function CountdownTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
      toast.success("Hitung mundur dimulai!", { duration: 1500 });
    } else {
      toast.error("Masukkan waktu yang valid.");
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    toast.success("Timer direset.", { duration: 1000 });
  };

  const handleBack = () => {
    handleReset();
    setIsEditing(false);
  };

  const handleStartEditing = () => setIsEditing(true);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      toast.success("Waktu habis! ⏰", { duration: 3000 });
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const formatted = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  // ✅ MODE AWAL: TAMPILAN PROMOSI
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Timer className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Countdown Timer Online
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Set a countdown for workouts, meetings, or cooking — with alarm
            sound.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Hitung Mundur
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
      title="Countdown"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled:
          !isRunning && timeLeft === 0 && minutes === 0 && seconds === 0,
        loading: false,
      }}
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minutes">Menit</Label>
            <Input
              id="minutes"
              type="number"
              min={0}
              max={99}
              value={minutes}
              onChange={(e) =>
                setMinutes(Math.max(0, Math.min(99, Number(e.target.value))))
              }
              disabled={isRunning}
            />
          </div>
          <div>
            <Label htmlFor="seconds">Detik</Label>
            <Input
              id="seconds"
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) =>
                setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))
              }
              disabled={isRunning}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleStart}
            disabled={isRunning || (minutes === 0 && seconds === 0)}
            className="flex-1"
          >
            Mulai
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset
          </Button>
        </div>

        <div className="text-5xl font-mono text-center text-blue-600 font-bold">
          {formatted}
        </div>

        <audio ref={audioRef} src="/audio/alarm-1.wav" preload="auto" />
      </div>
    </NativeToolLayout>
  );
}

// 🔽 Inline Components
function Button({
  children,
  className = "",
  variant,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "default";
}) {
  return (
    <button
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
        variant === "outline"
          ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full bg-white ${className}`}
    />
  );
}

function Label({
  children,
  htmlFor,
  className = "",
}: {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 block ${className}`}
    >
      {children}
    </label>
  );
}
