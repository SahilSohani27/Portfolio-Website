# Sahil Sohani — Portfolio

Personal portfolio website for **Sahil Sohani**, a backend engineer focused on AI pipelines, distributed systems, and production infrastructure.

**Live site:** [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app) *(replace with your actual deployment URL)*

---

## Overview

A modern, dark-themed developer portfolio built with Next.js. The site showcases projects, work experience, research, engineering principles, and contact information — with dedicated detail pages for each featured project.

## Features

- **Hero section** — Terminal-style intro with tech stack and smooth scroll navigation
- **Projects** — Featured work including InvoSure, PI-EVA MA-RAG, ResQ Vision, and Feedback Sentiment Analyzer
- **Project detail pages** — Architecture diagrams, request flows, and stack breakdowns per project
- **Experience & research** — Professional background and IEEE publications
- **Engineering principles** — Core values and approach to building systems
- **Contact** — Terminal-themed contact panel with email, GitHub, and LinkedIn links
- **Astro Dodge** — Interactive mini-game in the contact section
- **Command palette** — Quick keyboard navigation across the site
- **Responsive design** — Optimized for desktop and mobile
- **Analytics** — Vercel Analytics in production

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Inter, JetBrains Mono (via `next/font`) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Package manager | [pnpm](https://pnpm.io/) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
# Clone the repository
git clone https://github.com/SahilSohani27/your-repo-name.git
cd your-repo-name

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Run production server |
| `pnpm lint` | Run ESLint |

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page
│   └── projects/[slug]/    # Dynamic project detail pages
├── components/
│   ├── hero.tsx
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── command-palette.tsx
│   └── sections/           # Home page sections
├── lib/
│   └── data.ts             # Projects, experience, and site content
└── public/                 # Static assets
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push the repository to GitHub
2. Import the project in the [Vercel dashboard](https://vercel.com/new)
3. Vercel will auto-detect Next.js and configure the build
4. After deployment, update the live link at the top of this README

Alternatively, deploy to any platform that supports Next.js (Netlify, Railway, etc.).

```bash
pnpm build
pnpm start
```

## Contact

- **Email:** [sahilsohani2704@gmail.com](mailto:sahilsohani2704@gmail.com)
- **GitHub:** [@SahilSohani27](https://github.com/SahilSohani27)
- **LinkedIn:** [sahilsohani](https://linkedin.com/in/sahilsohani)

## License

This project is open source and available for personal reference. Please do not copy the content (bio, projects, experience) without permission.
