'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay },
  }),
}

const techStack = ['FastAPI', 'Python', 'Distributed Systems', 'LLMs & RAG', 'NLP', 'Computer Vision']

const terminalLines = [
  { prompt: '$', cmd: 'cat skills.txt' },
  { out: 'FastAPI · Celery · RabbitMQ · Redis · MongoDB' },
  { out: 'DistilBERT · FAISS · YOLOv8 · Groq · LangChain' },
  { out: 'Docker · OracleDB · ClickHouse · SQLAlchemy' },
  { prompt: '$', cmd: 'cat status.txt' },
  { out: 'Available for opportunities · B.E. CSE 2026 · CGPA 9.16' },
]

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 lg:max-w-[54%]">
            {/* Status badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-8 inline-flex items-center gap-2"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'oklch(0.72 0.13 183)', boxShadow: '0 0 6px oklch(0.72 0.13 183 / 80%)' }}
              />
              <span className="font-mono text-xs text-muted-foreground">
                available for opportunities
              </span>
            </motion.div>

            {/* Name — large */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.05}
              className="font-heading text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl"
            >
              Sahil Sohani
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
              className="mt-4 font-heading text-xl font-medium leading-tight tracking-tight sm:text-2xl"
              style={{ color: 'oklch(0.72 0.13 183)' }}
            >
              Backend Engineer
            </motion.p>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.18}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
            >
              I build backend systems, AI pipelines, and distributed infrastructure.
              Published IEEE researcher. AdvaRisk · DRDO.
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.25}
              className="mt-7 flex flex-wrap gap-2"
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.32}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={scrollToProjects}
                className="rounded-sm px-4 py-2 font-sans text-sm font-medium text-background transition-opacity hover:opacity-90"
                style={{ background: 'oklch(0.72 0.13 183)' }}
              >
                View Projects
              </button>
              <a
                href="https://github.com/SahilSohani27"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-sm border border-border px-4 py-2 font-sans text-sm text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
              >
                GitHub
                <span className="font-mono text-[10px]">↗</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-mono text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                $ contact
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.4}
              className="mt-12 flex gap-8 border-t border-border pt-8"
            >
              {[
                { value: '4', label: 'Projects Built' },
                { value: '2', label: 'IEEE Publications' },
                { value: '2', label: 'Industry Internships' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Terminal block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex-shrink-0 lg:pt-8 lg:w-[42%]"
          >
            <div className="overflow-hidden rounded-sm border border-border bg-card">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                </div>
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                  sahil@portfolio:~
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-sm">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.18, duration: 0.3 }}
                    className={`flex gap-2 ${i > 0 ? 'mt-1.5' : ''}`}
                  >
                    {line.prompt ? (
                      <>
                        <span style={{ color: 'oklch(0.72 0.13 183)' }}>{line.prompt}</span>
                        <span className="text-foreground">{line.cmd}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">{line.out}</span>
                    )}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + terminalLines.length * 0.18 }}
                  className="mt-3 flex gap-2"
                >
                  <span style={{ color: 'oklch(0.72 0.13 183)' }}>$</span>
                  <span className="animate-pulse text-foreground">▋</span>
                </motion.div>
              </div>
            </div>

            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-4 rounded-sm border border-border bg-card p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Education</p>
              <p className="mt-2 font-heading text-sm font-semibold text-foreground">
                B.E. Computer Engineering
              </p>
              <p className="text-sm text-muted-foreground">
                Dr. D.Y. Patil Institute of Technology, Pune
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="font-mono text-xs" style={{ color: 'oklch(0.72 0.13 183)' }}>CGPA 9.16 / 10.00</span>
                <span className="font-mono text-xs text-muted-foreground/50">·</span>
                <span className="font-mono text-xs text-muted-foreground">2022 – 2026</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
