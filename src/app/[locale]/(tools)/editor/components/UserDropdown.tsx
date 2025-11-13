"use client";

import { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Klik luar nutup dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <UserCircle className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dropdown: muncul di kanan luar sidebar */}
      {open && (
        <div className="absolute left-full bottom-[calc(50%-20px)] ml-2 w-48 bg-white border rounded-lg shadow-lg p-3 z-50">
          <p className="text-sm font-medium">👋 Hello, Guest</p>
          <div className="mt-2 text-sm text-gray-600">
            <button className="w-full text-left py-1 hover:text-blue-500">
              Profile
            </button>
            <button className="w-full text-left py-1 hover:text-blue-500">
              Settings
            </button>
            <button className="w-full text-left py-1 text-red-500 hover:underline">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
