# 🌌 SeunInsight

**My View on the World** — A premium, editorial-grade platform built for deep-dive writing and honest reflection. SeunInsight combines high-end aesthetics with a powerful, bespoke administrative suite to deliver a professional reading and publishing experience.

---

## 🎭 The Abyss Design System
SeunInsight is wrapped in the custom **"Abyss"** theme—a deep, immersive aesthetic designed for focused reading:
- **Palette**: Royal Blue, Gold, and Frost White.
- **Typography**: A curated blend of elegant Serifs for storytelling and modern Sans-serifs for clarity.
- **Micro-animations**: Smooth transitions, reveal-on-scroll elements, and glassmorphic UI components that bring articles to life.

## 🖋️ The Editorial Suite (Mobile-First)
A bespoke administrative desk designed for modern creators:
- **Premium Editor**: A clean, distraction-free writing environment with real-time preview and autosave.
- **Cloud-Native Media**: Integrated **Cloudinary** engine for high-performance, optimized image storage and delivery.
- **Dynamic Lenses**: Full control over content categorization across six windows: *Education, Health, Tech, Lifestyle, News, and Stories*.
- **Mobile Power**: A fully responsive admin interface with a glassmorphic **Bottom Navigation Bar** for editing on the go.

## 🛠️ Technical Architecture
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Database**: [Prisma](https://www.prisma.io/) with **MongoDB Atlas**
- **Media Storage**: [Cloudinary](https://cloudinary.com/) (CDN-optimized)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Custom Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Editor**: [React Quill New](https://github.com/zenoamaro/react-quill) (Refined for Abyss)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file with your production credentials:
```bash
# Database (MongoDB Atlas)
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/dbname"

# Media Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Initialization
Generate the Prisma client and synchronize the schema:
```bash
npx prisma generate
npx prisma db push
npx tsx scripts/seed.ts
```

### 4. Launch Development Server
```bash
npm run dev
```
- Public Site: [http://localhost:3000](http://localhost:3000)
- Editorial Desk: [http://localhost:3000/admin](http://localhost:3000/admin)

---

© 2026 SeunInsight. Crafted for the authentic voice.
