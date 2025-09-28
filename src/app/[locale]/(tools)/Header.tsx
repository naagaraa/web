"use client";

import { useState } from "react";
import { Facebook, Github, Mail, Search, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/dev-to.svg";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<"login" | "register">("login");

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
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
                className="w-full rounded-full border border-zinc-300 bg-zinc-100 pl-4 pr-10 py-2 text-sm outline-none focus:outline focus:outline-blue-500 focus:bg-white"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenLogin(true)}
              className="hidden md:block text-sm text-zinc-700 hover:text-blue-600 transition-colors"
            >
              Log in
            </button>
            <Link
              href="/submit-tool"
              className="hidden md:block border border-zinc-300 text-sm px-3 py-1.5 rounded-md hover:bg-zinc-100 transition-colors"
            >
              Submit a tool
            </Link>
            <Link
              href="/about"
              className="hidden md:block border border-zinc-300 text-sm px-3 py-1.5 rounded-md hover:bg-zinc-100 transition-colors"
            >
              Dev ?
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-full hover:bg-zinc-100 transition-colors">
              <User className="w-5 h-5 text-zinc-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {openLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenLogin(false)}
          />

          {/* Modal content */}
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800"
              onClick={() => setOpenLogin(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold">
                {loginMode === "login" ? "Welcome Back" : "Create an Account"}
              </h3>
              <p className="text-sm text-zinc-500">
                {loginMode === "login"
                  ? "Login to continue using MyTools"
                  : "Register to start using MyTools"}
              </p>
            </div>

            <div className="flex mb-4 border-b border-zinc-200">
              <button
                onClick={() => setLoginMode("login")}
                className={`flex-1 text-sm py-2 font-medium ${
                  loginMode === "login"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-zinc-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setLoginMode("register")}
                className={`flex-1 text-sm py-2 font-medium ${
                  loginMode === "register"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-zinc-500"
                }`}
              >
                Register
              </button>
            </div>

            {/* Forms */}
            {loginMode === "login" ? (
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </form>
            ) : (
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </form>
            )}

            <div className="my-4 text-center text-sm text-zinc-400">
              or continue with
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-colors">
                <Mail className="w-4 h-4" />
                Continue with Email
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-colors">
                <Github className="w-4 h-4" />
                Continue with GitHub
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-colors">
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
