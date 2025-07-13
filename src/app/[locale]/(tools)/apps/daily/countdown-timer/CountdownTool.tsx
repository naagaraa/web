"use client";

import { useState, useEffect, useRef } from "react";

export default function CountdownTool() {
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
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

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
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const formatted = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Countdown Timer</h1>
        <p className="text-gray-600">
          Atur waktu hitung mundur sesuai kebutuhanmu.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xs">
        <div>
          <Label htmlFor="minutes">Menit</Label>
          <Input
            id="minutes"
            type="number"
            min={0}
            max={99}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
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
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleStart} disabled={isRunning}>
          Mulai
        </Button>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>

      <div className="text-4xl font-mono text-center pt-4">{formatted}</div>

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
