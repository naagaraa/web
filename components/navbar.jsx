import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50">
      <div className="navbar bg-info-content">
        <div className="flex-none">
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost hidden md:flex"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current text-base-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg> */}
          </label>
        </div>
        <div className="flex-1">
          <Link href="/"
            className="btn btn-ghost text-base-100 text-xl"
          >
            <div className="w-80 text-lime-400">
              Miyuki Nagara
            </div>
          </Link>
        </div>
        <div className="flex-none hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text-base-100 sm:hidden md:flex md:w-80">
              <details>
                <summary>More</summary>
                <ul className="p-2 bg-black text-base-100 md:w-80 rounded-t-none">
                  <li className="text-base-500 hover:text-lime-400 active:text-lime-400 focus:text-lime-500">
                    <Link href="/about">Who Am I?</Link>
                  </li>
                  <li className="text-base-500 hover:text-lime-400 active:text-lime-400 focus:text-lime-500">
                    <Link href="/project">Javascript Project</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
