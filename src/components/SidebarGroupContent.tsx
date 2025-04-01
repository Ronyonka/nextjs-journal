"use client";

import Link from "next/link";
import { FaHome, FaUser, FaTachometerAlt, FaCog } from "react-icons/fa";

function SidebarGroupContent() {
  return (
    <div className="flex h-full flex-col p-4">
      {/* Navigation Links */}
      <nav className="space-y-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <FaUser />
          <span>Profile</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <FaCog />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}

export default SidebarGroupContent;
