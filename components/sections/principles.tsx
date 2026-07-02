'use client'

import { motion } from 'framer-motion'
import { principles } from '@/lib/data'

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
}

export function PrinciplesSection() {
  return (
    <section id="principles" className="border-t border-border py-24">
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
            /philosophy
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">
            How I Build Software
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Principles that guide every architectural decision, not aspirational values posted on a
            wall.
          </p>
        </motion.div>

        {/* Principles grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((p) => (
            <motion.div
              key={p.number}
              variants={fadeUp}
              className="group bg-card p-6 transition-colors hover:bg-secondary/40"
            >
              <div className="flex items-start gap-4">
                {/* Number */}
                <span
                  className="flex-shrink-0 font-mono text-xs font-semibold"
                  style={{ color: 'oklch(0.72 0.13 183)' }}
                >
                  {p.number}
                </span>

                <div>
                  <p className="font-heading text-sm font-semibold leading-snug text-foreground">
                    {p.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
