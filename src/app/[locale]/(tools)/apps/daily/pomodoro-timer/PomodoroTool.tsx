"use client";

import { useEffect, useRef, useState } from "react";

const POMODORO_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

export default function PomodoroTool() {
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

            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setIsBreak((prevBreak) => !prevBreak);
            return isBreak ? POMODORO_DURATION : BREAK_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, isBreak]);

  const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(
    2,
    "0"
  )}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
      <p className="text-gray-600">
        Teknik Pomodoro: 25 menit kerja, 5 menit istirahat. Sempurna untuk tetap
        fokus.
      </p>

      <div className="text-5xl text-center font-mono">{formatted}</div>
      <div className="text-center text-sm text-muted-foreground">
        {isBreak ? "Waktunya Istirahat 🧘" : "Waktunya Fokus 🚀"}
      </div>

      <div className="flex gap-4">
        <Button onClick={() => setIsRunning(true)} disabled={isRunning}>
          Mulai
        </Button>
        <Button onClick={() => setIsRunning(false)} variant="outline">
          Jeda
        </Button>
        <Button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(POMODORO_DURATION);
            setIsBreak(false);
          }}
        >
          Reset
        </Button>
      </div>

      <audio ref={audioRef} src="/audio/alarm-1.wav" preload="auto" />
    </div>
  );
}

// Inline Components
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
      className={`px-4 py-2 rounded text-sm font-medium transition ${
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
      className={`border border-gray-300 rounded px-3 py-2 text-sm w-full ${className}`}
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

function Select({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`border border-gray-300 rounded px-3 py-2 text-sm w-full ${className}`}
    />
  );
}
