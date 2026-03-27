"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-periwinkle font-bold">
        Featured Image
      </label>
      
      {value ? (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-periwinkle/20 group">
          <img src={value} alt="Featured" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
             <button 
              type="button"
              onClick={() => onChange("")}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
             >
               <X size={20} />
             </button>
             <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-gold text-abyss rounded-full hover:bg-white transition-all font-bold shadow-lg"
             >
               <Upload size={20} />
             </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full aspect-video rounded-2xl border-2 border-dashed border-periwinkle/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/30 transition-all flex flex-col items-center justify-center gap-3 group"
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          ) : (
            <>
              <div className="p-4 bg-royal/20 rounded-2xl text-gold group-hover:scale-110 transition-transform">
                <ImageIcon size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">Click to upload banner</p>
                <p className="text-xs text-veil mt-1">PNG, JPG or WEBP (Max 5MB)</p>
              </div>
            </>
          )}
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
