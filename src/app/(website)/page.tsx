import { prisma } from "@/lib/prisma";
import LandingPageContent from "@/components/home/LandingPageContent";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      featuredImage: true,
      category: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 12
  });

  // Get counts for each category
  const counts = await prisma.post.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
    where: { published: true }
  });

  const categoryCounts = counts.reduce((acc, curr) => {
    if (curr.category) {
      acc[curr.category.toLowerCase()] = curr._count.category;
    }
    return acc;
  }, {} as Record<string, number>);

  return <LandingPageContent posts={posts} categoryCounts={categoryCounts} />;
}
