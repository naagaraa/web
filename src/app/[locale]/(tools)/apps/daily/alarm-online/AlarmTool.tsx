"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ShieldCheck, FileText, Bell, Volume2 } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

const soundOptions = [
  { label: "Alarm 1", value: "alarm-1.wav" },
  { label: "Alarm 2", value: "alarm-2.wav" },
  { label: "Alarm 3", value: "alarm-3.wav" },
];

export default function AlarmTool() {
  const [isEditing, setIsEditing] = useState(false);
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
        setTimeout(play, 2000);
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
          toast.success("Alarm berbunyi!", { duration: 3000 });
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
    toast.success(`Alarm diatur: ${alarmTime}`, { duration: 2000 });
  };

  const handleClear = () => {
    setIsAlarmSet(false);
    setAlarmTime("");
    setMessage("Alarm dibatalkan.");
    setCountdown("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    toast.success("Alarm dibatalkan.", { duration: 1500 });
  };

  const handleTestSound = () => {
    audioRef.current?.play();
  };

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => {
    handleClear();
    setIsEditing(false);
  };

  // ✅ MODE AWAL: TAMPILAN PROMOSI
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Set Online Alarm
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Set a timer alarm directly in your browser — with custom sound and
            repeat.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Set Alarm
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
      title="Alarm"
      onBack={handleBack}
      actionButton={{
        label: "Reset",
        onClick: handleClear,
        disabled: !isAlarmSet && !alarmTime,
        loading: false,
      }}
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-md mx-auto w-full space-y-5">
        <div className="space-y-2">
          <Label htmlFor="alarm-time">Waktu Alarm</Label>
          <Input
            id="alarm-time"
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
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
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }}
          >
            {soundOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Button onClick={handleTestSound} className="w-full">
            <Volume2 className="size-3.5 mr-1.5" /> Tes Suara
          </Button>
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

        <Button
          onClick={handleSetAlarm}
          disabled={isAlarmSet || !alarmTime}
          className="w-full"
        >
          Set Alarm
        </Button>

        {message && (
          <p className="text-sm text-green-600 text-center">{message}</p>
        )}

        {isAlarmSet && countdown && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Hitung Mundur:</p>
            <p className="text-3xl font-bold text-blue-600">{countdown}</p>
          </div>
        )}

        <audio ref={audioRef} src={`/audio/${selectedSound}`} preload="auto" />
      </div>
    </NativeToolLayout>
  );
}

// 🔽 Inline Components (disesuaikan dengan Tailwind)
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

function Select({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full bg-white ${className}`}
    />
  );
}
