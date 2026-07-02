'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'

const AstroDodgeGame = dynamic(
  () => import('./astro-dodge-game').then((m) => ({ default: m.AstroDodgeGame })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded-sm border border-border bg-[oklch(0.09_0_0)]">
        <p className="font-mono text-xs text-muted-foreground">Loading game...</p>
      </div>
    ),
  },
)

const SAHIL_BEST = 2704
const LS_KEY = 'astrodoge_best'

interface PersonalBest {
  initials: string
  score: number
}

function loadBest(): PersonalBest | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PersonalBest
  } catch {
    return null
  }
}

function saveBest(pb: PersonalBest) {
  localStorage.setItem(LS_KEY, JSON.stringify(pb))
}

// ──────────────────────────────────────────────
// Preview card (before game loads)
// ──────────────────────────────────────────────
function PreviewCard({ onPlay }: { onPlay: () => void }) {
  const [pb, setPb] = useState<PersonalBest | null>(null)

  useEffect(() => {
    setPb(loadBest())
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* Target row */}
      <div className="rounded-sm border border-border bg-secondary/30 px-4 py-3">
        {pb ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Personal Best
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {pb.score >= SAHIL_BEST ? (
                  <span style={{ color: 'oklch(0.72 0.13 183)' }}>Beat it!</span>
                ) : null}
              </span>
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">
              {pb.initials} &mdash; {pb.score.toLocaleString()}
            </p>
            <div className="mt-1 border-t border-border pt-2">
              <p className="font-mono text-[10px] text-muted-foreground">Original Target</p>
              <p className="font-mono text-sm text-muted-foreground">
                Sahil &mdash; {SAHIL_BEST.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Beat Sahil&apos;s Best
            </span>
            <p className="font-heading text-3xl font-bold text-foreground">
              {SAHIL_BEST.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onPlay}
        className="w-full rounded-sm border border-border bg-secondary/50 py-2.5 font-mono text-sm text-muted-foreground transition-all hover:border-teal hover:bg-secondary hover:text-foreground active:scale-95"
        style={
          {
            '--tw-border-teal': 'oklch(0.72 0.13 183)',
            borderColor: undefined,
          } as React.CSSProperties
        }
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'oklch(0.72 0.13 183)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
      >
        [ Play Game ]
      </button>

      <p className="text-center font-mono text-[10px] text-muted-foreground/50">
        Arrow keys / WASD &middot; Touch supported
      </p>
    </div>
  )
}

// ──────────────────────────────────────────────
// Initials entry after beating the score
// ──────────────────────────────────────────────
function InitialsEntry({
  score,
  onSave,
}: {
  score: number
  onSave: (initials: string) => void
}) {
  const [letters, setLetters] = useState(['', '', ''])
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    refs[0].current?.focus()
  }, [])

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.key.toUpperCase()
    if (/^[A-Z]$/.test(val)) {
      const next = [...letters]
      next[i] = val
      setLetters(next)
      if (i < 2) refs[i + 1].current?.focus()
    } else if (e.key === 'Backspace') {
      const next = [...letters]
      if (next[i]) {
        next[i] = ''
        setLetters(next)
      } else if (i > 0) {
        refs[i - 1].current?.focus()
        next[i - 1] = ''
        setLetters(next)
      }
    } else if (e.key === 'Enter') {
      const full = letters.join('')
      if (full.length === 3) onSave(full)
    }
  }

  const full = letters.join('')

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <p className="font-mono text-xs text-muted-foreground">Enter your initials:</p>
      <div className="flex gap-3">
        {letters.map((l, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={l}
            readOnly
            onKeyDown={(e) => handleKey(i, e)}
            maxLength={1}
            className="h-10 w-10 rounded-sm border border-border bg-secondary/50 text-center font-heading text-xl text-foreground outline-none focus:border-teal"
            style={{ caretColor: 'transparent' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'oklch(0.72 0.13 183)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '')}
          />
        ))}
      </div>
      <button
        onClick={() => full.length === 3 && onSave(full)}
        disabled={full.length < 3}
        className="rounded-sm border border-border px-6 py-1.5 font-mono text-sm text-muted-foreground transition-all hover:border-teal hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'oklch(0.72 0.13 183)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
      >
        Save
      </button>
    </div>
  )
}

// ──────────────────────────────────────────────
// Game Over overlay
// ──────────────────────────────────────────────
function GameOverScreen({
  score,
  onRestart,
  onExit,
}: {
  score: number
  onRestart: () => void
  onExit: () => void
}) {
  const beat = score >= SAHIL_BEST
  const [saved, setSaved] = useState(false)
  const [pb, setPb] = useState<PersonalBest | null>(null)

  useEffect(() => {
    setPb(loadBest())
  }, [])

  const handleSave = (initials: string) => {
    const entry = { initials, score }
    saveBest(entry)
    setPb(entry)
    setSaved(true)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !beat) onRestart()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [beat, onRestart])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-3 rounded-sm border border-border bg-card p-5"
    >
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Game Over</p>
        <p className="mt-2 font-heading text-3xl font-bold text-foreground">
          {score.toLocaleString()}
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Your Score</p>
      </div>

      <div className="flex items-center justify-center gap-4 rounded-sm border border-border bg-secondary/30 px-4 py-2">
        <div className="text-center">
          <p className="font-mono text-[10px] text-muted-foreground">Target</p>
          <p className="font-heading text-lg font-bold text-muted-foreground">{SAHIL_BEST.toLocaleString()}</p>
        </div>
        {pb && pb.score > 0 && !saved && (
          <>
            <div className="h-6 w-px bg-border" />
            <div className="text-center">
              <p className="font-mono text-[10px] text-muted-foreground">Your Best</p>
              <p className="font-heading text-lg font-bold" style={{ color: 'oklch(0.72 0.13 183)' }}>
                {pb.score.toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>

      {beat && !saved ? (
        <div className="flex flex-col gap-3">
          <p className="text-center font-mono text-xs" style={{ color: 'oklch(0.72 0.13 183)' }}>
            🎉 You beat my best!
          </p>
          <InitialsEntry score={score} onSave={handleSave} />
        </div>
      ) : saved ? (
        <p className="text-center font-mono text-xs" style={{ color: 'oklch(0.72 0.13 183)' }}>
          Saved. {pb?.initials} &mdash; {pb?.score.toLocaleString()}
        </p>
      ) : (
        <p className="text-center font-mono text-xs text-muted-foreground">
          Almost there. Try again!
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={onRestart}
          className="flex-1 rounded-sm border border-border py-2 font-mono text-xs text-muted-foreground transition-all hover:text-foreground"
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'oklch(0.72 0.13 183)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
        >
          [ Restart ]
        </button>
        <button
          onClick={onExit}
          className="rounded-sm border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-all hover:text-foreground"
        >
          Exit
        </button>
      </div>
      <p className="text-center font-mono text-[10px] text-muted-foreground/40">Enter to restart</p>
    </motion.div>
  )
}

// ──────────────────────────────────────────────
// Top-level easter egg card
// ──────────────────────────────────────────────
export function AstroDodgeCard() {
  const [phase, setPhase] = useState<'preview' | 'playing' | 'gameover'>('preview')
  const [finalScore, setFinalScore] = useState(0)
  const [gameKey, setGameKey] = useState(0)

  const handlePlay = () => setPhase('playing')

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score)
    setPhase('gameover')
  }, [])

  const handleRestart = () => {
    setGameKey((k) => k + 1)
    setPhase('playing')
  }

  const handleExit = () => {
    setGameKey((k) => k + 1)
    setPhase('preview')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="overflow-hidden rounded-sm border border-border bg-card"
    >
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-muted" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
          <span className="ml-2 font-mono text-[10px] text-muted-foreground">astrododge.exe</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/40">easter egg</span>
      </div>

      <div className="p-5">
        {/* Title block */}
        <div className="mb-4">
          <p className="font-heading text-lg font-bold text-foreground">
            <span className="mr-1.5" aria-hidden="true">
              🎮
            </span>
            AstroDodge
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            Made for fun. Can you beat my best score?
          </p>
        </div>

        {phase === 'preview' && (
          <div className="mb-4 rounded-sm border border-border bg-secondary/20 p-3">
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
              Originally built in C++ using SFML.
              <br />
              Recreated for the web as a small easter egg.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {phase === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PreviewCard onPlay={handlePlay} />
            </motion.div>
          )}

          {phase === 'playing' && (
            <motion.div
              key={`game-${gameKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AstroDodgeGame onGameOver={handleGameOver} onExit={handleExit} />
            </motion.div>
          )}

          {phase === 'gameover' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <GameOverScreen
                score={finalScore}
                onRestart={handleRestart}
                onExit={handleExit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
