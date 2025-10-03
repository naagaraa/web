"use client";

import { useState, useEffect } from "react";
import { User, X, Search, Mail, Github, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/dev-to.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Premium SaaS Header */}
      <header
        className={`sticky top-0 z-50 border-b border-white/20 transition-all duration-300
          ${
            scrolled
              ? "bg-gradient-to-r from-white/40 via-white/30 to-white/40 backdrop-blur-xl shadow-2xl"
              : "bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-lg"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={28} height={28} />
            <span className="font-semibold text-lg text-zinc-800">MyTools</span>
          </Link>

          {/* Desktop search */}
          <div className="flex-1 mx-4 hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search tools, categories..."
                className="w-full rounded-full border border-white/30 bg-white/20 pl-4 pr-10 py-2 text-sm text-zinc-800
                           placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:bg-white/40
                           transition-all duration-300 backdrop-blur-md"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenLogin(true)}
              className="hidden md:block text-sm text-zinc-700 hover:text-blue-600 transition-colors"
            >
              Log in
            </button>
            <Link
              href="/submit-tool"
              className="hidden md:block border border-white/30 text-sm px-3 py-1.5 rounded-md hover:bg-white/20 hover:border-white/40 transition-all"
            >
              Submit a tool
            </Link>
            <Link
              href="/about"
              className="hidden md:block border border-white/30 text-sm px-3 py-1.5 rounded-md hover:bg-white/20 hover:border-white/40 transition-all"
            >
              Dev ?
            </Link>

            <button
              onClick={() => setOpenMenu(true)}
              className="md:hidden p-2 rounded-full hover:bg-white/20 transition-all"
            >
              <User className="w-5 h-5 text-zinc-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {openMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenMenu(false)}
          />
          <div className="w-72 bg-white/70 backdrop-blur-lg shadow-2xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-lg">Menu</span>
              <button onClick={() => setOpenMenu(false)}>
                <X className="w-5 h-5 text-zinc-600" />
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full rounded-md border border-zinc-300 bg-zinc-100/50 pl-3 pr-9 py-2 text-sm outline-none focus:outline focus:outline-blue-500 focus:bg-white/40 backdrop-blur-sm"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
            </div>

            <button
              onClick={() => {
                setOpenLogin(true);
                setOpenMenu(false);
              }}
              className="text-sm text-left px-3 py-2 rounded-md hover:bg-zinc-100 transition-all"
            >
              Log in
            </button>
            <Link
              href="/submit-tool"
              className="text-sm px-3 py-2 rounded-md hover:bg-zinc-100 transition-all"
              onClick={() => setOpenMenu(false)}
            >
              Submit a tool
            </Link>
            <Link
              href="/about"
              className="text-sm px-3 py-2 rounded-md hover:bg-zinc-100 transition-all"
              onClick={() => setOpenMenu(false)}
            >
              Dev ?
            </Link>
          </div>
        </div>
      )}

      {/* Login/Register Modal */}
      {openLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenLogin(false)}
          />

          <div className="relative w-full max-w-md bg-white backdrop-blur-xl rounded-2xl shadow-2xl p-6">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800"
              onClick={() => setOpenLogin(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tabs */}
            <div className="flex mb-4 rounded-full bg-zinc-100/50 p-1">
              <button
                onClick={() => setLoginMode("login")}
                className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
                  loginMode === "login"
                    ? "bg-white shadow text-blue-600"
                    : "text-zinc-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setLoginMode("register")}
                className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
                  loginMode === "register"
                    ? "bg-white shadow text-blue-600"
                    : "text-zinc-500"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            {loginMode === "login" ? (
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500 backdrop-blur-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500 backdrop-blur-sm"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-all">
                  Login
                </button>
              </form>
            ) : (
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500 backdrop-blur-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500 backdrop-blur-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500 backdrop-blur-sm"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-all">
                  Register
                </button>
              </form>
            )}

            <div className="my-4 text-center text-sm text-zinc-400">
              or continue with
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-all">
                <Mail className="w-4 h-4" /> Continue with Email
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-all">
                <Github className="w-4 h-4" /> Continue with GitHub
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-all">
                <Facebook className="w-4 h-4 text-blue-600" /> Continue with
                Facebook
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
