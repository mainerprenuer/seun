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
      category: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5
  });

  return <LandingPageContent posts={posts} />;
}
