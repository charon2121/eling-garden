"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "首页", href: "/" },
    { name: "分类", href: "/category" },
    { name: "标签", href: "/tags" },
    { name: "系列", href: "/series" },
    { name: "关于", href: "/about" },
  ];

  return (
    <nav className="navbar border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="navbar-content">
        <button
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
          className="navbar-menu-toggle md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="navbar-brand">
          <Link href="/" className="font-bold text-inherit">
            Eling Notes
          </Link>
        </div>
      </div>

      <div className="hidden md:flex gap-4 items-center justify-center">
        {menuItems.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="navbar-content justify-end">
        <button
          aria-label="搜索"
          className="button ghost text-sm font-normal"
        >
          搜索
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-x-0 top-[56px] z-50 h-[calc(100vh-56px)] w-full overflow-y-auto bg-white p-6 dark:bg-gray-900 md:hidden">
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <div key={`${item.name}-${index}`}>
                <Link
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
