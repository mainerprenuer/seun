"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 px-6 py-4 transition-all duration-500 border-b ${
      scrolled 
        ? "bg-[#060d2a]/95 backdrop-blur-xl border-periwinkle/20" 
        : "bg-transparent border-periwinkle/5"
    }`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-baseline gap-0.5 group">
          <span className="font-serif text-2xl font-bold text-white tracking-tight">Seun</span>
          <span className="font-serif text-2xl font-light italic text-gold tracking-tight">Insight</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex space-x-8 list-none">
            {[
              { name: 'My View', href: '/#myview' },
              { name: 'About me', href: '/#about' },
              { name: 'Blog', href: '/blog' },
              { name: 'Contact', href: '/#contact' }
            ].map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="text-[0.76rem] font-normal uppercase tracking-[0.1em] text-veil hover:text-white transition-colors relative group/link"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            href="/#newsletter" 
            className="flex items-center gap-2 text-[0.82rem] font-medium text-gold border border-gold/30 px-6 py-2.5 rounded-full hover:bg-gold/10 hover:border-gold transition-all"
          >
            ✦ Subscribe
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-veil hover:text-white transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#060d2a] border-b border-periwinkle/20 py-8 px-8 space-y-6 shadow-2xl animate-[fadeInUp_0.3s_ease-out_forwards]">
          {[
            { name: 'My View', href: '/#myview' },
            { name: 'About me', href: '/#about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Contact', href: '/#contact' }
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-veil hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/#newsletter" 
            onClick={() => setIsOpen(false)}
            className="block text-center text-gold border border-gold/30 py-3 rounded-full hover:bg-gold/10"
          >
            ✦ Subscribe
          </Link>
        </div>
      )}
    </nav>
  );
}
