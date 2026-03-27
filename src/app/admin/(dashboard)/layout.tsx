import Link from "next/link";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  LogOut, 
  Globe,
  User as UserIcon
} from "lucide-react";
import { DesktopLogoutButton, MobileLogoutButton } from "./LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#03081e] text-white flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-periwinkle/10 bg-[#060d2a] sticky top-0 z-[50]">
        <Link href="/admin" className="flex items-baseline gap-0.5">
          <span className="font-serif text-xl font-bold text-white tracking-tight">Seun</span>
          <span className="font-serif text-xl font-light italic text-gold tracking-tight">Admin</span>
        </Link>
        <Link href="/" className="p-2 rounded-lg bg-white/5 text-veil" title="View Site">
          <Globe size={18} />
        </Link>
      </header>
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 border-r border-periwinkle/10 flex-col sticky top-0 h-screen bg-[#060d2a]">
        <div className="p-8 border-b border-periwinkle/10">
          <Link href="/admin" className="flex items-baseline gap-0.5">
            <span className="font-serif text-2xl font-bold text-white tracking-tight">Seun</span>
            <span className="font-serif text-2xl font-light italic text-gold tracking-tight">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-royal/20 text-gold border border-gold/20 transition-all hover:bg-royal/30"
          >
            <LayoutDashboard size={20} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link 
            href="/admin/posts/new" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-veil hover:text-white hover:bg-white/5 transition-all"
          >
            <PlusCircle size={20} />
            <span className="text-sm font-medium">New Insight</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-periwinkle/10 space-y-3">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-periwinkle/20 text-veil text-sm hover:text-white hover:border-white transition-all"
          >
            <Globe size={16} />
            View Site
          </Link>
          <DesktopLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-[#060d2a]/80 backdrop-blur-xl border border-periwinkle/20 rounded-2xl flex items-center justify-around px-4 z-[50] shadow-2xl">
        <Link href="/admin" className="flex flex-col items-center gap-1 text-gold">
          <LayoutDashboard size={20} />
          <span className="text-[0.6rem] font-bold uppercase tracking-widest">Desk</span>
        </Link>
        <Link href="/admin/posts/new" className="flex flex-col items-center gap-1 text-veil hover:text-white transition-colors">
          <PlusCircle size={20} />
          <span className="text-[0.6rem] font-bold uppercase tracking-widest">New</span>
        </Link>
        <MobileLogoutButton />
      </nav>
</div>
  );
}
