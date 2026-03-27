"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");
      
      router.refresh();
    } catch (err) {
      alert("Error deleting post");
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-periwinkle hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Delete post"
    >
      <Trash2 size={18} />
    </button>
  );
}
