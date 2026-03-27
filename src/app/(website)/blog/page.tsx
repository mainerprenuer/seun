import { prisma } from "@/lib/prisma";
import BlogArchivePremium from "@/components/blog/BlogPageContent";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogListing() {
  const rawPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  // Category counts
  const categoryCounts: Record<string, number> = {};
  const posts = rawPosts.map((post: any) => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    return {
      ...post,
      createdAt: post.createdAt.toISOString(),
    };
  });

  return <BlogArchivePremium initialPosts={posts} categoryCounts={categoryCounts} />;
}
