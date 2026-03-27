# 🌌 SeunInsight

**My View on the World** — A premium, editorial-grade platform built for deep-dive writing and honest reflection. SeunInsight combines high-end aesthetics with a powerful, bespoke administrative suite to deliver a professional reading and publishing experience.

---

## 🎭 The Abyss Design System
SeunInsight is wrapped in the custom **"Abyss"** theme—a deep, immersive aesthetic designed for focused reading:
- **Palette**: Royal Blue, Gold, and Frost White.
- **Typography**: A curated blend of elegant Serifs for storytelling and modern Sans-serifs for clarity.
- **Glassmorphism**: Subtle noise overlays and glassmorphic UI elements for a premium, tactile feel.
- **Micro-animations**: Smooth transitions and reveal-on-scroll elements that bring articles to life.

## 🖋️ The Editorial Suite
A bespoke administrative desk designed for modern creators:
- **Premium Editor**: A clean, distraction-free writing environment with real-time preview and autosave.
- **Visual-First Workflow**: Integrated "Featured Image" engine with local storage and responsive hero rendering.
- **Dynamic Lenses**: Full control over content categorization across six windows: *Education, Health, Tech, Lifestyle, News, and Stories*.
- **Mobile Power**: A fully responsive admin interface with a bottom-navigation bridge for editing on the go.

## 🛠️ Technical Architecture
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [Prisma](https://www.prisma.io/) with SQLite
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Custom Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Editor**: [React Quill](https://github.com/zenoamaro/react-quill) (Refined for Abyss)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Database Setup
Initialize the SQLite database and seed initial sample content:
```bash
npx prisma db push
npx tsx scripts/seed.ts
```

### 3. Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to see the platform.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) for the Editorial Desk.

---

## 📖 Key Directories
- `/src/app/(website)`: Public-facing editorial site.
- `/src/app/admin`: The Editorial Desk suite.
- `/src/components`: Premium UI atomic components.
- `/public/uploads`: Local storage for featured article imagery.

---

© 2026 SeunInsight. Crafted for the authentic voice.
