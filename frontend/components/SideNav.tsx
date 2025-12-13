"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const SideNav: React.FC = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { label: "Task Board", href: "/" },
    { label: "Task List", href: "/taskList" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className={`font-bold text-xl ${isCollapsed ? "hidden" : "block"}`}>
          SpeechForm
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-800 rounded"
        >
          ☰
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} prefetch={false}>
            {isCollapsed ? item.label[0] : item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideNav;
