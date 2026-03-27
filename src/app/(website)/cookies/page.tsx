"use client";

export default function CookiesPage() {
  return (
    <div className="selection:bg-gold selection:text-abyss">
      
      <main className="max-w-3xl mx-auto px-6 py-32 space-y-12">
        <header className="space-y-4">
          <div className="text-gold font-mono text-[0.7rem] uppercase tracking-[0.3em]">Digital Threads</div>
          <h1 className="font-serif text-6xl font-bold tracking-tight">Cookie <span className="text-gold italic font-light">Policy</span></h1>
          <p className="text-periwinkle/60 text-sm italic">Last Updated: March 2026</p>
        </header>

        <section className="prose prose-invert prose-periwinkle max-w-none space-y-8 text-[1.1rem] font-light leading-relaxed">
          <p className="text-xl text-veil">Cookies are small threads of data that help us stitch together a better browsing experience for you.</p>
          
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">How We Use Them</h2>
            <p className="text-periwinkle/80">We use essential cookies for authentication (Admin access) and analytical cookies to see which stories resonate most with our readers.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">Managing Cookies</h2>
            <p className="text-periwinkle/80">You can manage your cookie preferences through your browser settings. Disabling essential cookies may prevent you from accessing certain administrative features.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
