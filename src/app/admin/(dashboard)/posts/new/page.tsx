"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, Globe, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("News");
  const [published, setPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handlePreview = () => {
    if (!slug) {
      alert("Please enter a title or slug first to preview.");
      return;
    }
    // Open in a new tab - since it's not published, the frontend might not show it 
    // unless we implement a preview mode, but for now we'll just open the URL.
    window.open(`/blog/${slug}?preview=true`, "_blank");
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, category, published, featuredImage }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create post");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-riseIn">
      {/* Top Actions */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <Link href="/admin" className="flex items-center gap-2 text-veil hover:text-white transition-colors group">
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-royal/30 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-medium">Back to Desk</span>
        </Link>
        <div className="flex items-center gap-4 w-full sm:w-auto">
           <button 
             type="button"
             onClick={handlePreview}
             className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 rounded-xl text-veil text-sm hover:text-white transition-all border border-periwinkle/10"
           >
             <Eye size={16} /> Preview
           </button>
           <button 
             type="button"
             onClick={() => handleSubmit()}
             disabled={loading}
             className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-gold text-abyss rounded-xl font-bold shadow-lg hover:translate-y-[-2px] transition-all disabled:opacity-50"
           >
             <Save size={16} /> {loading ? "Crafting..." : "Publish Insight"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 items-start">
        {/* Sidebar Config */}
        <aside className="space-y-8 lg:sticky lg:top-24">
           {/* Image Upload */}
           <div className="bg-white/5 border border-periwinkle/10 p-6 rounded-3xl space-y-6">
              <ImageUpload value={featuredImage} onChange={setFeaturedImage} />
           </div>

           {/* Settings */}
           <div className="bg-white/5 border border-periwinkle/10 p-8 rounded-3xl space-y-8 shadow-xl">
              <div className="space-y-4">
                <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-periwinkle font-bold">Lense / Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#03081e] border border-periwinkle/20 rounded-xl px-4 py-3 text-sm focus:border-gold transition-all outline-none"
                >
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Tech">Tech</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="News">News</option>
                  <option value="Stories">Stories</option>
                </select>
              </div>

              <div className="space-y-6 pt-4 border-t border-periwinkle/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Public Visibility</div>
                    <p className="text-[0.7rem] text-veil">Allow readers to see this post</p>
                  </div>
                  <button 
                    onClick={() => setPublished(!published)}
                    type="button"
                    className={`w-12 h-6 rounded-full transition-all relative ${published ? 'bg-gold' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${published ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-azure/10 border border-azure/20 text-azure text-[0.75rem] leading-relaxed italic">
                   <Globe size={18} className="shrink-0" />
                   Drafting in real-time. Your progress is automatically preserved.
                </div>
              </div>
           </div>
           
           {error && (
             <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl italic">
               ⚠️ {error}
             </div>
           )}
        </aside>

        {/* Editor Main */}
        <div className="space-y-8">
           <div className="space-y-2">
             <input 
               type="text" 
               placeholder="The Unspoken Narrative..."
               value={title}
               onChange={handleTitleChange}
               className="w-full bg-transparent border-none text-4xl md:text-5xl font-serif font-bold text-white placeholder:text-white/10 focus:ring-0 focus:outline-none"
             />
             <div className="flex items-center gap-2 text-gold/60 text-xs md:text-sm font-mono tracking-tighter overflow-hidden overflow-ellipsis whitespace-nowrap">
               <span className="opacity-40 shrink-0">slug:</span> seuninsight.com/blog/{slug}
             </div>
           </div>

           <div className="bg-white/5 border border-periwinkle/10 rounded-3xl overflow-hidden min-h-[600px] flex flex-col">
              <div className="flex items-center px-6 py-4 border-b border-periwinkle/10 bg-white/[0.02] justify-between">
                <span className="text-[0.65rem] uppercase tracking-widest text-periwinkle font-bold flex items-center gap-2">
                   <Sparkles size={14} className="text-gold" /> Editorial Body
                </span>
              </div>
              <div className="flex-1 ql-container-premium">
                {/* @ts-ignore */}
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  className="h-full min-h-[500px]"
                />
              </div>
           </div>
        </div>
      </div>
      
      <style jsx global>{`
        .ql-toolbar.ql-snow { border: none !important; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(180,206,255,0.1) !important; padding: 12px 24px !important; }
        .ql-container.ql-snow { border: none !important; font-family: 'Outfit', sans-serif !important; font-size: 1.1rem !important; }
        .ql-editor { color: #deeaff !important; padding: 32px !important; line-height: 1.8 !important; }
        .ql-editor.ql-blank::before { color: rgba(222,234,255,0.15) !important; font-style: italic !important; }
        .ql-picker { color: #deeaff !important; }
        .ql-stroke { stroke: #deeaff !important; }
        .ql-fill { fill: #deeaff !important; }
        .ql-snow .ql-picker.ql-expanded .ql-picker-options { background: #060d2a !important; border: 1px solid rgba(180,206,255,0.1) !important; border-radius: 12px !important; }
      `}</style>
    </div>
  );
}
