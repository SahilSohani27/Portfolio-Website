'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ProjectDetail } from '@/lib/data'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: d },
  }),
}

const teal = 'oklch(0.72 0.13 183)'
const tealBg = 'oklch(0.72 0.13 183 / 12%)'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="border-t border-border" />
}

export function ProjectPageClient({ project }: { project: ProjectDetail }) {
  const statusStyles =
    project.statusColor === 'teal'
      ? { dot: teal, bg: tealBg, text: teal }
      : {
          dot: 'oklch(0.78 0.16 75)',
          bg: 'oklch(0.78 0.16 75 / 12%)',
          text: 'oklch(0.78 0.16 75)',
        }

  return (
    <>
      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>←</span>
            <span>Back</span>
          </Link>
          <span className="font-heading text-sm font-semibold text-foreground">{project.name}</span>
          <div className="flex items-center gap-3">
            {project.researchPaper && (
              <a
                href={project.researchPaper}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {/* IEEE ↗ */}
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="pb-16">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {project.category}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.06}
            className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl"
          >
            {project.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.12}
            className="mt-2 font-mono text-sm"
            style={{ color: teal }}
          >
            {project.tagline}
          </motion.p>

          {/* Meta row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.18}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <span
              className="flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-mono text-[10px]"
              style={{ background: statusStyles.bg, color: statusStyles.text }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusStyles.dot }} />
              {project.status}
            </span>
            <div className="flex gap-1.5">
              {project.researchPaper && (
                <a
                  href={project.researchPaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Research Paper ↗
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ── PROBLEM STATEMENT ────────────────────────── */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <SectionLabel>/problem</SectionLabel>
            <SectionHeading>Problem Statement</SectionHeading>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* ── ARCHITECTURE DIAGRAM ─────────────────────── */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <SectionLabel>/architecture</SectionLabel>
            <SectionHeading>Architecture Diagram</SectionHeading>
          </motion.div>

          <div className="mt-8 overflow-x-auto">
            <div className="inline-flex min-w-full flex-col gap-0">
              {project.architecture.map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="group flex items-stretch gap-0">
                    {/* Left label column */}
                    <div className="flex w-44 flex-shrink-0 flex-col items-end justify-center pr-5 text-right">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        {node.tag}
                      </span>
                    </div>

                    {/* Center connector */}
                    <div className="relative flex flex-col items-center">
                      <div
                        className="h-full w-px"
                        style={{
                          background:
                            i === 0 || i === project.architecture.length - 1
                              ? 'transparent'
                              : 'oklch(1 0 0 / 8%)',
                        }}
                      />
                      <div
                        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 transition-colors duration-150 group-hover:border-teal"
                        style={{
                          borderColor: teal,
                          background: 'oklch(0.09 0 0)',
                        }}
                      />
                    </div>

                    {/* Right: node card */}
                    <div className="flex-1 py-2 pl-5">
                      <div className="rounded-sm border border-border bg-card p-4 transition-colors hover:border-border/60">
                        <p className="font-heading text-sm font-semibold text-foreground">
                          {node.label}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {node.detail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between nodes */}
                  {i < project.architecture.length - 1 && (
                    <div className="flex items-center gap-0">
                      <div className="w-44 flex-shrink-0" />
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-px" style={{ background: 'oklch(1 0 0 / 10%)' }} />
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: '3.5px solid transparent',
                            borderRight: '3.5px solid transparent',
                            borderTop: `5px solid oklch(1 0 0 / 18%)`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── TECHNOLOGY STACK ─────────────────────────── */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <SectionLabel>/stack</SectionLabel>
            <SectionHeading>Technology Stack</SectionHeading>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {project.stack.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-sm border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    className="font-heading text-sm font-semibold"
                    style={{ color: teal }}
                  >
                    {item.name}
                  </p>
                  <span className="font-mono text-[10px] text-muted-foreground/60 text-right">
                    {item.role}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.why}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── FOOTER CTAs ──────────────────────────────── */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm px-5 py-2.5 font-mono text-sm font-medium text-background transition-opacity hover:opacity-90"
              style={{ background: teal }}
            >
              View on GitHub ↗
            </a>
            {project.researchPaper && (
              <a
                href={project.researchPaper}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Research Paper ↗
              </a>
            )}
            <Link
              href="/#projects"
              className="font-mono text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              ← Back to projects
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  )
}
