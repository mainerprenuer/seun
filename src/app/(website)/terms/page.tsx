"use client";

export default function TermsPage() {
  return (
    <div className="selection:bg-gold selection:text-abyss">
      
      <main className="max-w-3xl mx-auto px-6 py-32 space-y-12">
        <header className="space-y-4">
          <div className="text-gold font-mono text-[0.7rem] uppercase tracking-[0.3em]">Editorial Accord</div>
          <h1 className="font-serif text-6xl font-bold tracking-tight">Terms of <span className="text-gold italic font-light">Service</span></h1>
          <p className="text-periwinkle/60 text-sm italic">Last Updated: March 2026</p>
        </header>

        <section className="prose prose-invert prose-periwinkle max-w-none space-y-8 text-[1.1rem] font-light leading-relaxed">
          <p className="text-xl text-veil">By engaging with SeunInsight, you are entering a space focused on honest dialogue and respectful community engagement.</p>
          
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">1. Intellectual Property</h2>
            <p className="text-periwinkle/80">All content, unless otherwise stated, is the property of SeunInsight. Personal use is encouraged, but commercial reproduction requires explicit written consent.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">2. Community Standard</h2>
            <p className="text-periwinkle/80">We reserve the right to moderate comments and interactions to maintain an editorial-grade environment free from hate speech or automated spam.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">3. Disclaimer</h2>
            <p className="text-periwinkle/80">The insights shared here are for educational and inspirational purposes. They do not constitute professional advice in health, tech, or finance.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
