'use client'

import { motion } from 'framer-motion'
import { experience } from '@/lib/data'

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-border py-24">
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
            /experience
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">
            Engineering Experience
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Production internships building systems that handle real data, real scale, real pressure.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-0 h-full w-px"
            style={{ background: 'oklch(1 0 0 / 8%)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-10"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2"
                  style={{
                    borderColor: 'oklch(0.72 0.13 183)',
                    background: 'oklch(0.09 0 0)',
                  }}
                />

                {/* Content */}
                <div className="rounded-sm border border-border bg-card p-6">
                  {/* Header */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {exp.period}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p
                        className="mt-0.5 font-heading text-base font-medium"
                        style={{ color: 'oklch(0.72 0.13 183)' }}
                      >
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Mission */}
                  <div className="mt-4 rounded-sm border border-border bg-background/40 px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Mission
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{exp.mission}</p>
                  </div>

                  {/* Impact */}
                  <div className="mt-5">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Engineering Impact
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {exp.impact.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 h-1 w-4 flex-shrink-0"
                            style={{ background: 'oklch(0.72 0.13 183)' }}
                          />
                          <span className="text-sm leading-relaxed text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
