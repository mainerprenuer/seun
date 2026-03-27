import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, slug, content, category, published, featuredImage } = await req.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        category: category || "News",
        published: published ?? false,
        featuredImage,
        author: {
          connect: { email: session.user?.email! }
        }
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
