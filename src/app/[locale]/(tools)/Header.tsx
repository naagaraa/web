"use client";

import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/dev-to.svg";
import Link from "next/link";

export default function Header() {
  const [openUser, setOpenUser] = useState(false);
  const [openSolutions, setOpenSolutions] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-6">
      {/* Logo / Brand */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="Logo" width={24} height={24} />
        <span className="font-semibold text-lg"></span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700 font-medium relative">
        {/* <button
          onClick={() => {
            setOpenProducts(!openProducts);
            setOpenSolutions(false);
          }}
          className="flex items-center gap-1 hover:text-blue-600 transition"
        >
          Products
          <ChevronDown className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            setOpenSolutions(!openSolutions);
            setOpenProducts(false);
          }}
          className="flex items-center gap-1 hover:text-blue-600 transition"
        >
          Solutions
          <ChevronDown className="w-4 h-4" />
        </button> */}

        <Link href={"/pricing"} className="hover:text-blue-600 transition">
          Pricing
        </Link>
        <button className="hover:text-blue-600 transition">Docs</button>
        <button className="hover:text-blue-600 transition">Blog</button>

        {/* Products Dropdown */}
        {/* {openProducts && (
          <div className="absolute top-14 left-0 bg-white border rounded-lg shadow-lg p-4 w-64 z-50">
            <p className="text-xs text-gray-500 mb-2">Our Products</p>
            <div className="space-y-2 text-sm">
              <button className="block w-full text-left hover:text-blue-500">
                🧰 Productivity Tools
              </button>
              <button className="block w-full text-left hover:text-blue-500">
                💍 Wedding Planner
              </button>
            </div>
          </div>
        )} */}

        {/* Solutions Dropdown */}
        {/* {openSolutions && (
          <div className="absolute top-14 left-32 bg-white border rounded-lg shadow-lg p-4 w-64 z-50">
            <p className="text-xs text-gray-500 mb-2">Use Cases</p>
            <div className="space-y-2 text-sm">
              <button className="block w-full text-left hover:text-blue-500">
                Developer Utilities
              </button>
              <button className="block w-full text-left hover:text-blue-500">
                Network Diagnostics
              </button>
              <button className="block w-full text-left hover:text-blue-500">
                File Conversion
              </button>
              <button className="block w-full text-left hover:text-blue-500">
                Event Planning
              </button>
            </div>
          </div>
        )} */}
      </nav>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Mobile user menu */}
        <button
          onClick={() => setOpenUser(!openUser)}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
        >
          <User className="w-6 h-6 text-gray-700" />
        </button>

        {/* Desktop login */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-gray-600 hover:text-blue-600 transition">
            Log in
          </button>
          <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {openUser && (
        <div className="absolute right-4 top-14 w-56 bg-white/70 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4 z-50 md:hidden">
          <p className="text-sm font-medium text-gray-800">👋 Hello, Guest</p>
          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <button className="block w-full text-left hover:text-blue-500">
              Profile
            </button>
            <button className="block w-full text-left hover:text-blue-500">
              Settings
            </button>
            <button className="block w-full text-left hover:text-blue-500">
              Products
            </button>
            <button className="block w-full text-left text-red-500 hover:underline">
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
