"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [stars, setStars] = useState<{w:number,h:number,t:number,l:number,dur:string,del:string,lo:number,hi:number}[]>([]);

  useEffect(() => {
    const starArr = [...Array(40)].map(() => ({
      w: Math.random() * 2 + 0.5,
      h: Math.random() * 2 + 0.5,
      t: Math.random() * 100,
      l: Math.random() * 100,
      dur: `${Math.random() * 4 + 3}s`,
      del: `-${Math.random() * 5}s`,
      lo: Math.random() * 0.15 + 0.03,
      hi: Math.random() * 0.7 + 0.3
    }));
    setStars(starArr);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        router.refresh();
        router.push("/admin");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03081e] text-white font-outfit relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Star Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((s, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: s.w,
              height: s.h,
              top: `${s.t}%`,
              left: `${s.l}%`,
              opacity: s.lo,
              animationDuration: s.dur,
              animationDelay: s.del
            }}
          />
        ))}
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-1/4 -left-1/4 w-[60%] h-[60%] bg-royal/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-azure/10 blur-[150px] rounded-full" />

      <div className="w-full max-w-md relative z-10 animate-riseIn">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-baseline gap-0.5 group mb-6">
            <span className="font-serif text-4xl font-bold text-white tracking-tight">Seun</span>
            <span className="font-serif text-4xl font-light italic text-gold tracking-tight">Insight</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8 bg-gold/30" />
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-bold">Secure Gate</span>
            <div className="h-px w-8 bg-gold/30" />
          </div>
          <h2 className="font-serif text-2xl font-light text-veil italic">Editorial Entrance</h2>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[32px] border border-periwinkle/12 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-500/10 text-red-400 rounded-2xl text-[0.85rem] border border-red-500/20 flex items-center gap-3 animate-shake">
                <span className="shrink-0 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[0.65rem] tracking-[0.15em] uppercase text-gold/60 block font-bold ml-1">Email Authority</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-periwinkle/30 group-focus-within:text-gold transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#060d2a]/50 border border-periwinkle/15 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-periwinkle/20 focus:outline-none focus:border-gold/50 focus:bg-[#060d2a]/80 transition-all text-[0.95rem]"
                  placeholder="name@seuninsight.com.ng"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.65rem] tracking-[0.15em] uppercase text-gold/60 block font-bold ml-1">Key Code</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-periwinkle/30 group-focus-within:text-gold transition-colors" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#060d2a]/50 border border-periwinkle/15 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-periwinkle/20 focus:outline-none focus:border-gold/50 focus:bg-[#060d2a]/80 transition-all text-[0.95rem]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gold text-[#03081e] rounded-full font-bold text-[0.9rem] hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-[0_12px_32px_rgba(232,201,106,0.25)] disabled:opacity-50 disabled:translate-y-0 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#03081e]/30 border-t-[#03081e] rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Unlock Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center text-periwinkle/30 text-[0.75rem] italic font-light">
          © {new Date().getFullYear()} SeunInsight Access Control System
        </div>
      </div>
    </div>
  );
}
