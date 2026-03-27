"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, GraduationCap, Heart, Laptop, Sparkles, Newspaper } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string | null;
  category?: string;
  createdAt: Date;
}

export default function LandingPageContent({ posts, categoryCounts = {} }: { posts: Post[], categoryCounts?: Record<string, number> }) {
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [scrolled, setScrolled] = useState(0);
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus("submitting");
    const emailInput = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!emailInput?.value) return setNewsletterStatus("error");

    try {
      const res = await fetch("https://formsubmit.co/ajax/seunbayonle@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: "New Newsletter Subscription Request",
          email: emailInput.value,
        })
      });
      if (res.ok) setNewsletterStatus("success");
      else setNewsletterStatus("error");
    } catch {
      setNewsletterStatus("error");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://formsubmit.co/ajax/seunbayonle@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: "New Contact Request from SeunInsight",
          ...data
        })
      });
      if (res.ok) {
        setContactStatus("success");
        e.currentTarget.reset();
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    }
  };

  const curRef = useRef<HTMLDivElement>(null);
  const curRRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<{w:number,h:number,t:number,l:number,dur:string,del:string,lo:number,hi:number}[]>([]);

  useEffect(() => {
    // Generate stars only on client
    const starArr = [...Array(80)].map(() => ({
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMx(e.clientX);
      setMy(e.clientY);
    };

    const handleScroll = () => {
      const s = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      setScrolled((s / h) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const tick = () => {
      setRx((prevRx) => prevRx + (mx - prevRx) * 0.1);
      setRy((prevRy) => prevRy + (my - prevRy) * 0.1);
      animationFrameId = requestAnimationFrame(tick);
    };
    
    tick();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mx, my]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: "Education", icon: <GraduationCap />, color: "#60a5fa", desc: "Examining how learning is evolving — from classrooms in Lagos to universities worldwide.", count: categoryCounts["education"] || 0 },
    { name: "Health", icon: <Heart />, color: "#34d399", desc: "Holistic views on physical and mental well-being, medicine, and the healthcare conversation.", count: categoryCounts["health"] || 0 },
    { name: "Tech", icon: <Laptop />, color: "#a78bfa", desc: "How technology is reshaping lives, businesses, and the future — seen through African eyes.", count: categoryCounts["tech"] || 0 },
    { name: "Lifestyle", icon: <Sparkles />, color: "#f472b6", desc: "Culture, fashion, food, relationships — the art of living richly, intentionally, and beautifully.", count: categoryCounts["lifestyle"] || 0 },
    { name: "News", icon: <Newspaper />, color: "#e8c96a", desc: "Sharp, honest analysis of events and stories shaping our nation and world right now.", count: categoryCounts["news"] || 0 },
    { name: "Stories", icon: <Sparkles />, color: "#e8c96a", desc: "Immersive narratives and personal accounts that bring the human element to the forefront.", count: categoryCounts["stories"] || 0 },
  ];

  return (
    <div className="bg-[#060d2a] text-white selection:bg-gold/30 cursor-none">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-gold to-azure z-[100] transition-all duration-100" style={{ width: `${scrolled}%` }} />
      
      {/* Custom Cursor */}
      <div 
        className="fixed w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200" 
        style={{ left: mx, top: my }} 
      />
      <div 
        className="fixed w-9 h-9 border border-periwinkle/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-screen" 
        style={{ left: rx, top: ry }} 
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 bg-[#060d2a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_80%_40%,rgba(21,64,184,0.3)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_90%,rgba(12,31,107,0.4)_0%,transparent_55%)]" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-periwinkle/20 to-transparent" />
          
          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((s, i) => (
              <div 
                key={i} 
                className="absolute bg-white rounded-full animate-twinkle shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                style={{
                  width: s.w,
                  height: s.h,
                  top: `${s.t}%`,
                  left: `${s.l}%`,
                  '--dur': s.dur,
                  '--del': s.del,
                  '--lo': s.lo,
                  '--hi': s.hi
                } as any}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-gold animate-riseIn">
              <span className="w-8 h-px bg-gold" />
              seuninsight.com.ng
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-light italic leading-none animate-riseIn [animation-delay:0.1s]">
              My View <br />
              <strong className="font-bold not-italic bg-gradient-to-r from-white via-white to-periwinkle bg-clip-text text-transparent block mt-2">
                on the World
              </strong>
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent animate-riseIn [animation-delay:0.2s]" />
            <p className="text-lg font-light text-veil leading-relaxed max-w-md animate-riseIn [animation-delay:0.3s]">
              Education. Health. Tech. Lifestyle. News. Stories. — Six lenses through which I make sense of our world. Every piece written with honesty, depth, and a distinctly Nigerian eye.
            </p>
            <div className="flex flex-wrap gap-2.5 animate-riseIn [animation-delay:0.4s]">
              {categories.map((cat) => (
                <Link 
                  key={cat.name}
                  href={`/category/${cat.name.toLowerCase()}`}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-periwinkle/20 bg-periwinkle/5 text-[0.76rem] text-frost hover:border-azure hover:bg-azure/20 hover:text-white transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="flex gap-4 animate-riseIn [animation-delay:0.5s]">
              <Link href="#blog" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold to-gold2 text-[#03081e] font-semibold text-[0.88rem] shadow-[0_8px_28px_rgba(232,201,106,0.3)] hover:translate-y-[-2px] hover:shadow-[0_14px_40px_rgba(232,201,106,0.45)] transition-all">
                Read Latest Posts
              </Link>
              <Link href="#about" className="px-8 py-3.5 rounded-full border border-veil/25 text-veil font-medium text-[0.88rem] hover:border-periwinkle hover:text-white hover:bg-periwinkle/10 hover:translate-y-[-2px] transition-all">
                About Seun →
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center animate-fadeScale [animation-delay:0.2s]">
            <div className="relative w-full max-w-md h-[560px]">
              {/* Main Card (Post 1) */}
              <Link href={posts[0] ? `/blog/${posts[0].slug}` : "#blog"} className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-[380px] rounded-[20px] border border-periwinkle/20 bg-[#060d2a]/50 backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.02] hover:border-gold/40 hover:z-30 group/hero1 overflow-hidden z-20">
                <div className="h-[250px] relative bg-gradient-to-br from-[#0b1e70] to-azure flex items-center justify-center">
                  {posts[0]?.featuredImage ? (
                    <Image src={posts[0].featuredImage} alt="" fill className="object-cover opacity-60 group-hover/hero1:scale-110 transition-transform duration-1000" />
                  ) : (
                    <span className="text-6xl z-10 transition-transform duration-500 group-hover/hero1:scale-110">🌍</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060d2a]/90" />
                </div>
                <div className="p-5">
                  <span className="text-[0.62rem] tracking-widest uppercase text-gold block mb-2">✦ Latest Insight</span>
                  <h3 className="font-serif text-lg font-semibold leading-tight line-clamp-2">
                    {posts[0]?.title || "Explore the World Through a New Lens"}
                  </h3>
                </div>
              </Link>

              {/* Left Card (Post 2) */}
              <Link href={posts[1] ? `/blog/${posts[1].slug}` : "#blog"} className="absolute bottom-10 left-0 w-48 h-64 rounded-[20px] border border-periwinkle/20 bg-[#060d2a]/50 backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.05] hover:border-azure/40 hover:z-30 group/hero2 overflow-hidden -rotate-6 animate-sway1 z-10">
                 <div className="h-32 relative bg-gradient-to-br from-[#071550] to-[#0b2980] flex items-center justify-center">
                  {posts[1]?.featuredImage ? (
                    <Image src={posts[1].featuredImage} alt="" fill className="object-cover opacity-60 group-hover/hero2:scale-110 transition-transform duration-1000" />
                  ) : (
                    <span className="text-5xl z-10 transition-transform duration-500 group-hover/hero2:scale-110">🎓</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060d2a]/90" />
                </div>
                <div className="p-4">
                  <span className="text-[0.62rem] tracking-widest uppercase text-azure block mb-1">
                    {posts[1]?.category || "Focus"}
                  </span>
                  <h3 className="font-serif text-sm font-semibold leading-tight line-clamp-2">
                    {posts[1]?.title || "Fresh Thoughts"}
                  </h3>
                </div>
              </Link>

              {/* Right Card (Post 3) */}
              <Link href={posts[2] ? `/blog/${posts[2].slug}` : "#blog"} className="absolute bottom-2 right-0 w-44 h-56 rounded-[20px] border border-periwinkle/20 bg-[#060d2a]/50 backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.05] hover:border-[#34d399]/40 hover:z-30 group/hero3 overflow-hidden rotate-[5deg] animate-sway2 z-10">
                <div className="h-28 relative bg-gradient-to-br from-[#042d1a] to-[#065c34] flex items-center justify-center">
                  {posts[2]?.featuredImage ? (
                    <Image src={posts[2].featuredImage} alt="" fill className="object-cover opacity-60 group-hover/hero3:scale-110 transition-transform duration-1000" />
                  ) : (
                    <span className="text-4xl z-10 transition-transform duration-500 group-hover/hero3:scale-110">💊</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060d2a]/90" />
                </div>
                <div className="p-4">
                  <span className="text-[0.62rem] tracking-widest uppercase text-[#34d399] block mb-1">
                    {posts[2]?.category || "Lens"}
                  </span>
                  <h3 className="font-serif text-sm font-semibold leading-tight line-clamp-2">
                    {posts[2]?.title || "Refined View"}
                  </h3>
                </div>
              </Link>
            </div>
            
            <div className="absolute bottom-16 -right-8 max-w-[210px] bg-white/5 border-l-2 border-gold p-4 rounded-r-xl backdrop-blur-md animate-floatQ z-30">
              <p className="font-serif text-[0.95rem] italic text-veil leading-relaxed">
                "Every great story begins with a single, honest perspective."
              </p>
              <cite className="block not-italic text-[0.68rem] tracking-widest text-gold mt-2 uppercase font-sans">— Seun</cite>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP / MARQUEE */}
      <div className="py-6 border-y border-periwinkle/15 bg-royal/10 backdrop-blur-sm overflow-hidden group">
        <div className="flex gap-12 animate-marquee whitespace-nowrap w-max group-hover:[animation-play-state:paused]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {[
                { name: "Education", slug: "education" },
                { name: "Health & Wellness", slug: "health" },
                { name: "Technology", slug: "tech" },
                { name: "Lifestyle", slug: "lifestyle" },
                { name: "Breaking News", slug: "news" },
                { name: "My View", slug: "myview" },
                { name: "seuninsight.com.ng", slug: "" }
              ].map((item) => (
                <Link 
                  key={item.name + i} 
                  href={item.slug === "myview" ? "/#myview" : item.slug ? `/category/${item.slug}` : "/"}
                  className="inline-flex items-center gap-3 text-[0.76rem] tracking-widest uppercase text-veil font-light hover:text-gold transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-24 px-6 bg-[#03081e]" id="myview">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="rv">
            <span className="flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-gold font-light mb-4">
              <span className="w-7 h-px bg-gold" />
              My View
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
              Six Windows <em className="italic text-periwinkle">Into the World</em>
            </h2>
            <p className="text-lg text-veil font-light max-w-lg mt-4">
              Each category is a distinct lens — curated, researched, and written from an authentic Nigerian perspective that speaks to a global audience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-periwinkle/10 rounded-3xl overflow-hidden border border-periwinkle/15 rv">
            {categories.map((cat) => {
              const latestForCat = posts.find(p => p.category?.toLowerCase() === cat.name.toLowerCase());
              
              return (
                <Link 
                  key={cat.name}
                  href={`/category/${cat.name.toLowerCase()}`} 
                  className="group relative bg-[#060d2a] p-8 flex flex-col hover:bg-royal/30 transition-all duration-500 overflow-hidden"
                  style={{ '--accent': cat.color } as any}
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400" />
                  <div className="relative w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-500 overflow-hidden rounded-lg bg-royal/20 flex items-center justify-center">
                    {latestForCat?.featuredImage ? (
                      <Image 
                        src={latestForCat.featuredImage} 
                        alt={cat.name} 
                        fill 
                        sizes="48px"
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <span className="text-3xl">{["🎓", "💊", "💻", "🌸", "📰", "📖"][categories.indexOf(cat)]}</span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-semibold leading-none">{cat.name}</h3>
                  <span className="text-[0.7rem] tracking-widest text-periwinkle uppercase block">{cat.count} articles</span>
                  <p className="text-sm text-veil leading-relaxed font-light line-clamp-2">{cat.desc}</p>
                  
                  {latestForCat && (
                    <div className="mt-6 pt-4 border-t border-periwinkle/10 space-y-2 group/story">
                      <span className="text-[0.6rem] uppercase tracking-widest text-gold font-bold block opacity-60 group-hover:opacity-100 transition-opacity">Latest Story</span>
                      <p className="text-[0.82rem] font-serif italic text-frost line-clamp-2 group-hover:text-white transition-colors">
                        {latestForCat.title}
                      </p>
                    </div>
                  )}

                  <span className="flex items-center gap-1.5 text-[0.76rem] font-medium text-[var(--accent)] group-hover:gap-3 transition-all mt-auto pt-4">
                    Explore →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-32 px-6 bg-[#060d2a] relative overflow-hidden" id="about">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(232,201,106,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(107,147,245,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative group/author rv">
            {/* Main Image Frame */}
            <div className="relative aspect-[4/5] max-w-sm ml-auto z-10">
              <div className="absolute inset-0 border-2 border-gold/30 rounded-2xl -rotate-3 transition-transform duration-500 group-hover/author:rotate-0 group-hover/author:scale-105" />
              <div className="absolute inset-0 border border-periwinkle/20 rounded-2xl rotate-3 transition-transform duration-500 group-hover/author:rotate-0" />
              
              <div className="relative h-full w-full rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden bg-abyss">
                <Image 
                  src="/images/seun.jpg" 
                  alt="Seun" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 384px"
                  className="object-cover transition-transform duration-1000 group-hover/author:scale-110"
                />
                {/* Subtle Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03081e] via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(107,147,245,0.15),transparent_60%)] group-hover/author:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Float Watermark */}
              <div className="absolute -top-16 -right-16 font-serif text-[22rem] font-light italic text-gold/[0.02] select-none pointer-events-none tracking-tighter leading-none z-0 rotate-12">S</div>
              
              {/* Profile Card Overlay */}
              <div className="absolute -bottom-8 -right-8 bg-white/5 border border-periwinkle/20 rounded-2xl p-8 backdrop-blur-2xl shadow-2xl z-20 min-w-[240px]">
                <div className="absolute top-0 left-0 w-12 h-1 bg-gold rounded-full -translate-y-1/2 ml-8" />
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gold font-semibold block mb-2 opacity-80">The Author</span>
                <h4 className="font-serif text-3xl font-light mb-1 text-white">Seun</h4>
                <div className="flex items-center gap-2 text-veil text-[0.8rem] font-light italic">
                   <span className="w-1 h-1 rounded-full bg-periwinkle/40" />
                   Writer · Analyst · Storyteller
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="absolute top-12 -left-12 bg-[#0C1F6B]/80 border border-gold/30 rounded-full px-6 py-4 backdrop-blur-xl shadow-lg z-20 animate-float">
                 <div className="flex items-center gap-3">
                    <span className="text-2xl">🖋️</span>
                    <div>
                       <div className="font-serif text-xl font-bold text-gold leading-none">75+</div>
                       <div className="text-[0.65rem] text-veil uppercase tracking-widest mt-0.5">Insights</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 rv [transition-delay:0.2s]">
            <span className="flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-gold font-light">
              <span className="w-7 h-px bg-gold" />
              About
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
              A Voice <em className="italic text-periwinkle">Rooted</em> in Reality
            </h2>
            <div className="space-y-4 text-veil leading-relaxed font-light">
              <p>
                SeunInsight is more than a blog — it is a <strong className="text-white font-medium">space of honest reflection</strong>. Born from a desire to cut through noise and offer measured, thoughtful perspectives on the issues that actually matter to everyday Nigerians and Africans.
              </p>
              <p>
                Whether unpacking the broken promises of our education system, examining tech's quietly transformative role in African economies, or exploring the delicate dance between <strong className="text-white font-medium">tradition and modernity</strong> in how we live — every article is a genuine attempt to understand, not just describe.
              </p>
              <p>This is <strong className="text-white font-medium">my view</strong>. Informed, personal, and always in conversation with yours.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-6">
              {[
                { icon: "✦", label: "Honest Writing", sub: "No fluff, no agenda" },
                { icon: "🌍", label: "African Lens", sub: "Stories from home" },
                { icon: "📚", label: "Deep Research", sub: "Every claim backed" },
                { icon: "💬", label: "Community", sub: "Space for dialogue" },
              ].map((v) => (
                <div key={v.label} className="p-4 rounded-xl border border-periwinkle/12 bg-periwinkle/5 hover:border-periwinkle/30 hover:bg-periwinkle/10 transition-all">
                  <span className="text-xl mb-1 block">{v.icon}</span>
                  <div className="text-[0.85rem] font-medium mb-0.5">{v.label}</div>
                  <div className="text-[0.77rem] text-veil leading-tight">{v.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24 px-6 bg-[#03081e]" id="blog">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end rv">
            <div className="space-y-4">
              <span className="flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-gold font-light">
                <span className="w-7 h-px bg-gold" />
                Latest Posts
              </span>
              <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
                Fresh from <em className="italic text-periwinkle">the Desk</em>
              </h2>
            </div>
            <Link href="/blog" className="px-8 py-3 rounded-full border border-periwinkle/25 text-veil font-medium text-[0.88rem] hover:border-periwinkle hover:text-white transition-all">
              All Articles →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group bg-white/5 border border-periwinkle/12 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-periwinkle/30 hover:shadow-[0_28px_70px_rgba(0,0,0,0.45)] transition-all duration-400 rv ${i === 0 ? 'lg:col-span-2 lg:flex-row' : ''}`}
              >
                <div className={`relative overflow-hidden bg-gradient-to-br from-[#060d2a] to-[#0b1e70] flex items-center justify-center min-h-[170px] ${i === 0 ? 'lg:w-[45%] lg:min-h-full' : 'h-[170px]'}`}>
                  {post.featuredImage ? (
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title} 
                      fill 
                      sizes={i === 0 ? "(max-width: 1024px) 100vw, 45vw" : "(max-width: 1024px) 100vw, 33vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#060d2a] to-[#0b1e70] flex items-center justify-center">
                      <span className={`z-10 transition-transform duration-500 group-hover:scale-110 ${i === 0 ? 'text-7xl' : 'text-5xl'}`}>
                        {["🎓", "💊", "💻", "🌸", "📰"][i % 5]}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060d2a]/60 group-hover:to-[#060d2a]/80 transition-all duration-300" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[0.7rem] tracking-widest uppercase text-azure mb-4 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-azure" />
                    {post.category || ["Education", "Health", "Tech", "Lifestyle", "News"][i % 5]}
                  </div>
                  <h3 className={`font-serif leading-tight mb-4 group-hover:text-periwinkle transition-colors ${i === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                    {post.title}
                  </h3>
                  {i === 0 && (
                    <p className="text-sm text-veil font-light leading-relaxed mb-6 line-clamp-3">
                      {post.content.replace(/<[^>]*>?/gm, '').substring(0, 180)}...
                    </p>
                  )}
                  <div className="mt-auto pt-6 border-t border-periwinkle/10 flex items-center justify-between text-[0.75rem] text-periwinkle">
                    <span suppressHydrationWarning>{new Date(post.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' })} · {Math.ceil(post.content.length / 500)} min read</span>
                    <span className="flex items-center gap-2 text-[0.8rem] font-semibold text-azure group-hover:gap-4 transition-all">
                      Read {i === 0 ? 'Essay' : ''} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 px-6 bg-gradient-to-br from-royal/60 to-azure/30 border-y border-periwinkle/15" id="newsletter">
        <div className="max-w-2xl mx-auto text-center space-y-8 rv">
          <div className="font-serif text-xl italic text-gold">Stay in the loop</div>
          <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
            Get <em className="italic text-periwinkle">My View</em> in Your Inbox
          </h2>
          <p className="text-veil font-light leading-relaxed">
            One thoughtfully curated email, whenever a new piece drops. No spam. No noise. Just honest, considered writing straight to you.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              name="email"
              className="flex-1 bg-white/5 border border-periwinkle/25 rounded-full px-6 py-3.5 text-white font-light placeholder:text-periwinkle focus:outline-none focus:border-azure transition-colors disabled:opacity-50" 
              type="email" 
              required
              placeholder="your@email.com" 
              id="newsletter-email"
              disabled={newsletterStatus === "submitting" || newsletterStatus === "success"}
            />
            <button 
              type="submit"
              disabled={newsletterStatus === "submitting" || newsletterStatus === "success"}
              className="px-8 py-3.5 rounded-full bg-gold text-[#03081e] font-semibold hover:bg-gold2 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(232,201,106,0.35)] transition-all whitespace-nowrap text-center disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {newsletterStatus === "submitting" ? "Sending..." : newsletterStatus === "success" ? "✓ Subscribed!" : "Subscribe ✦"}
            </button>
          </form>
          {newsletterStatus === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
          <p className="text-[0.72rem] text-periwinkle">Join 5,000+ readers · Unsubscribe anytime</p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6 bg-[#060d2a]" id="contact">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 rv">
            <span className="flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-gold font-light">
              <span className="w-7 h-px bg-gold" />
              Get in Touch
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
              Let's Start a <em className="italic text-periwinkle">Conversation</em>
            </h2>
            <p className="text-veil font-light leading-relaxed max-w-sm">
              Collaboration enquiries, speaking invitations, content partnerships, or just a thought you'd like to share — my inbox is always open.
            </p>
            <div className="space-y-4 pt-4">
              <span className="text-[0.72rem] tracking-widest text-veil uppercase block">Find me here</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Facebook", icon: "📘", url: "https://www.facebook.com/share/1EcgJEQmba/" },
                  { name: "Instagram", icon: "📸", url: "https://www.instagram.com/olanrewajuriches?igsh=MXN1eHprc2l3Nzhibg==" },
                  { name: "X (Twitter)", icon: "𝕏", url: "https://x.com/seunbayonle" },
                  { name: "Email", icon: "✉️", url: "mailto:seunbayonle@gmail.com" }
                ].map(social => (
                  <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full border border-periwinkle/20 text-[0.8rem] text-veil hover:border-azure hover:text-white hover:bg-azure/10 transition-all flex items-center gap-2">
                    <span>{social.icon}</span> {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleContactSubmit} className="bg-white/5 p-8 md:p-12 rounded-3xl border border-periwinkle/12 space-y-6 rv [transition-delay:0.2s]">
            <div className="space-y-4">
              <div>
                <label className="text-[0.75rem] tracking-widest uppercase text-gold block mb-2 font-medium">Your Name</label>
                <input name="name" required disabled={contactStatus === "submitting"} className="w-full bg-white/5 border border-periwinkle/18 rounded-xl px-5 py-3.5 text-white placeholder:text-periwinkle/40 focus:outline-none focus:border-azure transition-all disabled:opacity-50" type="text" placeholder="How shall I address you?" />
              </div>
              <div>
                <label className="text-[0.75rem] tracking-widest uppercase text-gold block mb-2 font-medium">Email Address</label>
                <input name="email" required disabled={contactStatus === "submitting"} className="w-full bg-white/5 border border-periwinkle/18 rounded-xl px-5 py-3.5 text-white placeholder:text-periwinkle/40 focus:outline-none focus:border-azure transition-all disabled:opacity-50" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-[0.75rem] tracking-widest uppercase text-gold block mb-2 font-medium">Your Message</label>
                <textarea name="message" required disabled={contactStatus === "submitting"} className="w-full bg-white/5 border border-periwinkle/18 rounded-xl px-5 py-3.5 text-white placeholder:text-periwinkle/40 focus:outline-none focus:border-azure transition-all h-32 resize-none disabled:opacity-50" placeholder="Tell me what's on your mind…" />
              </div>
            </div>
            {contactStatus === "error" && <p className="text-red-400 text-sm px-2">An error occurred. Please try again.</p>}
            {contactStatus === "success" && <p className="text-[#34d399] text-sm px-2">Message sent successfully! I'll be in touch soon.</p>}
            <button type="submit" disabled={contactStatus === "submitting"} className="w-full px-8 py-4 rounded-full bg-gold text-[#03081e] font-semibold text-[0.88rem] hover:bg-gold2 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-wait">
              {contactStatus === "submitting" ? "Sending..." : "Send Message ✦"}
            </button>
          </form>
        </div>
      </section>

      {/* BACK TO TOP */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-11 h-11 bg-azure/25 border border-periwinkle/30 rounded-full flex items-center justify-center text-periwinkle backdrop-blur-md hover:bg-azure hover:text-white hover:translate-y-[-3px] transition-all z-[90] ${scrolled > 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        ↑
      </button>
    </div>
  );
}
