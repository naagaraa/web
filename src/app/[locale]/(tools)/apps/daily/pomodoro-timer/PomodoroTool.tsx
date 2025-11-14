"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, FileText, Clock } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

const POMODORO_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

export default function PomodoroTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (audioRef.current) audioRef.current.play();
            toast.success(
              isBreak ? "Istirahat selesai! 🚀" : "Waktu fokus habis! 🧘",
              {
                duration: 3000,
              }
            );

            clearInterval(intervalRef.current!);
            setIsRunning(false);
            const nextIsBreak = !isBreak;
            setIsBreak(nextIsBreak);
            return nextIsBreak ? BREAK_DURATION : POMODORO_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isBreak]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      toast.success("Pomodoro dimulai!", { duration: 1500 });
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
      toast("Dijeda.", { duration: 1000 });
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(POMODORO_DURATION);
    setIsBreak(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    toast.success("Timer direset.", { duration: 1000 });
  };

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => {
    handleReset();
    setIsEditing(false);
  };

  const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(
    2,
    "0"
  )}:${String(secondsLeft % 60).padStart(2, "0")}`;

  // ✅ MODE AWAL: TAMPILAN PROMOSI
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Pomodoro Timer
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Boost productivity with 25-minute focus sessions and 5-minute
            breaks.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Mulai Pomodoro
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
      title="Pomodoro"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleReset,
        disabled: false,
        loading: false,
      }}
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-6xl text-center font-mono font-bold text-blue-600">
          {formatted}
        </div>

        <div className="text-center text-sm text-gray-600">
          {isBreak ? "Waktunya Istirahat 🧘" : "Waktunya Fokus 🚀"}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleStart} disabled={isRunning} className="flex-1">
            Mulai
          </Button>
          <Button onClick={handlePause} variant="outline" className="flex-1">
            Jeda
          </Button>
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
