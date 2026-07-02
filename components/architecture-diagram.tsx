'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const NODE_HEIGHT = 52
const CONNECTOR_HEIGHT = 22
const STEP = NODE_HEIGHT + CONNECTOR_HEIGHT
const PACKET_SIZE = 8

const nodes = [
  {
    id: 'client',
    label: 'Client',
    tag: 'Entry Point',
    why: 'Any HTTP client',
    detail:
      'Initiates structured HTTP/WebSocket requests to the API gateway. Entry point for all external traffic.',
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    tag: 'API Gateway',
    why: 'ASGI · Async I/O · Pydantic',
    detail:
      'Handles routing, schema validation, and async I/O. Comparable throughput to Node.js with Python ergonomics. Auto-generates OpenAPI specs.',
  },
  {
    id: 'redis',
    label: 'Redis',
    tag: 'Cache + Broker',
    why: 'Sub-ms reads · Pub/Sub',
    detail:
      'Dual role: response cache to reduce database pressure and Celery broker backend for job queuing. Persistent with AOF.',
  },
  {
    id: 'rabbitmq',
    label: 'RabbitMQ',
    tag: 'Message Broker',
    why: 'AMQP · Durable queues',
    detail:
      'AMQP protocol guarantees message durability and delivery acknowledgment. Dead-letter queues handle failed tasks without data loss.',
  },
  {
    id: 'celery',
    label: 'Celery',
    tag: 'Task Workers',
    why: 'Distributed · Retries · Scaling',
    detail:
      'Horizontally scalable async workers. Handles rate limiting, automatic retries with exponential backoff, and priority queues.',
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    tag: 'Persistence',
    why: 'Motor · Document model',
    detail:
      'Async driver via Motor. Document model suits AI/ML output where schema evolves. Aggregation pipelines for analytics.',
  },
  {
    id: 'response',
    label: 'Response',
    tag: 'Output',
    why: 'Pydantic · Type-safe',
    detail:
      'Structured JSON response serialized through Pydantic models. API contract enforced at the type level, not runtime.',
  },
]

export function ArchitectureDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeNodeIdx, setActiveNodeIdx] = useState(0)
  const controls = useAnimation()
  const cancelledRef = useRef(false)

  const getPacketY = (idx: number) => idx * STEP + (NODE_HEIGHT - PACKET_SIZE) / 2

  useEffect(() => {
    cancelledRef.current = false

    async function runAnimation() {
      while (!cancelledRef.current) {
        for (let i = 0; i < nodes.length; i++) {
          if (cancelledRef.current) return
          setActiveNodeIdx(i)
          await controls.start({
            y: getPacketY(i),
            transition:
              i === 0
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          })
          await new Promise<void>((r) => {
            const t = setTimeout(r, 650)
            if (cancelledRef.current) {
              clearTimeout(t)
              r()
            }
          })
        }
        await new Promise<void>((r) => setTimeout(r, 300))
      }
    }

    runAnimation()
    return () => {
      cancelledRef.current = true
    }
  }, [controls])

  const totalHeight = nodes.length * NODE_HEIGHT + (nodes.length - 1) * CONNECTOR_HEIGHT
  const hoveredData = nodes.find((n) => n.id === hoveredNode)

  return (
    <div className="relative flex items-start gap-5">
      {/* Main column */}
      <div className="relative flex-shrink-0" style={{ width: 220, height: totalHeight }}>
        {nodes.map((node, i) => {
          const isActive = activeNodeIdx === i
          const isHovered = hoveredNode === node.id
          return (
            <div key={node.id}>
              {/* Node */}
              <div
                className="absolute flex cursor-default items-center justify-between rounded-sm border px-3 transition-all duration-200"
                style={{
                  top: i * STEP,
                  left: 0,
                  width: 220,
                  height: NODE_HEIGHT,
                  borderColor: isHovered
                    ? 'oklch(0.72 0.13 183 / 60%)'
                    : isActive
                      ? 'oklch(0.72 0.13 183 / 30%)'
                      : 'oklch(1 0 0 / 8%)',
                  background: isHovered
                    ? 'oklch(0.72 0.13 183 / 8%)'
                    : isActive
                      ? 'oklch(0.72 0.13 183 / 4%)'
                      : 'oklch(0.12 0 0)',
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${node.detail}`}
              >
                <div>
                  <p className="font-heading text-sm font-semibold leading-tight text-foreground">
                    {node.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{node.tag}</p>
                </div>
                {(isActive || isHovered) && (
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: 'oklch(0.72 0.13 183)' }}
                  />
                )}
              </div>

              {/* Connector line */}
              {i < nodes.length - 1 && (
                <div
                  className="absolute"
                  style={{
                    left: '50%',
                    top: i * STEP + NODE_HEIGHT,
                    width: 1,
                    height: CONNECTOR_HEIGHT,
                    background: 'oklch(1 0 0 / 10%)',
                    transform: 'translateX(-0.5px)',
                  }}
                >
                  {/* Arrowhead */}
                  <div
                    className="absolute bottom-0 left-1/2"
                    style={{
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '3px solid transparent',
                      borderRight: '3px solid transparent',
                      borderTop: '4px solid oklch(1 0 0 / 15%)',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}

        {/* Animated packet */}
        <motion.div
          animate={controls}
          className="pointer-events-none absolute"
          style={{
            left: '50%',
            x: -(PACKET_SIZE / 2),
            y: getPacketY(0),
            width: PACKET_SIZE,
            height: PACKET_SIZE,
            borderRadius: '50%',
            background: 'oklch(0.72 0.13 183)',
            boxShadow: '0 0 8px oklch(0.72 0.13 183 / 60%)',
          }}
        />
      </div>

      {/* Tooltip panel */}
      <div className="min-h-[100px] w-[200px] flex-shrink-0 lg:w-[220px]">
        {hoveredData ? (
          <motion.div
            key={hoveredData.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="rounded-sm border border-border bg-card p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-teal">
              {hoveredData.tag}
            </p>
            <p className="mt-1 font-heading text-sm font-semibold text-foreground">
              {hoveredData.label}
            </p>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">{hoveredData.why}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {hoveredData.detail}
            </p>
          </motion.div>
        ) : (
          <div className="rounded-sm border border-dashed border-border p-4">
            <p className="font-mono text-[10px] text-muted-foreground/50">
              hover a node to inspect
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
