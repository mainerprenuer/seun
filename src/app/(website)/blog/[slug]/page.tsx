import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/blog/BlogPostContent";
import 'react-quill-new/dist/quill.snow.css';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | SeunInsight Insight`,
    description: post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: ['Seuninsight'],
    },
  };
}

export default async function BlogPost({ 
  params,
  searchParams,
}: { 
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams.preview === 'true';

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });

  if (!post || (!post.published && !isPreview)) {
    notFound();
  }

  // Serialize post for the client
  const serializedPost = {
    ...post,
    createdAt: post.createdAt.toISOString(),
  };

  return <BlogPostContent post={serializedPost} />;
}
