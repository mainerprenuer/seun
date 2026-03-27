"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600 font-medium transition-colors"
    >
      <LogOut size={20} />
      <span>Sign Out</span>
    </button>
  );
}
