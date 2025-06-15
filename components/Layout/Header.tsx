"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import icon from "@/assets/dev-to.svg";
import "./header.css"; // Import your custom CSS for animations

function Logo() {
  return (
    <Link className="block text-teal-600" href="/">
      <span className="sr-only">Home</span>
      <Image src={icon} height={30} width={30} alt="Dev.to logo" />
    </Link>
  );
}

type ListProps = {
  title: string;
  link?: string;
  children?: ListProps[];
  megaMenu?: boolean;
  isMobile?: boolean;
  open?: boolean;
  onToggle?: () => void;
  onClickItem?: () => void; // Untuk auto-close
};

export function List({
  title = "",
  link = "",
  children,
  megaMenu,
  isMobile = false,
  open,
  onToggle,
  onClickItem,
}: ListProps) {
  // State untuk submenu di mobile
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const handleToggleChild = (idx: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Desktop Dropdown
  if (children && children.length > 0 && !isMobile && !megaMenu) {
    return (
      <div className="relative group">
        <button
          className="text-gray-500 transition hover:text-gray-500/75 flex items-center gap-1"
          onClick={onToggle}
          type="button"
        >
          {title}
          <svg
            className={`w-4 h-4 ml-1 transition-transform ${
              open ? "rotate-180" : ""
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
        {open && (
          <div className="absolute right-1/2 mt-2 w-56 bg-white border rounded shadow-lg z-50 animate-fadeIn">
            <ul>
              {children.map((child, idx) => (
                <li key={idx}>
                  <Link
                    prefetch={true}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    href={child.link ?? "#"}
                    onClick={onClickItem}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Desktop Mega Menu
  if (children && children.length > 0 && !isMobile && megaMenu) {
    return (
      <div className="relative group">
        <button
          className="text-gray-500 transition hover:text-gray-500/75 flex items-center gap-1"
          onClick={onToggle}
          type="button"
        >
          {title}
          <svg
            className={`w-4 h-4 ml-1 transition-transform ${
              open ? "rotate-180" : ""
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
        {open && (
          <div className="absolute right-1/2 -translate-x-1/2 mt-2 w-[28rem] bg-white border rounded shadow-lg z-50 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
              {children.map((child, idx) => (
                <div key={idx}>
                  <Link
                    prefetch={true}
                    className="block font-semibold text-gray-700 mb-2 hover:text-teal-600"
                    href={child.link ?? "#"}
                    onClick={onClickItem}
                  >
                    {child.title}
                  </Link>
                  {child.children && (
                    <ul>
                      {child.children.map((sub, subIdx) => (
                        <li key={subIdx}>
                          {sub.children ? (
                            <List
                              {...sub}
                              isMobile={isMobile}
                              open={!!openIndexes[subIdx]}
                              onToggle={() => handleToggleChild(subIdx)}
                              onClickItem={onClickItem}
                            />
                          ) : (
                            <Link
                              prefetch={true}
                              className="block px-2 py-1 text-gray-500 hover:text-teal-600"
                              href={sub.link ?? "#"}
                              onClick={onClickItem}
                            >
                              {sub.title}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile Nested Dropdown
  if (children && children.length > 0 && isMobile) {
    return (
      <div>
        <button
          className="flex items-center justify-between w-full text-gray-700 py-2"
          onClick={onToggle}
          type="button"
        >
          <span>{title}</span>
          <svg
            className={`w-4 h-4 ml-1 transition-transform ${
              open ? "rotate-180" : ""
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

        {open && (
          <div className="pl-4 border-l-2 border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
            <ul>
              {children.map((child, idx) => (
                <li key={idx}>
                  {child.children ? (
                    <List
                      {...child}
                      isMobile
                      open={!!openIndexes[idx]}
                      onToggle={() => handleToggleChild(idx)}
                      onClickItem={onClickItem}
                    />
                  ) : (
                    <Link
                      prefetch={true}
                      className="block py-2 text-gray-700 hover:text-teal-600"
                      href={child.link ?? "#"}
                      onClick={onClickItem}
                    >
                      {child.title}
                    </Link>
                    // <p>kosong</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Normal Link
  return (
    <Link
      prefetch={true}
      className="text-gray-500 transition hover:text-gray-500/75 my-5"
      href={link ?? "#"}
      onClick={onClickItem}
    >
      {title}
    </Link>
  );
}

type MenuProps = {
  list: Array<{
    title: string;
    link?: string;
    children?: ListProps[];
    megaMenu?: boolean;
  }>;
  isMobile?: boolean;
  onClickItem?: () => void;
};

function Menu({ list, isMobile = false, onClickItem }: MenuProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setOpenMenus((prev) => {
      const isOpen = !!prev[key];
      if (isOpen) {
        return { ...prev, [key]: false };
      } else {
        // Only allow one open at a time at the current level
        const newState: Record<string, boolean> = {};
        Object.keys(prev).forEach((k) => {
          if (k.startsWith(key.split("-").slice(0, -1).join("-"))) {
            newState[k] = false;
          }
        });
        newState[key] = true;
        return { ...prev, ...newState };
      }
    });
  };

  // Recursive render for nested children, supporting megaMenu
  const renderList = (
    items: MenuProps["list"],
    parentKey = ""
  ): React.ReactNode => {
    return items.map((value, index) => {
      const key = parentKey ? `${parentKey}-${index}` : `menu-${index}`;
      // If this item has megaMenu, pass it recursively
      return (
        <li key={key}>
          <List
            {...value}
            isMobile={isMobile}
            open={!!openMenus[key]}
            onToggle={() => handleToggle(key)}
            onClickItem={onClickItem}
          >
            {value.children
              ? value.children.map((child) => ({
                  ...child,
                  megaMenu: value.megaMenu, // propagate megaMenu recursively
                }))
              : undefined}
          </List>
          {/* {value.children && !!openMenus[key] && isMobile && (
            <ul>{renderList(value.children as MenuProps["list"], key)}</ul>
          )} */}
        </li>
      );
    });
  };

  return (
    <nav aria-label="Global">
      <ul
        className={`flex ${
          isMobile
            ? "flex-col gap-2"
            : "flex-col md:flex-row items-start md:items-center gap-6"
        } text-sm`}
      >
        {renderList(list)}
      </ul>
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { title: "Home", link: "/" },
    {
      title: "Apps",
      megaMenu: true,
      children: [
        {
          title: "Productivity",
          children: [
            { title: "Task Manager", link: "#" },
            { title: "Notes", link: "#" },
          ],
        },
        {
          title: "Utilities",
          children: [
            { title: "Calculator", link: "#" },
            { title: "Weather", link: "#" },
          ],
        },
        {
          title: "Socical",
          children: [
            { title: "Calculator", link: "#" },
            { title: "Weather", link: "#" },
          ],
        },
      ],
    },
    {
      title: "Project",
      children: [
        { title: "Academic project", link: "/project/academic" },
        { title: "Open source project", link: "/project/open-source" },
        { title: "Paid project", link: "/project/paid" },
        { title: "Profesional project", link: "/project/profesional" },
      ],
    },
    { title: "Blog", link: "https://medium.com/@naagaraa" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Sponsorship", link: "#" },
  ];

  return (
    <>
      <header className="bg-white fixed z-20 top-0 start-0 border-b border-gray-200 w-full">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <Menu list={menuItems} />
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                aria-label="Open menu"
              >
                <svg
                  className="h-6 w-6 text-gray-700"
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
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidenav Overlay */}
      {open && (
        <div>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <aside className="fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg flex flex-col p-6 transition-transform duration-300">
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6 text-gray-700"
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

            {/* Mobile menu with dropdown */}
            <Menu
              list={menuItems}
              isMobile
              onClickItem={() => setOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  );
}
