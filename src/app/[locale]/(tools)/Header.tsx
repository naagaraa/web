"use client";

import { useState } from "react";
import { Facebook, Github, Mail, Search, User, X } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/dev-to.svg";
import Link from "next/link";

export default function Header() {
  const [openUser, setOpenUser] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<"login" | "register">("login");

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={28} height={28} />
            <span className="font-semibold text-lg">MyTools</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-4 hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search tools, categories..."
                className="w-full rounded-full border border-gray-300 bg-gray-100 pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenLogin(true)}
              className="hidden md:block text-sm text-gray-700 hover:text-blue-600 transition"
            >
              Log in
            </button>
            <Link
              href={"/submit-tool"}
              className="hidden md:block border border-gray-300 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
            >
              Submit a tool
            </Link>
            <Link
              href={"/about"}
              className="hidden md:block border border-gray-300 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
            >
              Dev ?
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpenUser(!openUser)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Bottom nav */}
        <nav className="flex flex-nowrap items-center overflow-x-auto min-w-0 space-x-6 px-4 md:px-6 text-sm text-gray-600 font-medium border-t border-gray-100 py-2">
          <Link
            href="#"
            className="text-black border-b-2 border-black pb-1 whitespace-nowrap"
          >
            Featured
          </Link>
          <Link href="#" className="whitespace-nowrap">
            Calculators
          </Link>
          <Link href="#" className="whitespace-nowrap">
            Mental Health
          </Link>
          <Link href="#" className="whitespace-nowrap">
            PDF Tools
          </Link>
          <Link href="#" className="whitespace-nowrap">
            Image Tools
          </Link>
          <Link href="#" className="whitespace-nowrap">
            Dev Tools
          </Link>
          <Link href="#" className="whitespace-nowrap">
            Utilities
          </Link>
          <Link href="#" className="whitespace-nowrap">
            Network
          </Link>
          <Link href="#" className="whitespace-nowrap">
            Conversion
          </Link>
        </nav>

        {/* Mobile Dropdown */}
        {openUser && (
          <div className="absolute right-4 top-20 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 md:hidden">
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

      {/* Login Modal */}
      {openLogin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl relative">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setOpenLogin(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold">
                {loginMode === "login" ? "Welcome Back" : "Create an Account"}
              </h3>
              <p className="text-sm text-gray-500">
                {loginMode === "login"
                  ? "Login to continue using MyTools"
                  : "Register to start using MyTools"}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex mb-4 border-b border-gray-200">
              <button
                onClick={() => setLoginMode("login")}
                className={`flex-1 text-sm py-2 font-medium ${
                  loginMode === "login"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setLoginMode("register")}
                className={`flex-1 text-sm py-2 font-medium ${
                  loginMode === "register"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form Input */}
            {loginMode === "login" ? (
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </form>
            ) : (
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Register
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="my-4 text-center text-sm text-gray-400">
              or continue with
            </div>

            {/* Social Buttons */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50 transition">
                <Mail className="w-4 h-4" />
                Continue with Email
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50 transition">
                <Github className="w-4 h-4" />
                Continue with GitHub
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50 transition">
                <Facebook className="w-4 h-4 text-blue-600" />
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
