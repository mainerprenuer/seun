"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Mail,
  Tag,
  GraduationCap,
  Heart,
  Laptop,
  Sparkles,
  Newspaper,
  ChevronRight
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  createdAt: string;
  author: {
    name: string | null;
  };
}

interface BlogPageContentProps {
  initialPosts: Post[];
  categoryCounts: Record<string, number>;
}

export default function BlogArchivePremium({ initialPosts, categoryCounts }: BlogPageContentProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [activeCat, setActiveCat] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [scrolled, setScrolled] = useState(0);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [stars, setStars] = useState<{w:number,h:number,t:number,l:number,dur:string,del:string,lo:number,hi:number}[]>([]);

  useEffect(() => {
    // Generate stars only on client
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

    // Reveal animations
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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const tick = () => {
      setRx((p) => p + (mx - p) * 0.1);
      setRy((p) => p + (my - p) * 0.1);
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mx, my]);

  const filteredPosts = posts.filter((post) => {
    const catMatch = activeCat === "all" || post.category.toLowerCase() === activeCat.toLowerCase();
    const searchMatch = !searchQ || 
      post.title.toLowerCase().includes(searchQ.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQ.toLowerCase());
    return catMatch && searchMatch;
  });

  const categories = [
    { name: "Education", id: "education", icon: <GraduationCap size={16} />, color: "var(--cat-edu)" },
    { name: "Health", id: "health", icon: <Heart size={16} />, color: "var(--cat-health)" },
    { name: "Tech", id: "tech", icon: <Laptop size={16} />, color: "var(--cat-tech)" },
    { name: "Lifestyle", id: "lifestyle", icon: <Sparkles size={16} />, color: "var(--cat-lifestyle)" },
    { name: "News", id: "news", icon: <Newspaper size={16} />, color: "var(--cat-news)" },
    { name: "Stories", id: "stories", icon: <Sparkles size={16} />, color: "var(--gold)" },
  ];

  const categoryData = categories.map(c => ({
    ...c,
    count: categoryCounts[c.name] || 0
  }));

  const trendingPosts = posts.slice(0, 5);

  return (
    <div className="bg-[#060d2a] text-white selection:bg-gold/30 cursor-none min-h-screen">
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


      {/* PAGE HEADER */}
      <header className="relative pt-24 pb-20 px-6 overflow-hidden border-b border-periwinkle/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_80%_40%,rgba(21,64,184,0.15)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_5%_80%,rgba(12,31,107,0.2)_0%,transparent_55%)]" />
          {/* Stars */}
          <div className="absolute inset-0 opacity-40">
            {stars.map((s, i) => (
              <div key={i} className="absolute bg-white rounded-full animate-twinkle" style={{ width: s.w, height: s.h, top: `${s.t}%`, left: `${s.l}%`, '--dur': s.dur, '--del': s.del, '--lo': s.lo, '--hi': s.hi } as any} />
            ))}
          </div>
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--periwinkle) 1px, transparent 1px), linear-gradient(90deg, var(--periwinkle) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-gold animate-riseIn">
            <span className="w-8 h-px bg-gold" />
            Archive Catalog
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-light italic leading-none animate-riseIn [animation-delay:0.1s]">
            Every Story, <br />
            <strong className="font-bold not-italic text-white">Every Perspective</strong>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent animate-riseIn [animation-delay:0.2s]" />
          <p className="text-lg font-light text-veil leading-relaxed max-w-xl animate-riseIn [animation-delay:0.3s]">
            A growing collection of thoughtful analysis and honest writing across Education, Health, Tech, Lifestyle, and News.
          </p>
          
          <div className="flex gap-12 pt-6 animate-riseIn [animation-delay:0.4s]">
            <div>
              <span className="font-serif text-3xl font-bold text-gold block leading-none">{posts.length}</span>
              <span className="text-[0.65rem] tracking-widest text-periwinkle uppercase mt-1 block">Articles</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-gold block leading-none">5</span>
              <span className="text-[0.65rem] tracking-widest text-periwinkle uppercase mt-1 block">Lenses</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-gold block leading-none">5K+</span>
              <span className="text-[0.65rem] tracking-widest text-periwinkle uppercase mt-1 block">Monthly Reads</span>
            </div>
          </div>
        </div>
      </header>

      {/* CATEGORY STORIES BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-12 animate-riseIn [animation-delay:0.5s]">
        <div className="flex items-center gap-8 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setActiveCat("all")}
            className="flex flex-col items-center gap-3 group shrink-0"
          >
            <div className={`relative p-1 rounded-full border-2 transition-all duration-500 ${activeCat === "all" ? 'border-gold scale-110 shadow-[0_0_15px_rgba(232,201,106,0.5)]' : 'border-periwinkle/20 hover:border-periwinkle/50'}`}>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-royal/40 to-indigo-900/40 flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 ${activeCat === "all" ? 'bg-royal/60' : ''}`}>
                🏠
              </div>
              {activeCat === "all" && (
                <div className="absolute inset-0 rounded-full animate-ping border-2 border-gold opacity-20 pointer-events-none" />
              )}
            </div>
            <span className={`text-[0.65rem] tracking-[0.15em] uppercase font-bold transition-colors ${activeCat === "all" ? 'text-gold' : 'text-veil group-hover:text-white'}`}>
              All
            </span>
          </button>
          
          {categoryData.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className="flex flex-col items-center gap-3 group shrink-0"
            >
              <div className={`relative p-1 rounded-full border-2 transition-all duration-500 ${activeCat === cat.id ? 'border-gold scale-110 shadow-[0_0_15px_rgba(232,201,106,0.5)]' : 'border-periwinkle/20 hover:border-periwinkle/50'}`}>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-royal/40 to-indigo-900/40 flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 ${activeCat === cat.id ? 'bg-royal/60' : ''}`}>
                   {cat.name === "Education" && "🎓"}
                   {cat.name === "Health" && "💊"}
                   {cat.name === "Tech" && "💻"}
                   {cat.name === "Lifestyle" && "🌸"}
                   {cat.name === "News" && "📰"}
                   {cat.name === "Stories" && "✨"}
                </div>
                {activeCat === cat.id && (
                  <div className="absolute inset-0 rounded-full animate-ping border-2 border-gold opacity-20 pointer-events-none" />
                )}
              </div>
              <span className={`text-[0.65rem] tracking-[0.15em] uppercase font-bold transition-colors ${activeCat === cat.id ? 'text-gold' : 'text-veil group-hover:text-white'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* FILTERS & SEARCH BAR */}
      <div className={`sticky top-[72px] z-[40] border-b border-periwinkle/10 bg-[#060d2a]/80 backdrop-blur-2xl transition-all duration-300 ${scrolled > 50 ? 'py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[0.65rem] tracking-[0.2em] uppercase text-gold font-bold whitespace-nowrap">Catalogue Index</span>
            <div className="hidden sm:block w-px h-4 bg-periwinkle/20" />
            <div className="flex items-center gap-2">
              <Link href="/blog" className="text-periwinkle hover:text-white transition-colors"><ArrowLeft size={16} /></Link>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end max-w-2xl">
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-periwinkle/10 bg-white/5">
              <button onClick={() => setViewMode("list")} className={`p-1 transition-colors ${viewMode === "list" ? 'text-gold' : 'text-veil hover:text-white'}`}><ListIcon size={16} /></button>
              <div className="w-px h-3 bg-periwinkle/20" />
              <button onClick={() => setViewMode("grid")} className={`p-1 transition-colors ${viewMode === "grid" ? 'text-gold' : 'text-veil hover:text-white'}`}><LayoutGrid size={16} /></button>
            </div>
            
            <div className="relative group flex-1 max-w-[300px] md:max-w-xs">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-periwinkle opacity-50 group-focus-within:text-azure group-focus-within:opacity-100 transition-all" />
              <input 
                type="text" 
                placeholder="Search archive..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="bg-white/5 border border-periwinkle/15 rounded-full pl-10 pr-6 py-2 text-[0.8rem] text-white w-full outline-none focus:border-azure focus:bg-white/[0.08] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-20 grid lg:grid-cols-[1fr_300px] gap-12 md:gap-16">
        
        {/* BLOG FEED */}
        <div className="space-y-12 overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-40 bg-white/5 rounded-3xl border border-periwinkle/10 space-y-4">
               <div className="text-6xl opacity-30">🔍</div>
               <h3 className="font-serif text-2xl font-light">No articles found</h3>
               <p className="text-veil text-sm px-6">Your search for "{searchQ}" didn't return any results.</p>
               <button onClick={() => {setActiveCat("all"); setSearchQ("");}} className="text-gold text-sm underline decoration-gold/30 hover:decoration-gold underline-offset-4">Reset all filters</button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-8" : "space-y-6 md:space-y-4"}>
              {filteredPosts.map((post, i) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className={`rv group block ${viewMode === "list" ? 'border-b border-periwinkle/10 pb-10 hover:translate-x-1 md:hover:translate-x-2' : 'bg-white/5 border border-periwinkle/12 rounded-3xl p-6 hover:-translate-y-2 hover:border-periwinkle/30 hover:bg-white/[.08]'} transition-all duration-500`}
                >
                  <div className={viewMode === "list" ? "flex flex-col md:flex-row gap-6 md:gap-8 items-start" : "space-y-6"}>
                    {/* Thumbnail placeholder or icon */}
                    <div className={`${viewMode === "list" ? 'w-20 md:w-24 h-20 md:h-24' : 'w-full h-48'} bg-gradient-to-br from-royal to-indigo-900 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all`}>
                      <span className={viewMode === "list" ? "text-3xl md:text-4xl" : "text-6xl"}>
                        {post.category === "Education" ? "🎓" : post.category === "Health" ? "💊" : post.category === "Tech" ? "💻" : post.category === "Lifestyle" ? "🌸" : "📰"}
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex-1 space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3 text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-azure font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-azure" />
                        {post.category}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-light group-hover:text-periwinkle transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-veil text-[0.8rem] md:text-[0.85rem] font-light leading-relaxed line-clamp-2">
                         {post.content
                            .replace(/<[^>]*>?/gm, '') // Strip HTML
                            .replace(/&nbsp;/g, ' ')   // Fix &nbsp;
                            .replace(/&amp;/g, '&')    // Fix &amp;
                            .replace(/&quot;/g, '"')   // Fix &quot;
                            .replace(/&#39;/g, "'")    // Fix &#39;
                            .substring(0, 160)}...
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-[0.7rem] text-periwinkle opacity-70">
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {Math.ceil((post.content?.length || 0) / 500)} min read</span>
                        </div>
                        <span className="text-azure flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all">
                          Read <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="pt-12 text-center">
               <button className="px-10 py-4 rounded-full border border-periwinkle/25 text-veil hover:border-azure hover:text-white hover:bg-azure/5 transition-all text-sm font-light">
                 Load More Articles
               </button>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-12">
           {/* Top Stories */}
           <div className="rv [transition-delay:0.1s]">
             <div className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-gold font-semibold mb-6">
                <TrendingUp size={14} />
                Trending Reading
             </div>
             <div className="space-y-8">
               {trendingPosts.map((p, i) => (
                 <Link key={p.id} href={`/blog/${p.slug}`} className="group block space-y-2">
                   <div className="flex gap-4">
                      <span className="font-serif text-2xl font-bold text-white/10 group-hover:text-gold/40 transition-colors">0{i+1}</span>
                      <h4 className="text-[0.92rem] font-medium leading-tight group-hover:text-periwinkle transition-colors">{p.title}</h4>
                   </div>
                   <div className="pl-10 text-[0.68rem] text-periwinkle uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-periwinkle/30" />
                      {p.category}
                   </div>
                 </Link>
               ))}
             </div>
           </div>

           {/* Topics */}
           <div className="rv [transition-delay:0.2s]">
             <div className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-gold font-semibold mb-6">
                <Tag size={14} />
                Browse Topics
             </div>
             <div className="space-y-2">
               {categoryData.map(cat => (
                 <button 
                  key={cat.id} 
                  onClick={() => setActiveCat(cat.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border border-periwinkle/10 hover:border-azure/40 hover:bg-azure/5 transition-all text-left ${activeCat === cat.id ? 'bg-royal/20 border-azure shadow-lg' : ''}`}
                 >
                   <div className="flex items-center gap-3">
                      <span className="text-lg opacity-80">{cat.icon}</span>
                      <span className="text-[0.85rem] font-medium">{cat.name}</span>
                   </div>
                   <span className="text-[0.65rem] bg-white/5 px-2 py-0.5 rounded-full text-periwinkle">{cat.count}</span>
                 </button>
               ))}
             </div>
           </div>

           {/* Newsletter Mini */}
           <div className="rv [transition-delay:0.3s] bg-white/5 border border-periwinkle/15 rounded-3xl p-8 space-y-6">
              <div className="text-center space-y-3">
                 <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto text-gold mb-2">
                    <Mail size={24} />
                 </div>
                 <h4 className="font-serif text-xl font-light italic">Stay in the Loop</h4>
                 <p className="text-veil text-[0.8rem] leading-relaxed">Get my newest essays in your inbox. No noise, just insight.</p>
              </div>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="w-full bg-white/5 border border-periwinkle/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-azure transition-all"
                />
                <button 
                  onClick={() => setIsSubscribed(true)}
                  className="w-full py-3 bg-gold text-abyss font-bold rounded-xl hover:translate-y-[-2px] transition-all shadow-lg text-[0.85rem]"
                >
                  {isSubscribed ? "✓ Subscribed" : "Subscribe ✦"}
                </button>
              </div>
           </div>
        </aside>
      </main>

    </div>
  );
}
