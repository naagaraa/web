"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const soundOptions = [
  { label: "Alarm 1", value: "alarm-1.wav" },
  { label: "Alarm 2", value: "alarm-2.wav" },
  { label: "Alarm 3", value: "alarm-3.wav" },
];

export default function AlarmTool() {
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSound, setSelectedSound] = useState("alarm-1.wav");
  const [countdown, setCountdown] = useState("");
  const [repeatCount, setRepeatCount] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const repeatRef = useRef(1);

  const handlePlayWithRepeat = useCallback(() => {
    repeatRef.current = repeatCount;
    const play = () => {
      if (repeatRef.current > 0) {
        audioRef.current?.play();
        repeatRef.current--;
        setTimeout(play, 2000); // Delay 2 detik antar bunyi
      }
    };
    play();
  }, [repeatCount]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAlarmSet) {
      interval = setInterval(() => {
        const now = new Date();
        const [h, m] = alarmTime.split(":").map(Number);
        const alarmDate = new Date();
        alarmDate.setHours(h, m, 0, 0);

        const diffMs = alarmDate.getTime() - now.getTime();

        if (diffMs <= 0) {
          setMessage("⏰ Alarm Berbunyi!");
          handlePlayWithRepeat();
          setIsAlarmSet(false);
          setCountdown("");
          clearInterval(interval);
        } else {
          const minutes = Math.floor(diffMs / 60000);
          const seconds = Math.floor((diffMs % 60000) / 1000);
          setCountdown(
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
              2,
              "0"
            )}`
          );
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [alarmTime, isAlarmSet, handlePlayWithRepeat]);

  const handleSetAlarm = () => {
    if (!alarmTime) return;
    setIsAlarmSet(true);
    setMessage(`Alarm diatur untuk jam ${alarmTime}`);
  };

  const handleClear = () => {
    setIsAlarmSet(false);
    setAlarmTime("");
    setMessage("Alarm dibatalkan.");
    setCountdown("");
    audioRef.current?.pause();
    audioRef.current!.currentTime = 0;
  };

  const handleTestSound = () => {
    audioRef.current?.play();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Alarm Online</h1>
      <p className="text-sm text-gray-500">
        Setel alarm di browser kamu. Format waktu 24 jam (contoh: 14:30).
      </p>

      <div className="space-y-2">
        <Label htmlFor="alarm-time">Waktu Alarm</Label>
        <Input
          id="alarm-time"
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          className="w-48"
          disabled={isAlarmSet}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sound">Pilih Suara Alarm</Label>
        <Select
          id="sound"
          value={selectedSound}
          onChange={(e) => {
            setSelectedSound(e.target.value);
            audioRef.current?.pause();
            audioRef.current!.currentTime = 0;
          }}
        >
          {soundOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
        <Button onClick={handleTestSound}>🔊 Tes Suara</Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="repeat">Berapa Kali Repeat?</Label>
        <Select
          id="repeat"
          value={repeatCount}
          onChange={(e) => setRepeatCount(Number(e.target.value))}
        >
          {[1, 2, 3, 5, 10].map((n) => (
            <option key={n} value={n}>
              {n}x
            </option>
          ))}
        </Select>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSetAlarm} disabled={isAlarmSet || !alarmTime}>
          Set Alarm
        </Button>
        <Button onClick={handleClear} variant="outline">
          Reset
        </Button>
      </div>

      {message && <p className="text-sm text-green-600">{message}</p>}

      {isAlarmSet && countdown && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Hitung Mundur:</p>
          <p className="text-3xl font-bold text-blue-600">{countdown}</p>
        </div>
      )}

      <audio ref={audioRef} src={`/audio/${selectedSound}`} preload="auto" />
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
