"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark,
  ChevronRight,
  MessageSquare
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  featuredImage: string | null;
  createdAt: string;
  author: {
    name: string | null;
  };
}

export default function BlogPostContent({ post }: { post: Post }) {
  const [scrolled, setScrolled] = useState(0);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [stars, setStars] = useState<{w:number,h:number,t:number,l:number,dur:string,del:string,lo:number,hi:number}[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate stars only on client
    const starArr = [...Array(30)].map(() => ({
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

    const handleScroll = () => {
      const s = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      if (h > 0) setScrolled((s / h) * 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMx(e.clientX);
      setMy(e.clientY);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const readTime = Math.max(1, Math.ceil(post.content.length / 800));

  const handleShare = async (platform?: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;

    if (platform === 'Twitter') {
       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'LinkedIn') {
       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'Copy' || !platform) {
       if (navigator.share && !platform) {
          try {
             await navigator.share({ title, url });
          } catch (err) {
             console.log("Error sharing", err);
          }
       } else {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
       }
    }
  };

  return (
    <div className="bg-[#060d2a] text-white selection:bg-gold/30 min-h-screen cursor-none overflow-x-hidden">
      {/* Background Stars (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        {stars.map((s, i) => (
          <div key={i} className="absolute bg-white rounded-full animate-twinkle" style={{ width: s.w, height: s.h, top: `${s.t}%`, left: `${s.l}%`, '--dur': s.dur, '--del': s.del, '--lo': s.lo, '--hi': s.hi } as any} />
        ))}
      </div>

      {/* Reading Progress Bar (Fixed) */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gold via-azure to-periwinkle z-[100] transition-all duration-150" 
        style={{ width: `${scrolled}%` }} 
      />

       {/* Custom Cursor */}
       <div 
        className="fixed w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200" 
        style={{ left: mx, top: my }} 
      />

      {/* HERO SECTION */}
      <header className="relative pt-40 pb-24 px-6 overflow-hidden border-b border-periwinkle/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_-20%,rgba(21,64,184,0.2)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--periwinkle) 1px, transparent 1px), linear-gradient(90deg, var(--periwinkle) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 animate-riseIn">
            <Link href="/blog" className="group inline-flex items-center gap-2 text-veil hover:text-white transition-colors text-sm">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to Archive
            </Link>
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-azure/10 border border-azure/20 text-[0.65rem] tracking-[0.2em] uppercase text-azure font-bold">
                  {post.category}
                </span>
                <div className="w-1 h-1 rounded-full bg-periwinkle/30" />
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-periwinkle opacity-70 flex items-center gap-1.5">
                  <Clock size={12} /> {readTime} Min Read
                </span>
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-7xl font-bold leading-[1.1] animate-riseIn [animation-delay:0.1s]">
              {post.title}
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 pt-4 animate-riseIn [animation-delay:0.2s]">
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-periwinkle/20 bg-royal flex items-center justify-center">
                     <User className="text-periwinkle/50 w-6 h-6" />
                  </div>
                  <div className="text-left">
                     <span className="text-veil text-[0.65rem] tracking-widest uppercase block mb-0.5 opacity-60">Thought by</span>
                     <span className="font-serif text-lg font-medium text-white group-hover:text-gold transition-colors">{post.author.name || "Seun"}</span>
                  </div>
               </div>
               <div className="hidden md:block w-px h-10 bg-periwinkle/10" />
               <div className="text-left">
                  <span className="text-veil text-[0.65rem] tracking-widest uppercase block mb-0.5 opacity-60">Published On</span>
                  <span className="font-serif text-lg font-medium text-periwinkle">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
               </div>
                <div className="ml-auto flex items-center gap-3">
                   <button 
                    onClick={() => handleShare()}
                    className="p-2.5 rounded-full bg-white/5 border border-periwinkle/10 text-periwinkle hover:text-gold hover:border-gold transition-all" 
                    title="Share Article"
                   >
                    <Share2 size={18} />
                   </button>
                   <button className="p-2.5 rounded-full bg-white/5 border border-periwinkle/10 text-periwinkle hover:text-azure hover:border-azure transition-all" title="Bookmark"><Bookmark size={18} /></button>
                </div>
            </div>
          </div>
        </header>
        
        {/* Featured Image Section */}
        {post.featuredImage && (
          <div className="max-w-6xl mx-auto px-6 -mt-12 mb-10 animate-riseIn [animation-delay:0.3s]">
            <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10 group">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d2a] via-transparent to-transparent opacity-40" />
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-periwinkle/40 font-bold px-6">
              <div className="w-1 h-1 rounded-full bg-gold" />
              Editorial Photography — Captured Perspective
            </div>
          </div>
        )}

        <main className="max-w-5xl mx-auto px-4 md:px-6 pt-8 pb-20 md:pt-12 md:pb-32">
        <div className="rv relative">
          {/* Article Decoration */}
          <div className="absolute -left-16 top-0 text-8xl font-serif text-gold/10 pointer-events-none select-none italic hidden md:block">"</div>
          
          {/* Post Content */}
          <div 
            className="prose prose-invert max-w-none font-serif whitespace-pre-wrap break-words
              text-[1.375rem] md:text-[1.75rem] leading-[1.8] tracking-tight
              [&_p]:text-[1.375rem] md:[&_p]:text-[1.75rem] [&_p]:text-white/95 [&_p]:leading-[1.8] [&_p]:font-normal [&_p]:my-0 [&_p]:min-h-[1.8em]
              [&_div]:text-[1.375rem] md:[&_div]:text-[1.75rem] [&_div]:text-white/95 [&_div]:leading-[1.8] [&_div]:font-normal [&_div]:my-0 [&_div]:min-h-[1.8em]
              [&_span]:!text-[1.375rem] md:[&_span]:!text-[1.75rem] [&_span]:!leading-[1.8]
              prose-headings:font-serif prose-headings:font-light prose-headings:italic prose-headings:text-gold
              prose-h2:!text-[2.5rem] md:prose-h2:!text-[4rem] prose-h2:mt-20 prose-h2:mb-8
              prose-h3:!text-[2rem] md:prose-h3:!text-[2.75rem]
              prose-strong:text-white prose-strong:font-semibold
              prose-a:text-azure prose-a:no-underline hover:prose-a:underline prose-a:decoration-azure/30
              prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:!text-[1.875rem] md:prose-blockquote:!text-[2.5rem] prose-blockquote:font-light prose-blockquote:text-gold/80 prose-blockquote:my-16 prose-blockquote:leading-[1.7]
              prose-img:rounded-3xl prose-img:border prose-img:border-periwinkle/10 prose-img:shadow-[0_40px_100px_rgba(0,0,0,0.4)] prose-img:mt-20 prose-img:mb-16
              animate-riseIn [animation-delay:0.3s]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Interaction Strip */}
          <div className="mt-24 pt-12 border-t border-periwinkle/10 flex flex-col md:flex-row items-center justify-between gap-8 rv">
             <div className="flex items-center gap-3 text-veil text-sm">
                <span className="font-serif italic">Liked the perspective?</span>
                <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold/5 transition-all font-medium">
                  Say Thanks ✦
                </button>
             </div>
              <div className="flex items-center gap-4">
                 <span className="text-[0.65rem] uppercase tracking-widest text-periwinkle">Share Insight</span>
                 <div className="flex gap-2">
                    {['Twitter', 'LinkedIn', 'Copy'].map(platform => (
                       <button 
                        key={platform} 
                        onClick={() => handleShare(platform)}
                        className={`px-4 py-1.5 rounded-lg border transition-all text-[0.7rem] ${
                          platform === 'Copy' && copied 
                          ? 'bg-gold/20 border-gold text-gold' 
                          : 'bg-white/5 border-periwinkle/10 hover:bg-azure/10 hover:border-azure'
                        }`}
                       >
                        {platform === 'Copy' && copied ? 'Copied!' : platform}
                       </button>
                    ))}
                 </div>
              </div>
          </div>
        </div>
        
        {/* NEXT POST SUGGESTION */}
        <div className="mt-40 rv">
           <div className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.2em] uppercase text-gold font-bold mb-8">
              <span className="w-8 h-px bg-gold" />
              Continue Your Journey
           </div>
           <Link href="/blog" className="group block bg-white/5 border border-periwinkle/15 rounded-3xl p-10 md:p-16 hover:bg-white/10 hover:border-azure/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute right-[-5%] top-[-10%] text-[15rem] font-serif font-bold text-white/[0.03] italic pointer-events-none group-hover:scale-110 transition-transform duration-700">Next</div>
              <div className="relative z-10 space-y-4">
                 <span className="text-[0.65rem] tracking-[0.2em] uppercase text-azure font-bold">Discover More Perspectives</span>
                 <h2 className="font-serif text-3xl md:text-5xl font-light italic">Explore the full archive of stories & insights</h2>
                 <div className="flex items-center gap-2 text-gold font-medium pt-4">
                    Back to Blog Catalog <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                 </div>
              </div>
           </Link>
        </div>
      </main>
    </div>
  );
}
