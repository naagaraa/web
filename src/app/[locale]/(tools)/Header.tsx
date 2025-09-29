// "use client";

// import { useState } from "react";
// import { Facebook, Github, Mail, Search, User, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import logo from "@/assets/dev-to.svg";

// export default function Header() {
//   const [openLogin, setOpenLogin] = useState(false);
//   const [loginMode, setLoginMode] = useState<"login" | "register">("login");

//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
//         <div className="flex items-center justify-between px-4 py-3 md:px-6">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <Image src={logo} alt="Logo" width={28} height={28} />
//             <span className="font-semibold text-lg">MyTools</span>
//           </Link>

//           {/* Search Bar */}
//           <div className="flex-1 mx-4 hidden md:flex">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search tools, categories..."
//                 className="w-full rounded-full border border-zinc-300 bg-zinc-100 pl-4 pr-10 py-2 text-sm outline-none focus:outline focus:outline-blue-500 focus:bg-white"
//               />
//               <Search className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
//             </div>
//           </div>

//           {/* Right Controls */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setOpenLogin(true)}
//               className="hidden md:block text-sm text-zinc-700 hover:text-blue-600 transition-colors"
//             >
//               Log in
//             </button>
//             <Link
//               href="/submit-tool"
//               className="hidden md:block border border-zinc-300 text-sm px-3 py-1.5 rounded-md hover:bg-zinc-100 transition-colors"
//             >
//               Submit a tool
//             </Link>
//             <Link
//               href="/about"
//               className="hidden md:block border border-zinc-300 text-sm px-3 py-1.5 rounded-md hover:bg-zinc-100 transition-colors"
//             >
//               Dev ?
//             </Link>

//             {/* Mobile menu toggle */}
//             <button className="md:hidden p-2 rounded-full hover:bg-zinc-100 transition-colors">
//               <User className="w-5 h-5 text-zinc-700" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Login Modal */}
//       {openLogin && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//             onClick={() => setOpenLogin(false)}
//           />

//           {/* Modal content */}
//           <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
//             <button
//               className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800"
//               onClick={() => setOpenLogin(false)}
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div className="text-center mb-4">
//               <h3 className="text-xl font-semibold">
//                 {loginMode === "login" ? "Welcome Back" : "Create an Account"}
//               </h3>
//               <p className="text-sm text-zinc-500">
//                 {loginMode === "login"
//                   ? "Login to continue using MyTools"
//                   : "Register to start using MyTools"}
//               </p>
//             </div>

//             <div className="flex mb-4 border-b border-zinc-200">
//               <button
//                 onClick={() => setLoginMode("login")}
//                 className={`flex-1 text-sm py-2 font-medium ${
//                   loginMode === "login"
//                     ? "border-b-2 border-blue-600 text-blue-600"
//                     : "text-zinc-500"
//                 }`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setLoginMode("register")}
//                 className={`flex-1 text-sm py-2 font-medium ${
//                   loginMode === "register"
//                     ? "border-b-2 border-blue-600 text-blue-600"
//                     : "text-zinc-500"
//                 }`}
//               >
//                 Register
//               </button>
//             </div>

//             {/* Forms */}
//             {loginMode === "login" ? (
//               <form className="space-y-3">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
//                 >
//                   Login
//                 </button>
//               </form>
//             ) : (
//               <form className="space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:outline focus:outline-blue-500"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
//                 >
//                   Register
//                 </button>
//               </form>
//             )}

//             <div className="my-4 text-center text-sm text-zinc-400">
//               or continue with
//             </div>

//             <div className="space-y-2">
//               <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-colors">
//                 <Mail className="w-4 h-4" />
//                 Continue with Email
//               </button>
//               <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-colors">
//                 <Github className="w-4 h-4" />
//                 Continue with GitHub
//               </button>
//               <button className="w-full flex items-center justify-center gap-2 border border-zinc-300 rounded-md py-2 text-sm hover:bg-zinc-100 transition-colors">
//                 <Facebook className="w-4 h-4 text-blue-600" />
//                 Continue with Facebook
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { Facebook, Github, Mail, Menu, Search, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/dev-to.svg";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<"login" | "register">("login");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/20">
        <div
          className="flex items-center justify-between px-4 py-3 md:px-6
                  bg-gradient-to-r from-white/60 via-white/40 to-white/60 
                  backdrop-blur-md shadow-sm"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={28} height={28} />
            <span className="font-semibold text-lg text-zinc-800">MyTools</span>
          </Link>

          {/* Search Bar (desktop only) */}
          <div className="flex-1 mx-4 hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search tools, categories..."
                className="w-full rounded-full border border-white/30 bg-white/40 pl-4 pr-10 py-2 text-sm text-zinc-800
                     placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:bg-white/70
                     backdrop-blur-sm"
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
              className="hidden md:block border border-white/40 text-sm px-3 py-1.5 rounded-md 
                   hover:bg-white/40 hover:border-white/60 transition-colors"
            >
              Submit a tool
            </Link>
            <Link
              href="/about"
              className="hidden md:block border border-white/40 text-sm px-3 py-1.5 rounded-md 
                   hover:bg-white/40 hover:border-white/60 transition-colors"
            >
              Dev ?
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpenMenu(true)}
              className="md:hidden p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <User className="w-5 h-5 text-zinc-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {openMenu && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpenMenu(false)}
          />
          {/* Drawer */}
          <div className="w-72 bg-white shadow-xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-lg">Menu</span>
              <button onClick={() => setOpenMenu(false)}>
                <X className="w-5 h-5 text-zinc-600" />
              </button>
            </div>

            {/* Search Bar (mobile) */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full rounded-md border border-zinc-300 bg-zinc-100 pl-3 pr-9 py-2 text-sm outline-none focus:outline focus:outline-blue-500 focus:bg-white"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500" />
            </div>

            <button
              onClick={() => {
                setOpenLogin(true);
                setOpenMenu(false);
              }}
              className="text-sm text-left px-3 py-2 rounded-md hover:bg-zinc-100"
            >
              Log in
            </button>
            <Link
              href="/submit-tool"
              className="text-sm px-3 py-2 rounded-md hover:bg-zinc-100"
              onClick={() => setOpenMenu(false)}
            >
              Submit a tool
            </Link>
            <Link
              href="/about"
              className="text-sm px-3 py-2 rounded-md hover:bg-zinc-100"
              onClick={() => setOpenMenu(false)}
            >
              Dev ?
            </Link>
          </div>
        </div>
      )}

      {/* Login Modal (masih sama dengan punyamu, bisa re-use) */}
      {openLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenLogin(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800"
              onClick={() => setOpenLogin(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* ... isi login/register form-mu tetap sama */}
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
