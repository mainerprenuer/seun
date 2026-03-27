"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function DesktopLogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-all"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}

export function MobileLogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex flex-col items-center gap-1 text-red-400/70"
    >
      <LogOut size={20} />
      <span className="text-[0.6rem] font-bold uppercase tracking-widest">Exit</span>
    </button>
  );
}
