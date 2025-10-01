"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserWarning() {
  const [showPopup, setShowPopup] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Detect OS
  const detectOS = () => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/android/i.test(ua)) return "Android";
    if (
      /iPad|iPhone|iPod/.test(ua) &&
      !(typeof window !== "undefined" && "MSStream" in window)
    )
      return "iOS";
    if (/Win/i.test(ua)) return "Windows";
    if (/Mac/i.test(ua)) return "macOS";
    if (/Linux/i.test(ua)) return "Linux";
    return "Unknown";
  };

  // Detect in-app browser
  const isInAppBrowser = () => {
    const ua = navigator.userAgent || navigator.vendor;
    return (
      ua.includes("Instagram") ||
      ua.includes("FBAN") ||
      ua.includes("FBAV") ||
      ua.includes("Line") ||
      ua.includes("WhatsApp")
    );
  };

  // Detect localhost or local IP
  const isLocalDev = () => {
    const hostname = window.location.hostname;
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)
    );
  };

  // Detect if PWA installed
  const isPWAInstalled = () => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    );
  };

  useEffect(() => {
    const os = detectOS();
    setIsAndroid(os === "Android");
    setIsIOS(os === "iOS");

    const alreadyOpened = localStorage.getItem("inAppBrowserOpened");

    if (
      !alreadyOpened &&
      (isLocalDev() || isInAppBrowser()) &&
      !isPWAInstalled()
    ) {
      setShowPopup(true);
    }
  }, []);

  const openInBrowser = () => {
    localStorage.setItem("inAppBrowserOpened", "true"); // simpan supaya popup gak muncul lagi

    if (isAndroid) {
      window.location.href =
        "intent://nagara.netlify.app/en#Intent;scheme=https;package=com.android.chrome;end";
    } else if (isIOS) {
      alert(
        "Untuk iOS: klik ikon Share (⤴️) di pojok kanan atas, lalu pilih 'Open in Safari'."
      );
    } else {
      window.open("https://nagara.netlify.app/en", "_blank");
    }

    setShowPopup(false);
  };

  const closePopup = () => setShowPopup(false);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-bold mb-2">Open in Browser</h2>
        <p className="text-sm mb-4">
          Untuk pengalaman lebih baik, silakan buka website ini di browser asli
          (Chrome / Safari).
        </p>
        <button
          onClick={openInBrowser}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Open in Browser
        </button>
      </div>
    </div>
  );
}
