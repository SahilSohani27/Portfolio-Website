'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, projects, resumeLink } from '@/lib/data'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}


export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const router = useRouter()

  const commands = [
    ...navLinks.map((link) => ({
      id: link.href,
      group: 'Navigate',
      label: link.label,
      description: `Jump to ${link.label} section`,
      action: () => {
        const el = document.querySelector(link.href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          router.push(`/${link.href}`)
        }
      },
    })),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      group: 'Projects',
      label: p.name,
      description: p.tagline,
      action: () => router.push(`/projects/${p.id}`),
    })),
    {
      id: 'github',
      group: 'Links',
      label: 'GitHub',
      description: 'View source code and projects',
      action: () => window.open('https://github.com/SahilSohani27', '_blank'),
    },
    {
      id: 'linkedin',
      group: 'Links',
      label: 'LinkedIn',
      description: 'Connect on LinkedIn',
      action: () => window.open('https://linkedin.com/in/sahil-sohani', '_blank'),
    },
    {
      id: 'resume',
      group: 'Links',
      label: 'Resume',
      description: 'Download / view resume PDF',
      action: () => window.open(resumeLink, '_blank'),
    },
  ]

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()),
      )
    : commands

  const execute = useCallback(
    (index: number) => {
      filtered[index]?.action()
      onClose()
    },
    [filtered, onClose],
  )

  useEffect(() => {
    setQuery('')
    setSelected(0)
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((prev) => Math.min(prev + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        execute(selected)
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, filtered, selected, execute, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-xl overflow-hidden rounded-sm border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <span className="font-mono text-xs text-muted-foreground">$</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelected(0)
                  }}
                  className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                  <p className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                    No commands found.
                  </p>
                ) : (
                  (() => {
                    let lastGroup = ''
                    return filtered.map((cmd, i) => {
                      const showGroup = cmd.group !== lastGroup
                      lastGroup = cmd.group
                      return (
                        <div key={cmd.id}>
                          {showGroup && (
                            <div className="px-4 pb-1 pt-3">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                                {cmd.group}
                              </span>
                            </div>
                          )}
                          <button
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              i === selected ? 'bg-secondary' : 'hover:bg-secondary/50'
                            }`}
                            onMouseEnter={() => setSelected(i)}
                            onClick={() => execute(i)}
                          >
                            <span className="font-mono text-xs text-teal">→</span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{cmd.label}</p>
                              <p className="text-xs text-muted-foreground">{cmd.description}</p>
                            </div>
                          </button>
                        </div>
                      )
                    })
                  })()
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2">
                <span className="font-mono text-[10px] text-muted-foreground">
                  ↑↓ navigate · ↵ execute · esc close
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">ctrl+k</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
