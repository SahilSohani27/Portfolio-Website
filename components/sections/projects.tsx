'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border py-24">
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
            /projects
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">
            Featured Systems
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Production software built to handle real workloads. Each project reflects deliberate
            engineering decisions.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const router = useRouter()

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/projects/${project.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/projects/${project.id}`)}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-sm border border-border bg-card p-6 transition-all duration-200 hover:border-teal/30"
    >
      {/* Teal left accent line */}
      <div
        className="absolute left-0 top-0 h-full w-px transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: 'oklch(0.72 0.13 183)', opacity: 0.3 }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {project.category}
          </span>
          <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">
            {project.name}
          </h3>
        </div>
        <StatusBadge status={project.status} color={project.statusColor as 'teal' | 'amber'} />
      </div>

      {/* Tagline */}
      <p
        className="mt-1 font-mono text-xs"
        style={{ color: 'oklch(0.72 0.13 183)' }}
      >
        {project.tagline}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Stack */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links row */}
      <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            window.open(project.github, '_blank', 'noopener,noreferrer')
          }}
          className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          GitHub ↗
        </button>
        {project.researchPaper ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              window.open(project.researchPaper!, '_blank', 'noopener,noreferrer')
            }}
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Paper ↗
          </button>
        ) : null}
      </div>
    </div>
  )
}

function StatusBadge({
  status,
  color,
}: {
  status: string
  color: 'teal' | 'amber'
}) {
  const styles =
    color === 'teal'
      ? { dot: 'oklch(0.72 0.13 183)', bg: 'oklch(0.72 0.13 183 / 12%)', text: 'oklch(0.72 0.13 183)' }
      : { dot: 'oklch(0.78 0.16 75)', bg: 'oklch(0.78 0.16 75 / 12%)', text: 'oklch(0.78 0.16 75)' }

  return (
    <span
      className="flex flex-shrink-0 items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-[10px]"
      style={{ background: styles.bg, color: styles.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: styles.dot }} />
      {status}
    </span>
  )
}
