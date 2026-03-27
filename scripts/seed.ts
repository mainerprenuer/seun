import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@seuninsight.com.ng' },
    update: {},
    create: {
      email: 'admin@seuninsight.com.ng',
      name: 'Seun',
      password: hashedPassword,
    },
  })
  
  console.log({ user })

  const posts = [
    {
      title: "Building Modern Portfolio Websites",
      slug: "building-modern-portfolios",
      content: "<p>Creating a premium portfolio requires more than just code; it's about the <strong>experience</strong>. In this post, we explore how Next.js and Tailwind CSS can be used to build stunning, fast-loading sites that capture your unique perspective.</p>",
      category: "Tech",
      featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
      published: true,
      authorId: user.id
    },
    {
      title: "Why Content Matters in Tech",
      slug: "why-content-matters",
      content: "<p>Sharing knowledge is the best way to solidify your own understanding. A personal blog serves as your digital garden—a place to grow ideas and share insights with the community.</p>",
      category: "Education",
      featuredImage: "https://images.unsplash.com/photo-1456324504439-367cef38f074?auto=format&fit=crop&q=80&w=2070",
      published: true,
      authorId: user.id
    },
    {
      title: "The Future of Learning in Nigeria",
      slug: "future-learning-nigeria",
      content: "<p>The landscape of education is shifting rapidly. Digital literacy is no longer an option but a necessity for the next generation of Nigerian leaders.</p>",
      category: "Education",
      featuredImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070",
      published: true,
      authorId: user.id
    },
    {
      title: "What Nobody Tells You About Wellness",
      slug: "wellness-secrets",
      content: "<p>Health is more than just the absence of disease. It's about a holistic approach to physical, mental, and spiritual well-being.</p>",
      category: "Health",
      featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1999",
      published: true,
      authorId: user.id
    },
    {
      title: "The Silent Echoes of Lagos",
      slug: "silent-echoes-lagos",
      content: "<p>A personal journey through the quietest corners of Africa's loudest city. This story captures the moments that usually go unnoticed in the rush of the mainland.</p>",
      category: "Stories",
      featuredImage: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=2070",
      published: true,
      authorId: user.id
    },
    {
      title: "Lessons my Grandfather Never Taught Me",
      slug: "grandfather-lessons",
      content: "<p>An exploration of heritage, silence, and the stories we inherit without ever hearing them spoken aloud. A deep dive into the oral traditions of my lineage.</p>",
      category: "Stories",
      featuredImage: "https://images.unsplash.com/photo-1473186578172-c141e6798ee4?auto=format&fit=crop&q=80&w=1946",
      published: true,
      authorId: user.id
    }
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post
    })
  }
  
  console.log("Sample posts seeded")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
