'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DataFlowParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; startX: number; startY: number; endX: number; endY: number; color: string; size: number }>>([])
  const [bgParticles, setBgParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; duration: number }>>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const newParticles = Array.from({ length: isMobile ? 8 : 16 }, (_, index) => ({
      id: index,
      startX: 2 + Math.random() * 15,
      startY: 10 + Math.random() * 80,
      endX: 82 + Math.random() * 15,
      endY: 10 + Math.random() * 80,
      color: ['#00D9FF', '#B620E0', '#00FF88'][index % 3],
      size: 2.5 + Math.random() * 3,
    }))
    setParticles(newParticles)

    const backgroundParticles = Array.from({ length: isMobile ? 10 : 25 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#00D9FF', '#B620E0', '#00FF88', '#B620E0'][index % 4],
      size: 1 + Math.random() * 3,
      duration: 4 + Math.random() * 6,
    }))
    setBgParticles(backgroundParticles)
  }, [])

  return (
    <>
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <filter id="bgParticleGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.65" />
            </feComponentTransfer>
          </filter>
        </defs>

        {bgParticles.map((particle) => (
          <motion.circle
            key={`bg-${particle.id}`}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill={particle.color}
            opacity={0.4}
            filter="url(#bgParticleGlow)"
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
            style={{ filter: `drop-shadow(0 0 ${particle.size * 2}px ${particle.color})` }}
          />
        ))}
      </svg>

      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {particles.map((particle, index) => (
          <g key={particle.id}>
            <line
              x1={`${particle.startX}%`}
              y1={`${particle.startY}%`}
              x2={`${particle.endX}%`}
              y2={`${particle.endY}%`}
              stroke={particle.color}
              strokeWidth="1"
              opacity="0.35"
            />

            <motion.circle
              cx={`${particle.startX}%`}
              cy={`${particle.startY}%`}
              r={particle.size}
              fill={particle.color}
              animate={{
                cx: [`${particle.startX}%`, `${particle.endX}%`, `${particle.startX}%`],
                cy: [`${particle.startY}%`, `${particle.endY}%`, `${particle.startY}%`],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2.5,
                repeat: Infinity,
                delay: index * 0.15,
              }}
              style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
            />

            <motion.circle
              cx={`${particle.startX}%`}
              cy={`${particle.startY}%`}
              r={particle.size * 1.8}
              fill="none"
              stroke={particle.color}
              strokeWidth="0.5"
              opacity="0.3"
              animate={{
                cx: [`${particle.startX}%`, `${particle.endX}%`, `${particle.startX}%`],
                cy: [`${particle.startY}%`, `${particle.endY}%`, `${particle.startY}%`],
                r: [particle.size * 1.8, particle.size * 2.5, particle.size * 1.8],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2.5,
                repeat: Infinity,
                delay: index * 0.15,
              }}
            />
          </g>
        ))}

        <text x="50%" y="5%" textAnchor="middle" className="text-xs fill-cyan-400/70" style={{ fontSize: '12px' }}>
          Data Flow Active: {particles.length} channels
        </text>
      </svg>
    </>
  )
}
