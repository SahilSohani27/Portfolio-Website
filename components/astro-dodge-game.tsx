'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type GameState = 'idle' | 'playing' | 'paused' | 'gameover'

interface Asteroid {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  rot: number
  rotV: number
  sides: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  r: number
}

export function AstroDodgeGame({
  onGameOver,
  onExit,
}: {
  onGameOver: (score: number) => void
  onExit: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState>('playing')
  const scoreRef = useRef(0)
  const keysRef = useRef<Set<string>>(new Set())
  const frameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const playerRef = useRef({ x: 150, y: 220, w: 20, h: 28 })
  const asteroidsRef = useRef<Asteroid[]>([])
  const particlesRef = useRef<Particle[]>([])
  const spawnTimerRef = useRef(0)
  const diffRef = useRef(1)
  const [paused, setPaused] = useState(false)

  const W = 300
  const H = 320

  const spawnAsteroid = useCallback(() => {
    const r = 12 + Math.random() * 16
    const sides = 5 + Math.floor(Math.random() * 4)
    asteroidsRef.current.push({
      x: r + Math.random() * (W - r * 2),
      y: -r,
      r,
      vx: (Math.random() - 0.5) * 1.2 * diffRef.current,
      vy: 1.2 + Math.random() * 1.5 * diffRef.current,
      rot: 0,
      rotV: (Math.random() - 0.5) * 0.04,
      sides,
    })
  }, [W])

  const explode = useCallback((x: number, y: number) => {
    for (let i = 0; i < 22; i++) {
      const angle = (Math.PI * 2 * i) / 22 + Math.random() * 0.5
      const speed = 1 + Math.random() * 3
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        r: 1.5 + Math.random() * 2.5,
      })
    }
  }, [])

  const drawPolygon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    sides: number,
    rot: number,
  ) => {
    ctx.beginPath()
    for (let i = 0; i < sides; i++) {
      const angle = rot + (Math.PI * 2 * i) / sides
      const px = x + Math.cos(angle) * r
      const py = y + Math.sin(angle) * r
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    }
    ctx.closePath()
  }

  const drawShip = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const w = playerRef.current.w
    const h = playerRef.current.h
    ctx.save()
    ctx.translate(x, y)
    ctx.beginPath()
    ctx.moveTo(0, -h / 2)
    ctx.lineTo(w / 2, h / 2)
    ctx.lineTo(-w / 2, h / 2)
    ctx.closePath()
    ctx.strokeStyle = 'oklch(0.72 0.13 183)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(0, 0, 4, 0, Math.PI * 2)
    ctx.fillStyle = 'oklch(0.72 0.13 183 / 50%)'
    ctx.fill()
    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    stateRef.current = 'playing'
    scoreRef.current = 0
    playerRef.current = { x: W / 2, y: H - 50, w: 20, h: 28 }
    asteroidsRef.current = []
    particlesRef.current = []
    spawnTimerRef.current = 0
    diffRef.current = 1
    lastTimeRef.current = 0

    const SPEED = 3

    const loop = (ts: number) => {
      if (stateRef.current === 'gameover') return

      const dt = lastTimeRef.current ? Math.min((ts - lastTimeRef.current) / 16.67, 3) : 1
      lastTimeRef.current = ts

      if (stateRef.current === 'paused') {
        frameRef.current = requestAnimationFrame(loop)
        return
      }

      const p = playerRef.current
      if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a') || keysRef.current.has('A')) {
        p.x = Math.max(p.w / 2, p.x - SPEED * dt)
      }
      if (keysRef.current.has('ArrowRight') || keysRef.current.has('d') || keysRef.current.has('D')) {
        p.x = Math.min(W - p.w / 2, p.x + SPEED * dt)
      }

      scoreRef.current += dt * 0.5
      diffRef.current = 1 + Math.floor(scoreRef.current / 300) * 0.25

      const spawnInterval = Math.max(38, 80 - diffRef.current * 8)
      spawnTimerRef.current += dt
      if (spawnTimerRef.current >= spawnInterval) {
        spawnAsteroid()
        spawnTimerRef.current = 0
      }

      asteroidsRef.current = asteroidsRef.current.filter((a) => {
        a.x += a.vx * dt
        a.y += a.vy * dt
        a.rot += a.rotV * dt
        if (a.x < -a.r || a.x > W + a.r) a.vx *= -1
        return a.y < H + a.r
      })

      for (const a of asteroidsRef.current) {
        const dx = a.x - p.x
        const dy = a.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < a.r + 8) {
          explode(p.x, p.y)
          stateRef.current = 'gameover'
          onGameOver(Math.floor(scoreRef.current))
          break
        }
      }

      particlesRef.current = particlesRef.current.filter((pt) => {
        pt.x += pt.vx * dt
        pt.y += pt.vy * dt
        pt.life -= 0.035 * dt
        return pt.life > 0
      })

      ctx.clearRect(0, 0, W, H)

      ctx.strokeStyle = 'oklch(1 0 0 / 3%)'
      ctx.lineWidth = 0.5
      for (let gx = 0; gx <= W; gx += 40) {
        ctx.beginPath()
        ctx.moveTo(gx, 0)
        ctx.lineTo(gx, H)
        ctx.stroke()
      }
      for (let gy = 0; gy <= H; gy += 40) {
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(W, gy)
        ctx.stroke()
      }

      for (const a of asteroidsRef.current) {
        drawPolygon(ctx, a.x, a.y, a.r, a.sides, a.rot)
        ctx.strokeStyle = 'oklch(0.52 0 0)'
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.fillStyle = 'oklch(0.14 0 0)'
        ctx.fill()
      }

      for (const pt of particlesRef.current) {
        ctx.globalAlpha = pt.life
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2)
        ctx.fillStyle = 'oklch(0.72 0.13 183)'
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (stateRef.current !== 'gameover') {
        drawShip(ctx, p.x, p.y)
      }

      ctx.fillStyle = 'oklch(0.52 0 0)'
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillText(`${Math.floor(scoreRef.current)}`, 8, 16)

      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(frameRef.current)
  }, [explode, onGameOver, spawnAsteroid, W, H])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current.add(e.key)
      if (e.key === 'Escape') onExit()
      if (e.key === 'p' || e.key === 'P') {
        const next = stateRef.current === 'paused' ? 'playing' : 'paused'
        stateRef.current = next
        setPaused(next === 'paused')
      }
    }
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [onExit])

  useEffect(() => {
    let touchX: number | null = null
    const start = (e: TouchEvent) => {
      touchX = e.touches[0].clientX
    }
    const move = (e: TouchEvent) => {
      if (touchX === null) return
      const dx = e.touches[0].clientX - touchX
      if (dx < -8) {
        keysRef.current.add('ArrowLeft')
        keysRef.current.delete('ArrowRight')
      } else if (dx > 8) {
        keysRef.current.add('ArrowRight')
        keysRef.current.delete('ArrowLeft')
      }
    }
    const end = () => {
      keysRef.current.delete('ArrowLeft')
      keysRef.current.delete('ArrowRight')
      touchX = null
    }
    const c = canvasRef.current
    c?.addEventListener('touchstart', start)
    c?.addEventListener('touchmove', move)
    c?.addEventListener('touchend', end)
    return () => {
      c?.removeEventListener('touchstart', start)
      c?.removeEventListener('touchmove', move)
      c?.removeEventListener('touchend', end)
    }
  }, [])

  return (
    <div className="relative select-none">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full rounded-sm border border-border bg-[oklch(0.09_0_0)]"
        style={{ imageRendering: 'pixelated', touchAction: 'none' }}
      />
      {paused && (
        <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-background/80">
          <p className="font-mono text-sm text-muted-foreground">PAUSED — P to resume</p>
        </div>
      )}
      <div className="mt-1.5 flex items-center justify-between px-0.5">
        <p className="font-mono text-[10px] text-muted-foreground/50">
          ←→ move · P pause · ESC exit
        </p>
        <button
          onClick={() => {
            stateRef.current = 'paused'
            setPaused(true)
          }}
          className="font-mono text-[10px] text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        >
          [pause]
        </button>
      </div>
    </div>
  )
}
