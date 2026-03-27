import Link from 'next/link';
import { Globe, Link as LinkIcon, Camera, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-periwinkle/12 bg-[#03081e] py-24 px-8 mt-auto relative overflow-hidden text-token">
      {/* Decorative Gradient Flare */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-royal/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-6">
          <Link href="/" className="flex items-baseline gap-0.5 group">
            <span className="font-serif text-3xl font-bold text-white tracking-tight">Seun</span>
            <span className="font-serif text-3xl font-light italic text-gold tracking-tight">Insight</span>
          </Link>
          <p className="text-[0.9rem] text-veil leading-relaxed font-light max-w-[280px]">
            Curated narratives on the intersection of culture, technology, and wellness. A lens into the heart of Nigeria.
          </p>
          <div className="flex items-center gap-5 pt-4">
            <a href="https://x.com/seunbayonle" target="_blank" className="text-periwinkle hover:text-gold transition-all hover:scale-110" title="X (Twitter)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
            <a href="https://www.facebook.com/share/1EcgJEQmba/" target="_blank" className="text-periwinkle hover:text-gold transition-all hover:scale-110" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/olanrewajuriches?igsh=MXN1eHprc2l3Nzhibg==" target="_blank" className="text-periwinkle hover:text-gold transition-all hover:scale-110" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="mailto:hello@seuninsight.com.ng" className="text-periwinkle hover:text-gold transition-all hover:scale-110" title="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-gold font-bold mb-8 opacity-60">The Lenses</h4>
          <ul className="space-y-4">
            {['Education', 'Health', 'Tech', 'Lifestyle', 'News', 'Stories'].map((item) => (
              <li key={item}>
                <Link href={`/category/${item.toLowerCase()}`} className="text-[0.88rem] text-veil hover:text-white transition-colors flex items-center gap-2 group">
                  {item}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-gold font-bold mb-8 opacity-60">Company</h4>
          <ul className="space-y-4">
            <li><Link href="/#about" className="text-[0.88rem] text-veil hover:text-white transition-colors">About Seun</Link></li>
            <li><Link href="/blog" className="text-[0.88rem] text-veil hover:text-white transition-colors">The Archive</Link></li>
            <li><Link href="/#newsletter" className="text-[0.88rem] text-veil hover:text-white transition-colors">Subscribe</Link></li>
            <li><Link href="/#contact" className="text-[0.88rem] text-veil hover:text-white transition-colors">Work with Me</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-gold font-bold mb-8 opacity-60">Legal</h4>
           <ul className="space-y-4">
             <li><Link href="/privacy" className="text-[0.88rem] text-veil hover:text-white transition-colors">Privacy Charter</Link></li>
             <li><Link href="/terms" className="text-[0.88rem] text-veil hover:text-white transition-colors">Terms of Service</Link></li>
             <li><Link href="/cookies" className="text-[0.88rem] text-veil hover:text-white transition-colors">Cookie Policy</Link></li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-periwinkle/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.8rem] text-periwinkle/50 font-light italic">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} SeunInsight.</span>
          <span className="hidden md:inline text-periwinkle/20">|</span>
          <span>seuninsight.com.ng</span>
        </div>
        <div className="flex items-center gap-2 group cursor-default">
          <span className="group-hover:text-periwinkle transition-colors">Insight is a gift, shared with care in Nigeria</span>
          <span className="animate-pulse">🇳🇬</span>
        </div>
      </div>
    </footer>
  );
}
