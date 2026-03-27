"use client";

export default function PrivacyPage() {
  return (
    <div className="selection:bg-gold selection:text-abyss">
      <main className="max-w-3xl mx-auto px-6 py-32 space-y-12">
        <header className="space-y-4">
          <div className="text-gold font-mono text-[0.7rem] uppercase tracking-[0.3em]">Charter of Trust</div>
          <h1 className="font-serif text-6xl font-bold tracking-tight">Privacy <span className="text-gold italic font-light">Charter</span></h1>
          <p className="text-periwinkle/60 text-sm italic">Last Updated: March 2026</p>
        </header>

        <section className="prose prose-invert prose-periwinkle max-w-none space-y-8 text-[1.1rem] font-light leading-relaxed">
          <p className="text-xl text-veil">At SeunInsight, we believe that your digital footprint should be as private as your personal diary. We are committed to transparency in how we handle the minimal data we collect.</p>
          
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">1. Data Stewardship</h2>
            <p className="text-periwinkle/80">We only collect information that is strictly necessary for the operation of this platform—primarily your email address if you choose to subscribe to our newsletter.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">2. Cookies & Analytics</h2>
            <p className="text-periwinkle/80">We use Google Analytics to understand how visitors engage with our stories. This data is anonymized and used solely to improve the editorial experience.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white pt-8 border-t border-periwinkle/10">3. Your Sovereignty</h2>
            <p className="text-periwinkle/80">You have the right to request the deletion of your data at any time. Simply reach out to us via the contact form on the home page.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
