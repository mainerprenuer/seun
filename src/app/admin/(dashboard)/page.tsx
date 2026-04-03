export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Edit, Calendar, Tag, User, Layers } from "lucide-react";
import DeletePostButton from "@/components/admin/DeletePostButton";

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="space-y-10 animate-riseIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="font-serif text-4xl font-light leading-tight">
            Editorial <strong className="font-bold text-gold">Desk</strong>
          </h1>
          <p className="text-veil text-sm mt-2 font-light tracking-wide">Manage your insights and stories.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-6 py-3 bg-gold text-abyss rounded-xl hover:translate-y-[-2px] transition-all shadow-lg font-bold text-sm w-full sm:w-auto justify-center"
        >
          <PlusCircle size={18} />
          <span>New Insight</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-periwinkle/10 p-6 rounded-2xl animate-riseIn">
          <span className="text-[0.65rem] uppercase tracking-widest text-periwinkle">Total Articles</span>
          <div className="text-3xl font-serif font-bold text-gold">{posts.length}</div>
        </div>
        <div className="bg-white/5 border border-periwinkle/10 p-6 rounded-2xl animate-riseIn [animation-delay:0.1s]">
          <span className="text-[0.65rem] uppercase tracking-widest text-periwinkle">Published</span>
          <div className="text-3xl font-serif font-bold text-azure">{posts.filter((p: any) => p.published).length}</div>
        </div>
        <div className="bg-white/5 border border-periwinkle/10 p-6 rounded-2xl sm:col-span-2 lg:col-span-1 animate-riseIn [animation-delay:0.2s]">
          <span className="text-[0.65rem] uppercase tracking-widest text-periwinkle">Drafts</span>
          <div className="text-3xl font-serif font-bold text-veil">{posts.filter((p: any) => !p.published).length}</div>
        </div>
      </div>

      <div className="bg-white/5 rounded-3xl border border-periwinkle/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-periwinkle/10">
            <thead className="bg-white/[0.02]">
              <tr>
                <th className="px-6 md:px-8 py-5 text-left text-[0.65rem] font-bold text-periwinkle uppercase tracking-widest min-w-[300px]">Article</th>
                <th className="px-6 md:px-8 py-5 text-left text-[0.65rem] font-bold text-periwinkle uppercase tracking-widest">Lense</th>
                <th className="px-6 md:px-8 py-5 text-left text-[0.65rem] font-bold text-periwinkle uppercase tracking-widest">Visibility</th>
                <th className="px-6 md:px-8 py-5 text-right text-[0.65rem] font-bold text-periwinkle uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-periwinkle/5">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 md:px-8 py-20 text-center">
                    <div className="text-6xl mb-4 opacity-20">🖋️</div>
                    <h3 className="font-serif text-xl text-veil">No pieces written yet</h3>
                    <p className="text-sm text-periwinkle/50 mt-1">Ready to share your next insight?</p>
                  </td>
                </tr>
              ) : (
                posts.map((post: any) => (
                  <tr key={post.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 md:px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal to-indigo-900 flex items-center justify-center shrink-0 border border-periwinkle/10 overflow-hidden relative">
                          {post.featuredImage ? (
                            <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Layers size={18} className="text-gold/50" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="text-[0.92rem] font-medium text-white group-hover:text-periwinkle transition-colors line-clamp-1">{post.title}</div>
                          <div className="flex items-center gap-4 text-[0.7rem] text-periwinkle/50">
                            <span className="flex items-center gap-1"><Calendar size={10} /> {post.createdAt.toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><User size={10} /> Seun</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-6">
                      <div className="flex items-center gap-2">
                         <Tag size={12} className="text-gold" />
                         <span className="text-[0.75rem] font-medium text-veil">
                          {post.category}
                         </span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-6">
                      <span className={`px-3 py-1 inline-flex text-[0.65rem] tracking-wider uppercase font-bold rounded-full ${post.published ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {post.published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <Link 
                          href={`/admin/posts/${post.id}/edit`} 
                          className="text-periwinkle hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/10"
                          title="Edit post"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeletePostButton postId={post.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
