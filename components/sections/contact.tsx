'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const AstroDodgeCard = dynamic(
  () => import('@/components/astro-dodge').then((m) => ({ default: m.AstroDodgeCard })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] animate-pulse rounded-sm border border-border bg-card/50" />
    ),
  },
)

const TERMINAL_LINES = [
  { prompt: '$', text: 'whoami' },
  { isOutput: true, text: 'sahil sohani — backend engineer & researcher' },
  { prompt: '$', text: 'cat about.txt', delay: 0.3 },
  { isOutput: true, text: 'B.E. Computer Engineering, Dr. D.Y. Patil Institute of Technology, Pune', delay: 0.5 },
  { isOutput: true, text: 'CGPA: 9.16 / 10.00 · Batch of 2026', delay: 0.6 },
  { isOutput: true, text: 'Interned at AdvaRisk (Backend) and DRDO (R&D)', delay: 0.7 },
  { isOutput: true, text: '2x IEEE Publications · Oracle Certified AI Professional', delay: 0.8 },
  { prompt: '$', text: 'cat contact.json', delay: 1.0 },
]

const CONTACT_JSON = [
  {
    key: '"email"',
    value: '"sahilsohani2704@gmail.com"',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=sahilsohani2704@gmail.com',
  },
  {
    key: '"github"',
    value: '"github.com/SahilSohani27"',
    href: 'https://github.com/SahilSohani27',
    external: true,
  },
  {
    key: '"linkedin"',
    value: '"linkedin.com/in/sahilsohani"',
    href: 'https://linkedin.com/in/sahilsohani',
    external: true,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border py-24">
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
            /contact
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
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
                {TERMINAL_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: line.delay ?? i * 0.12, duration: 0.3 }}
                    className={`flex gap-2 ${i > 0 ? 'mt-1.5' : ''}`}
                  >
                    {line.prompt ? (
                      <>
                        <span style={{ color: 'oklch(0.72 0.13 183)' }}>{line.prompt}</span>
                        <span className="text-foreground">{line.text}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">{line.text}</span>
                    )}
                  </motion.div>
                ))}

                {/* JSON output */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, duration: 0.3 }}
                  className="mt-2 text-muted-foreground"
                >
                  <p>{'{'}</p>
                  <div className="ml-4 flex flex-col gap-1">
                    {CONTACT_JSON.map((item, i) => (
                      <p key={i}>
                        <span style={{ color: 'oklch(0.72 0.13 183)' }}>{item.key}</span>
                        <span className="text-foreground/50">: </span>
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="text-foreground/80 underline-offset-2 hover:text-foreground hover:underline"
                        >
                          {item.value}
                        </a>
                        {i < CONTACT_JSON.length - 1 && (
                          <span className="text-foreground/30">,</span>
                        )}
                      </p>
                    ))}
                  </div>
                  <p>{'}'}</p>
                </motion.div>

                {/* Cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.8 }}
                  className="mt-3 flex gap-2"
                >
                  <span style={{ color: 'oklch(0.72 0.13 183)' }}>$</span>
                  <span className="animate-pulse text-foreground">▋</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="max-w-md lg:max-w-none lg:justify-self-end lg:w-full">
            <AstroDodgeCard />
          </div>
        </div>
      </div>
    </section>
  )
}
