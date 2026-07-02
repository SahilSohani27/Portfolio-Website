'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { CommandPalette } from './command-palette'
import { navLinks, resumeLink } from '@/lib/data'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()
  const isProjectPage = pathname.startsWith('/projects/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'border-b border-border bg-background/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            aria-label="Sahil Sohani — Home"
          >
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
              SS
            </span>
            <span className="hidden font-mono text-xs text-muted-foreground sm:block">
              /sahilsohani
            </span>
          </button>

          {/* Navigation links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 font-sans text-sm transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-sm bg-secondary"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-sm border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground sm:block"
            >
              Resume ↗
            </a>
            {!isProjectPage && (
              <button
                onClick={openPalette}
                className="flex items-center gap-2 rounded-sm border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
                aria-label="Open command palette"
              >
                <span className="hidden font-mono sm:block">ctrl+k</span>
                <span className="font-mono sm:hidden">⌘K</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  )
}
