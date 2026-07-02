'use client'

import { motion } from 'framer-motion'
import { research } from '@/lib/data'

export function ResearchSection() {
  return (
    <section id="research" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            /research
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">
            Publications
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Peer-reviewed research at the intersection of AI systems and real-world deployment. Two IEEE publications in 2026.
          </p>
        </motion.div>

        {/* Publications */}
        <div className="flex flex-col gap-6">
          {research.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <PaperCard paper={paper} />
            </motion.div>
          ))}
        </div>

        {/* Scholar note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center gap-3 border-t border-border pt-6"
        >
          <span className="font-mono text-xs text-muted-foreground">
            More publications on Google Scholar and IEEE Xplore.
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/40">→</span>
        </motion.div>
      </div>
    </section>
  )
}

function PaperCard({ paper }: { paper: (typeof research)[number] }) {
  return (
    <div className="group rounded-sm border border-border bg-card p-6 transition-colors hover:border-border/60">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        {/* Left: metadata */}
        <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-2 lg:w-36 lg:flex-shrink-0">
          <span
            className="rounded-sm px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: 'oklch(0.72 0.13 183 / 12%)',
              color: 'oklch(0.72 0.13 183)',
            }}
          >
            {paper.conference}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{paper.year}</span>
          {'venue' in paper && (
            <span className="font-mono text-[10px] leading-tight text-muted-foreground/60">{(paper as { venue: string }).venue}</span>
          )}
        </div>

        {/* Right: content */}
        <div className="flex-1">
          <h3 className="font-heading text-lg font-semibold leading-snug text-foreground text-balance">
            {paper.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{paper.summary}</p>

          <div className="mt-4 rounded-sm border border-border bg-background/40 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Key Contribution
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">{paper.contribution}</p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
