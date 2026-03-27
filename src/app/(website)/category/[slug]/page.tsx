import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "@prisma/client";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Map slugs to display names (e.g., 'tech' -> 'Tech')
  const categoryMap: Record<string, string> = {
    education: "Education",
    health: "Health",
    tech: "Tech",
    lifestyle: "Lifestyle",
    news: "News",
    stories: "Stories",
  };

  const categoryName = categoryMap[slug.toLowerCase()];

  if (!categoryName) {
    notFound();
  }

  const posts = await prisma.post.findMany({
    where: {
      category: categoryName,
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  }) as Post[];

  return (
    <div className="min-h-screen bg-[#060d2a] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-gold font-light">
            <span className="w-7 h-px bg-gold" />
            Category
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight">
            {categoryName} <em className="italic text-periwinkle">Insights</em>
          </h1>
          <p className="text-lg text-veil font-light max-w-lg mt-4">
            Exploring the latest thoughts, analysis, and perspectives in {categoryName}.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white/5 border border-periwinkle/12 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-periwinkle/30 hover:shadow-[0_28px_70px_rgba(0,0,0,0.45)] transition-all duration-400"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-900 to-royal flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060d2a]/90 transition-transform duration-700 group-hover:scale-105" />
                  <span className="z-10 text-5xl transition-transform duration-500 group-hover:scale-110">
                    {categoryName === "Education" && "🎓"}
                    {categoryName === "Health" && "💊"}
                    {categoryName === "Tech" && "🤖"}
                    {categoryName === "Lifestyle" && "🌺"}
                    {categoryName === "News" && "📰"}
                    {categoryName === "Stories" && "📖"}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-serif text-xl leading-tight mb-4 group-hover:text-periwinkle transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-veil font-light leading-relaxed mb-6 line-clamp-3">
                    {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                  </p>
                  <div className="mt-auto pt-6 border-t border-periwinkle/10 flex items-center justify-between text-[0.75rem] text-periwinkle">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-2 text-[0.8rem] font-semibold text-azure group-hover:gap-4 transition-all">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="text-4xl">📭</div>
            <p className="text-veil font-light">No posts found in this category yet. Check back soon!</p>
            <Link href="/" className="inline-block text-gold hover:text-white transition-colors">
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
