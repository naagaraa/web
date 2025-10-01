// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import icon from "@/assets/dev-to.svg";
import LanguageSwitcher from "../LanguageSwitcher";
import { menuItems } from "@/data/MenuHeaderItems";
import { useHeroObserver } from "@/src/context/HeroObserverContext";

function Logo({ isTransparent }: { isTransparent: boolean }) {
  return (
    <Link href="/" className="block">
      <span className="sr-only">Home</span>
      <Image
        src={icon}
        alt="Dev.to logo"
        width={30}
        height={30}
        className={isTransparent ? "brightness-200" : ""}
      />
    </Link>
  );
}

type MenuItem = {
  title: string;
  link?: string;
  children?: MenuItem[];
};

type ListProps = {
  item: MenuItem;
  isMobile?: boolean;
  onClickItem?: () => void;
  isTopLevel?: boolean;
  isTransparent: boolean;
  activeMenu?: string | null; // only used on desktop
  setActiveMenu?: (title: string | null) => void; // only used on desktop
};

const List: React.FC<ListProps> = ({
  item,
  isMobile = false,
  onClickItem,
  isTopLevel = false,
  isTransparent,
  activeMenu,
  setActiveMenu,
}) => {
  const hasChildren = item.children && item.children.length > 0;

  // mobile manages its own state
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOpen = isMobile ? mobileOpen : activeMenu === item.title;

  const baseText = "text-gray-800";
  const hoverStyle = "hover:underline underline-offset-4";

  const liClasses =
    isTopLevel && isMobile
      ? "border-b border-gray-100 pb-4 mb-4 last:mb-0 last:border-0"
      : "";

  const toggle = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      if (isOpen) {
        setActiveMenu?.(null);
      } else {
        setActiveMenu?.(item.title);
      }
    }
  };

  return (
    <li className={`relative ${liClasses}`}>
      {hasChildren ? (
        <>
          <button
            type="button"
            className={`flex items-center justify-between w-full ${baseText} ${hoverStyle} transition py-2 px-2 md:px-0`}
            onClick={toggle}
            aria-expanded={isOpen}
          >
            {item.title}
            <svg
              className={`w-4 h-4 ml-1 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul
              className={`mt-2 ${
                isMobile
                  ? "pl-4 border-l-2 border-gray-200"
                  : "absolute bg-white backdrop-blur-md rounded-md py-2 px-4 min-w-[200px] z-50 shadow-lg border border-gray-200"
              }`}
            >
              {item.children!.map((child, idx) => (
                <List
                  key={idx}
                  item={child}
                  isMobile={isMobile}
                  onClickItem={onClickItem}
                  isTopLevel={false}
                  isTransparent={isTransparent}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          href={item.link || "#"}
          onClick={() => {
            onClickItem?.();
            if (!isMobile) setActiveMenu?.(null);
          }}
          className={`block py-2 px-2 md:px-0 ${baseText} ${hoverStyle} transition`}
        >
          {item.title}
        </Link>
      )}
    </li>
  );
};

type MenuProps = {
  list: MenuItem[];
  isMobile?: boolean;
  onClickItem?: () => void;
  isTransparent: boolean;
  activeMenu?: string | null;
  setActiveMenu?: (title: string | null) => void;
};

const Menu: React.FC<MenuProps> = ({
  list,
  isMobile = false,
  onClickItem,
  isTransparent,
  activeMenu,
  setActiveMenu,
}) => {
  return (
    <ul
      className={`flex ${
        isMobile ? "flex-col gap-0" : "flex-row items-center gap-6"
      }`}
    >
      {list.map((item, idx) => (
        <List
          key={idx}
          item={item}
          isMobile={isMobile}
          onClickItem={onClickItem}
          isTopLevel={true}
          isTransparent={isTransparent}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      ))}
      {isMobile ? (
        <li className="pt-4 mt-4 border-t border-gray-100">
          <LanguageSwitcher />
        </li>
      ) : (
        <li>
          <LanguageSwitcher />
        </li>
      )}
    </ul>
  );
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { isOnHero } = useHeroObserver();
  const headerRef = useRef<HTMLDivElement>(null);

  const isTransparent = isOnHero;

  // close desktop dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        activeMenu &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-white/20 border-white/30 backdrop-blur-md"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo isTransparent={isTransparent} />

            {/* Desktop */}
            <div className="hidden md:block">
              <Menu
                list={menuItems}
                isTransparent={isTransparent}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </div>

            {/* Mobile hamburger / close */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <svg
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className={`h-6 w-6 ${
                      isTransparent ? "text-white" : "text-gray-800"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-6 overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <Logo isTransparent={false} />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu uses local state per item */}
          <Menu
            list={menuItems}
            isMobile
            onClickItem={() => setMobileOpen(false)}
            isTransparent={false}
          />
        </aside>
      </div>
    </>
  );
}
