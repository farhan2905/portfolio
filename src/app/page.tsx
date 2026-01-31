'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'
import {
  Menu, X, ArrowRight, Sparkles, Award, Brain, GraduationCap, Rocket,
  Mail, Github, Linkedin, Twitter, MessageSquare, BarChart3, Camera, TrendingUp,
  Users, CheckCircle2, Server, Globe, Smartphone, Star, Layers, Target,
  Code2, Database, Cpu, ExternalLink
} from 'lucide-react'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.3,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// Advanced animation variants for WOW effects
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6 } },
}

// Neural Network Background Component
const NeuralNetworkBackground = ({ heroRef }: { heroRef: React.RefObject<HTMLDivElement> }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  useEffect(() => {
    const newNodes = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
    }))
    setNodes(newNodes)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width * 100
        const y = (e.clientY - rect.top) / rect.height * 100
        if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
          setMousePos({ x, y })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [heroRef])

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#B620E0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="0.8" />
        </linearGradient>
        <filter id="nodeShadow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* Connection lines that light up near mouse */}
      {nodes.map((node1, idx) =>
        nodes
          .filter((node2, idx2) => {
            const dist = Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2)
            return dist < 35 && idx < idx2
          })
          .map((node2) => {
            const lineDist = Math.sqrt((mousePos.x - (node1.x + node2.x) / 2) ** 2 + (mousePos.y - (node1.y + node2.y) / 2) ** 2)
            const proximity = Math.max(0, 1 - lineDist / 20)
            return (
              <line
                key={`line-${node1.id}-${node2.id}`}
                x1={`${node1.x}%`}
                y1={`${node1.y}%`}
                x2={`${node2.x}%`}
                y2={`${node2.y}%`}
                stroke="url(#nodeGradient)"
                strokeWidth={0.5 + proximity * 1.5}
                opacity={0.2 + proximity * 0.5}
                style={{ transition: 'opacity 0.3s ease' }}
              />
            )
          })
      )}

      {/* Pulsing nodes */}
      {nodes.map((node) => {
        const distToMouse = Math.sqrt((node.x - mousePos.x) ** 2 + (node.y - mousePos.y) ** 2)
        const isNearMouse = distToMouse < 18
        return (
          <g key={`node-${node.id}`}>
            {isNearMouse && (
              <circle cx={`${node.x}%`} cy={`${node.y}%`} r={node.size * 2.5} fill="url(#nodeGradient)" opacity="0.15">
                <animate attributeName="r" values={`${node.size * 2.5};${node.size * 4};${node.size * 2.5}`} dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={isNearMouse ? node.size * 1.8 : node.size}
              fill="url(#nodeGradient)"
              opacity={isNearMouse ? 0.95 : 0.55}
              filter="url(#nodeShadow)"
              style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
            >
              <animate attributeName="r" values={`${node.size};${node.size * 1.3};${node.size}`} dur={2 + Math.random() * 2 + 's'} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}
    </svg>
  )
}

// Animated Skill Progress Bar Component
const SkillBar = ({ skill, percentage, delay = 0 }: { skill: string; percentage: number; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="space-y-2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-200">{skill}</span>
        <motion.span className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
          {isVisible && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>{Math.round(percentage * 1.2)}</motion.span>}%
        </motion.span>
      </div>
      <div className="h-2 bg-slate-800/60 rounded-full overflow-hidden border border-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ delay: delay / 1000, duration: 2.2, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-lime-500 rounded-full shadow-lg shadow-cyan-500/50"
          style={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)' }}
        />
      </div>
    </motion.div>
  )
}

// Data Flow Particle Component - Enhanced with more visibility
const DataFlowParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; startX: number; startY: number; endX: number; endY: number; color: string; type: string; size: number }>>([])
  const [bgParticles, setBgParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; duration: number }>>([])

  useEffect(() => {
    // Main flow particles - increased from 8 to 16
    const newParticles = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      startX: 2 + Math.random() * 15,
      startY: 10 + Math.random() * 80,
      endX: 82 + Math.random() * 15,
      endY: 10 + Math.random() * 80,
      color: ['#00D9FF', '#B620E0', '#00FF88'][i % 3],
      type: ['image', 'video', 'text'][i % 3],
      size: 2.5 + Math.random() * 3,
    }))
    setParticles(newParticles)

    // Background chaotic particles for pattern visibility
    const bgParts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#00D9FF', '#B620E0', '#00FF88', '#B620E0'][i % 4],
      size: 1 + Math.random() * 3,
      duration: 4 + Math.random() * 6,
    }))
    setBgParticles(bgParts)
  }, [])

  return (
    <>
      {/* Background particles - messy pattern layer */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <filter id="bgParticleGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.65" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Floating background particles creating chaos patterns */}
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

      {/* Main data flow particles SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#B620E0" />
          </linearGradient>
          <filter id="particleShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.75" />
            </feComponentTransfer>
          </filter>
        </defs>

        {particles.map((particle, idx) => (
          <g key={particle.id}>
            {/* Particle trail - more visible */}
            <line x1={`${particle.startX}%`} y1={`${particle.startY}%`} x2={`${particle.endX}%`} y2={`${particle.endY}%`} stroke={particle.color} strokeWidth="1" opacity="0.35" />

            {/* Animated particle - larger and more visible */}
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
                delay: idx * 0.15,
              }}
              style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
            />

            {/* Glow halo around particle */}
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
                delay: idx * 0.15,
              }}
            />
          </g>
        ))}

        {/* Throughput metrics text */}
        <text x="50%" y="5%" textAnchor="middle" className="text-xs fill-cyan-400/70" style={{ fontSize: '12px' }}>
          Data Flow Active: {particles.length} channels
        </text>
      </svg>
    </>
  )
}

// Floating Code Snippets Component
const FloatingCodeSnippets = () => {
  const codeSnippets = [
    { code: 'const ai = "powerful"', color: '#00D9FF' },
    { code: 'function innovate() {}', color: '#B620E0' },
    { code: 'model.train(data)', color: '#00FF88' },
    { code: 'await predict(input)', color: '#00D9FF' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((snippet, idx) => (
        <motion.div
          key={idx}
          className="absolute text-xs font-mono px-3 py-2 bg-slate-900/50 border rounded backdrop-blur"
          style={{
            borderColor: snippet.color + '40',
            color: snippet.color,
            left: `${15 + idx * 20}%`,
            top: `${10 + idx * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + idx * 0.5,
            repeat: Infinity,
            delay: idx * 0.3,
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  )
}

// Spotlight Cursor Effect Component
const SpotlightCursor = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <motion.div
      className="fixed w-96 h-96 pointer-events-none"
      style={{
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
        background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, rgba(0, 217, 255, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 1,
      }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
  )
}

// Dynamic Signal Propagation Component for Landing Animation
const DynamicSignalFlow = ({ layers }: { layers: Array<{ id: string; x: number; nodes: number; label: string }> }) => {
  const [signals, setSignals] = useState<Array<{ id: string; startLayerIdx: number; nodeIdx: number; progress: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) => {
        const updated = prev
          .map((s) => ({
            ...s,
            progress: s.progress + 0.008,
          }))
          .filter((s) => s.progress < 1)

        // Spawn new signals from input layer
        if (Math.random() > 0.55) {
          const randomNode = Math.floor(Math.random() * layers[0].nodes)
          updated.push({
            id: `${Date.now()}-${Math.random()}`,
            startLayerIdx: 0,
            nodeIdx: randomNode,
            progress: 0,
          })
        }

        return updated
      })
    }, 50)

    return () => clearInterval(interval)
  }, [layers])

  return (
    <g>
      {signals.map((signal) => {
        const currentLayerIdx = Math.min(Math.floor(signal.progress * (layers.length - 1)), layers.length - 2)
        const nextLayerIdx = currentLayerIdx + 1
        const layerProgress = (signal.progress * (layers.length - 1) - currentLayerIdx) % 1

        if (currentLayerIdx >= layers.length - 1) return null

        const currentLayer = layers[currentLayerIdx]
        const nextLayer = layers[nextLayerIdx]

        const nodeCount = currentLayer.nodes
        const currentY = ((signal.nodeIdx + 1) / (nodeCount + 1)) * 600

        const nextNodeCount = nextLayer.nodes
        const nextNodeIdx = Math.floor(Math.random() * nextNodeCount)
        const nextY = ((nextNodeIdx + 1) / (nextNodeCount + 1)) * 600

        // Bezier curve interpolation
        const startX = (currentLayer.x / 100) * 1000
        const endX = (nextLayer.x / 100) * 1000
        const cp1x = startX + (endX - startX) / 3
        const cp2x = endX - (endX - startX) / 3

        // Calculate point on bezier curve
        const t = layerProgress
        const mt = 1 - t
        const x = mt * mt * mt * startX + 3 * mt * mt * t * cp1x + 3 * mt * t * t * cp2x + t * t * t * endX
        const y = mt * mt * mt * currentY + 3 * mt * mt * t * currentY + 3 * mt * t * t * nextY + t * t * t * nextY

        return (
          <g key={signal.id}>
            {/* Signal trail glow */}
            <motion.circle
              cx={x}
              cy={y}
              r={8 + Math.sin(layerProgress * Math.PI * 4) * 2}
              fill="none"
              stroke="url(#layerGradient)"
              strokeWidth="2"
              opacity={0.6 * (1 - layerProgress)}
              style={{
                filter: 'drop-shadow(0 0 12px rgba(0, 217, 255, 0.8))',
              }}
            />

            {/* Signal core */}
            <circle
              cx={x}
              cy={y}
              r={3}
              fill="#B620E0"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(182, 32, 224, 1))',
              }}
            />

            {/* Bright center */}
            <circle cx={x} cy={y} r={1.5} fill="#FFFFFF" opacity={0.9} />
          </g>
        )
      })}
    </g>
  )
}

// Epic Neural Network Landing Animation with Agentic Flow (11 seconds)
const NeuralNetworkLandingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const layers = [
    { id: 'input', x: 10, nodes: 5, label: 'Input Data', sublabel: 'Questions & Context', dataType: 'Questions' },
    { id: 'hidden1', x: 30, nodes: 7, label: 'Processing Layer 1', sublabel: 'Feature Extraction', dataType: 'Patterns' },
    { id: 'hidden2', x: 50, nodes: 8, label: 'Processing Layer 2', sublabel: 'Pattern Recognition', dataType: 'Insights' },
    { id: 'hidden3', x: 70, nodes: 6, label: 'Processing Layer 3', sublabel: 'Decision Reasoning', dataType: 'Reasoning' },
    { id: 'output', x: 90, nodes: 3, label: 'Agentic Decisions', sublabel: 'Calculated Answers', dataType: 'Answers' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const layerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        delay: i * 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    }),
  }

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.12,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      onAnimationComplete={() => {
        setTimeout(() => onComplete(), 4400)
      }}
    >
      <svg className="w-full h-full max-w-4xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="layerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="1" />
            <stop offset="50%" stopColor="#B620E0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="1" />
          </linearGradient>
          <filter id="nodeShadowLanding">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.8" />
            </feComponentTransfer>
          </filter>
          <filter id="connectionGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          <filter id="signalGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.9" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* DYNAMIC SIGNAL FLOW - Continuously flowing through network */}
        <DynamicSignalFlow layers={layers} />

        {/* Animated connections between layers */}
        <motion.g variants={containerVariants} initial="hidden" animate="visible">
          {layers.map((layer, layerIdx) => {
            const nextLayer = layers[layerIdx + 1]
            if (!nextLayer) return null

            const nodePositions = Array.from({ length: layer.nodes }, (_, i) => ({
              x: (layer.x / 100) * 1000,
              y: ((i + 1) / (layer.nodes + 1)) * 600,
            }))

            const nextNodePositions = Array.from({ length: nextLayer.nodes }, (_, i) => ({
              x: (nextLayer.x / 100) * 1000,
              y: ((i + 1) / (nextLayer.nodes + 1)) * 600,
            }))

            return (
              <motion.g
                key={`connections-${layerIdx}`}
                custom={layerIdx}
                variants={layerVariants}
              >
                {nodePositions.map((node, nodeIdx) =>
                  nextNodePositions.map((nextNode, nextNodeIdx) => {
                    // Bezier control points for curved lines
                    const cp1x = node.x + (nextNode.x - node.x) / 3
                    const cp1y = node.y
                    const cp2x = nextNode.x - (nextNode.x - node.x) / 3
                    const cp2y = nextNode.y

                    return (
                      <motion.path
                        key={`line-${layerIdx}-${nodeIdx}-${nextNodeIdx}`}
                        d={`M ${node.x} ${node.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nextNode.x} ${nextNode.y}`}
                        stroke="url(#layerGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0"
                        filter="url(#connectionGlow)"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{
                          opacity: [0, 0.25, 0.4, 0.25],
                          pathLength: [0, 1],
                        }}
                        transition={{
                          duration: 1.8,
                          delay: layerIdx * 0.8 + 0.5,
                          ease: 'easeInOut',
                        }}
                      />
                    )
                  })
                )}
              </motion.g>
            )
          })}
        </motion.g>

        {/* Animated nodes for each layer */}
        {layers.map((layer, layerIdx) => {
          const nodeCount = layer.nodes
          const nodePositions = Array.from({ length: nodeCount }, (_, i) => ({
            x: (layer.x / 100) * 1000,
            y: ((i + 1) / (nodeCount + 1)) * 600,
          }))

          return (
            <motion.g key={`layer-${layerIdx}`} custom={layerIdx} variants={layerVariants} initial="hidden" animate="visible">
              {/* Layer label - Main */}
              <motion.text
                x={(layer.x / 100) * 1000}
                y={35}
                textAnchor="middle"
                className="text-sm font-bold fill-cyan-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: layerIdx * 0.8 + 0.1,
                }}
                style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px' }}
              >
                {layer.label}
              </motion.text>

              {/* Layer sublabel */}
              <motion.text
                x={(layer.x / 100) * 1000}
                y={52}
                textAnchor="middle"
                className="text-xs fill-lime-400/70"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: layerIdx * 0.8 + 0.25,
                }}
                style={{ fontSize: '10px', fontStyle: 'italic' }}
              >
                {layer.sublabel}
              </motion.text>

              {/* Layer divider line for data flow indication */}
              <motion.line
                x1={(layer.x / 100) * 1000 - 50}
                y1={100}
                x2={(layer.x / 100) * 1000 + 50}
                y2={100}
                stroke="url(#layerGradient)"
                strokeWidth="1"
                opacity="0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0.5, 0.3] }}
                transition={{
                  duration: 2.2,
                  delay: layerIdx * 0.8 + 0.4,
                  ease: 'easeInOut',
                }}
              />

              {/* Nodes */}
              {nodePositions.map((pos, nodeIdx) => (
                <g key={`node-${layerIdx}-${nodeIdx}`}>
                  {/* Outer glow ring */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={18}
                    fill="none"
                    stroke="url(#layerGradient)"
                    strokeWidth="1"
                    opacity="0"
                    initial={{ opacity: 0, r: 8 }}
                    animate={{
                      opacity: [0, 0.6, 0.3],
                      r: [8, 25, 18],
                    }}
                    transition={{
                      duration: 1.6,
                      delay: layerIdx * 0.8 + nodeIdx * 0.15 + 0.3,
                      ease: 'easeOut',
                    }}
                  />

                  {/* Main node */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={12}
                    fill="url(#layerGradient)"
                    custom={nodeIdx}
                    variants={nodeVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: layerIdx * 0.8 + nodeIdx * 0.12 + 0.4,
                    }}
                    filter="url(#nodeShadowLanding)"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)',
                    }}
                  />

                  {/* Inner pulse */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={6}
                    fill="white"
                    opacity="0.8"
                    initial={{ opacity: 0, r: 2 }}
                    animate={{
                      opacity: [0.8, 0.3, 0.8],
                      r: [2, 8, 6],
                    }}
                    transition={{
                      duration: 2.4,
                      delay: layerIdx * 0.8 + nodeIdx * 0.12 + 0.5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                    }}
                  />
                </g>
              ))}
            </motion.g>
          )
        })}

        {/* Center title and description */}
        <motion.g
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 9, ease: 'easeOut' }}
        >
          <text
            x="500"
            y="300"
            textAnchor="middle"
            className="text-4xl font-black fill-white"
            style={{ fontSize: '48px', fontWeight: 'black' }}
          >
            Farhan Siddiqui
          </text>
          <text
            x="500"
            y="360"
            textAnchor="middle"
            className="text-2xl fill-cyan-400"
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          >
            AI/ML & Full-Stack Developer
          </text>
          <text
            x="500"
            y="400"
            textAnchor="middle"
            className="text-base fill-slate-300"
            style={{ fontSize: '16px' }}
          >
            Neural Networks • Deep Learning • Data Science
          </text>
        </motion.g>

        {/* Data type labels showing transformation from Questions to Answers */}
        {layers.map((layer, idx) => (
          <motion.g key={`data-label-${idx}`}>
            <motion.text
              x={(layer.x / 100) * 1000}
              y={575}
              textAnchor="middle"
              className="text-xs fill-cyan-300/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.8 + 1.5,
              }}
              style={{ fontSize: '11px', fontWeight: '600' }}
            >
              ↓ {layer.dataType}
            </motion.text>
          </motion.g>
        ))}

        {/* Progress indicator - Extended to 14s for complete formation with data transformation */}
        <motion.rect
          x="200"
          y="520"
          width="0"
          height="4"
          fill="url(#layerGradient)"
          animate={{ width: 600 }}
          transition={{ duration: 14, ease: 'easeInOut' }}
          rx="2"
        />
      </svg>
    </motion.div>
  )
}

export default function Home() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [floatingCodeIndex, setFloatingCodeIndex] = useState(0)
  const [showLanding, setShowLanding] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Lock scroll during landing animation
  useEffect(() => {
    if (showLanding) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [showLanding])
  
  const backgroundY = useTransform(scrollY, [0, 2000], [0, 300])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      setScrollProgress(progress)

      const sections = ['hero', 'about', 'ai-projects', 'products', 'dev-projects', 'skills', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 text-foreground overflow-x-hidden relative">
      {/* Epic Neural Network Landing Animation */}
      <AnimatePresence>
        {showLanding && (
          <NeuralNetworkLandingAnimation onComplete={() => setShowLanding(false)} />
        )}
      </AnimatePresence>

      {/* Main Content - Fades in after landing animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLanding ? 0 : 1 }}
        transition={{ duration: 0.8, delay: showLanding ? 0 : 0.2 }}
        className="w-full"
      >
        {/* Intelligent Spotlight Cursor */}
        <SpotlightCursor mousePosition={mousePosition} />

        {/* Premium Ambient Background Effects with Neon */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Neon Cyan Orb */}
        <motion.div
          className="absolute top-20 left-1/4 w-[900px] h-[900px] bg-gradient-to-br from-cyan-500/25 via-blue-500/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ y: backgroundY }}
        />
        {/* Neon Lime Orb */}
        <motion.div
          className="absolute bottom-0 right-1/3 w-[700px] h-[700px] bg-gradient-to-bl from-lime-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ y: backgroundY }}
        />
        {/* Neon Violet Orb */}
        <motion.div
          className="absolute top-1/3 -left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/20 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        {/* Central Mesh Gradient */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-indigo-500/8 via-transparent to-cyan-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Interactive Mouse-Following Gradient - Neon */}
        <motion.div
          className="fixed w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: `radial-gradient(circle, rgba(0, 217, 255, 0.25) 0%, transparent 70%)`,
            left: mousePosition.x + '%',
            top: mousePosition.y + '%',
            x: '-50%',
            y: '-50%',
          }}
        />
      </div>

      {/* Premium Neon Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-gradient-to-r from-cyan-500 via-violet-500 to-lime-500 shadow-lg shadow-cyan-500/50"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* Premium Floating Navigation with Glassmorphism */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-slate-900/50 dark:bg-slate-950/60 backdrop-blur-2xl border border-cyan-500/20 dark:border-cyan-500/30 rounded-2xl px-2 py-2 shadow-2xl shadow-cyan-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="hidden md:flex items-center gap-1 relative z-10">
            {[
              { id: 'about', label: 'About' },
              { id: 'ai-projects', label: 'AI Projects' },
              { id: 'products', label: 'Products' },
              { id: 'dev-projects', label: 'Development' },
              { id: 'skills', label: 'Skills' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-cyan-400 dark:text-cyan-300'
                    : 'text-slate-400 dark:text-slate-400 hover:text-slate-200 dark:hover:text-slate-200'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 dark:from-cyan-500/15 dark:to-violet-500/15 rounded-xl border border-cyan-500/40"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="ml-2 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white rounded-xl shadow-lg shadow-cyan-500/30 font-semibold"
            >
              Contact
            </Button>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-700/50 dark:hover:bg-slate-800/50 transition-colors relative z-10"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
          </button>
        </div>

        {/* Mobile Menu - Premium Glassmorphism */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl p-4 shadow-2xl shadow-cyan-500/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />
              <div className="flex flex-col gap-2 relative z-10">
                {['about', 'ai-projects', 'products', 'dev-projects', 'skills'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                      activeSection === item
                        ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 dark:text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 dark:text-slate-400 hover:bg-slate-800/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                  </button>
                ))}
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-semibold"
                >
                  Contact
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Premium Enhanced */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-24 pb-16 overflow-hidden" ref={heroRef}>
        {/* Neural Network Background - AI-Inspired Effect */}
        <div className="absolute inset-0 opacity-40">
          <NeuralNetworkBackground heroRef={heroRef} />
        </div>

        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ opacity, scale }}
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium Animated Badge with Neon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                <div className="relative bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-xl border border-cyan-500/40 rounded-full px-6 py-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                       Data Scientist • AI/ML Expert
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Epic Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-wider mb-6 leading-tight">
                <span className="block mb-2 text-white">Farhan</span>
                <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent drop-shadow-lg">
                  Siddiqui
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 2 150 2 298 10"
                      stroke="url(#neonGradient)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      filter="drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))"
                    />
                    <defs>
                      <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00D9FF" />
                        <stop offset="50%" stopColor="#B620E0" />
                        <stop offset="100%" stopColor="#00FF88" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Premium Subtitle - Fixed HTML Structure */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-slate-200 dark:text-slate-100 mb-8 leading-tight">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Mastering{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent font-black">
                    AI Intelligence
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-cyan-500/40 to-violet-500/40 -z-10 blur-sm"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  />
                </span>
                {' '}& Development
              </motion.div>
            </div>

            {/* Epic Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 dark:text-slate-300 mb-14 max-w-3xl mx-auto leading-relaxed font-medium"
            >
               faculty bridging academia and industry, transforming cutting-edge AI/ML research into production-ready intelligence systems. Expert in deep learning, NLP, computer vision, and enterprise development.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-20"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('ai-projects')}
                className="group bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-7 text-sm sm:text-base md:text-lg font-bold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300 border border-cyan-400/50"
              >
                Explore AI Projects
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-7 text-sm sm:text-base md:text-lg font-bold border-2 border-violet-500/50 hover:bg-violet-500/10 dark:hover:bg-violet-500/10 text-slate-200 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </Button>
            </motion.div>

            {/* Premium Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto"
            >
              {[
                { value: '7+', label: 'Years Experience', icon: Award },
                { value: '50+', label: 'AI Projects', icon: Brain },
                { value: '1000+', label: 'Students Taught', icon: GraduationCap },
                { value: '10+', label: 'Products Built', icon: Rocket },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-violet-500/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-500/40 transition-colors">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-xl mb-4 shadow-lg shadow-cyan-500/30"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Premium Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-violet-500 rounded-full blur-lg opacity-60" />
            <div className="relative w-8 h-12 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-lg border border-cyan-500/40 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-gradient-to-b from-cyan-400 to-violet-400 rounded-full shadow-lg shadow-cyan-500/50"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section - Coming Next */}
      <section id="about" className="py-16 md:py-32 relative border-t border-cyan-500/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header with Neon Badge */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/15 to-violet-500/15 border border-cyan-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-cyan-300">About Me</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-white">
                Bridging Academia
                <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  & Industry Excellence
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Transforming cutting-edge research into real-world AI solutions with industry impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column */}
              <motion.div variants={fadeInUp} className="space-y-4 md:space-y-6">
                {/* Academic Excellence - Glassmorphism */}
                <Card className="group relative overflow-hidden border border-cyan-500/20 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">Academic Excellence</CardTitle>
                    <CardDescription className="text-base text-slate-300">
                      Years of transformative teaching experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <p className="text-slate-300 leading-relaxed">
                      With several years of experience in academic teaching, I have mentored over 1000 students in data science, machine learning, and AI. My teaching philosophy combines theoretical foundations with hands-on practical applications.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Designed and taught comprehensive AI/ML curriculum',
                        'Mentored students for research publications and industry placements',
                        'Conducted workshops and training sessions for industry professionals',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 shadow-lg shadow-lime-500/30"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-slate-200">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Research & Innovation */}
                <Card className="group relative overflow-hidden border border-violet-500/20 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-violet-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Brain className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">Research & Innovation</CardTitle>
                    <CardDescription className="text-base text-slate-300">
                      Pushing boundaries of AI technology
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-slate-300 leading-relaxed">
                      My research interests span across Natural Language Processing, Computer Vision, and Deep Learning architectures. I actively contribute to open-source projects and stay updated with the latest advancements in AI technology.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Column */}
              <motion.div variants={fadeInUp} className="space-y-6">
                {/* Industry Experience */}
                <Card className="group relative overflow-hidden border border-lime-500/20 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-500/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl mb-4 shadow-lg shadow-lime-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Zap className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">Industry Experience</CardTitle>
                    <CardDescription className="text-base text-slate-300">
                      Building production-ready AI solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <p className="text-slate-300 leading-relaxed">
                      Beyond academia, I have extensive experience building production-ready AI solutions for real-world problems. From startups to enterprise applications, I bring practical expertise to every project.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Built scalable AI products serving thousands of users',
                        'Developed custom ML models for diverse industry use cases',
                        'Led cross-functional teams in product development',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 shadow-lg shadow-lime-500/30"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-slate-200">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Mission */}
                <Card className="group relative overflow-hidden border border-cyan-500/20 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-xl transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">My Mission</CardTitle>
                    <CardDescription className="text-base text-slate-300">
                      Empowering the next generation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-slate-300 leading-relaxed">
                      To empower the next generation of AI practitioners by sharing knowledge, building innovative solutions, and pushing the boundaries of what's possible with artificial intelligence.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI/ML Projects Section */}
      <section id="ai-projects" className="py-16 md:py-32 relative border-t border-cyan-500/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500/15 to-cyan-500/15 border border-lime-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-gradient-to-r from-lime-400 to-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-lime-300">AI & Machine Learning</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-white">
                Intelligent
                <span className="block bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">
                  Solutions Showcase
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Cutting-edge AI projects demonstrating mastery across multiple domains
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: 'Natural Language Processing',
                  desc: 'Advanced text analysis & understanding',
                  gradient: 'from-cyan-500 to-blue-500',
                  tags: ['BERT', 'GPT', 'Transformers', 'spaCy'],
                  items: [
                    'Sentiment Analysis for Product Reviews',
                    'Text Summarization Engine',
                    'Multi-language Translation System',
                    'Chatbot with Context Awareness'
                  ]
                },
                {
                  icon: BarChart3,
                  title: 'Classification Systems',
                  desc: 'Predictive modeling & categorization',
                  gradient: 'from-violet-500 to-purple-500',
                  tags: ['Random Forest', 'XGBoost', 'SVM', 'Neural Networks'],
                  items: [
                    'Credit Card Fraud Detection',
                    'Email Spam Classifier',
                    'Disease Prediction System',
                    'Customer Churn Prediction'
                  ]
                },
                {
                  icon: Camera,
                  title: 'Computer Vision',
                  desc: 'Object detection & image analysis',
                  gradient: 'from-lime-500 to-green-500',
                  tags: ['YOLO', 'Faster R-CNN', 'OpenCV', 'PyTorch'],
                  items: [
                    'Real-time Object Tracking',
                    'Face Recognition System',
                    'Vehicle Counting & Analytics',
                    'Medical Image Segmentation'
                  ]
                },
                {
                  icon: TrendingUp,
                  title: 'Time Series Analysis',
                  desc: 'Prediction & forecasting models',
                  gradient: 'from-cyan-500 to-teal-500',
                  tags: ['LSTM', 'Prophet', 'ARIMA', 'GRU'],
                  items: [
                    'Stock Price Prediction',
                    'Sales Demand Forecasting',
                    'Weather Prediction Model',
                    'Anomaly Detection System'
                  ]
                },
                {
                  icon: Users,
                  title: 'Recommender Systems',
                  desc: 'Personalized recommendations',
                  gradient: 'from-violet-500 to-pink-500',
                  tags: ['Collaborative Filtering', 'Matrix Factorization', 'Deep Learning'],
                  items: [
                    'E-commerce Product Recommendations',
                    'Movie/Content Suggestions',
                    'Music Playlist Generator',
                    'Personalized News Feed'
                  ]
                },
                {
                  icon: Sparkles,
                  title: 'Generative AI',
                  desc: 'Content creation & synthesis',
                  gradient: 'from-lime-500 to-cyan-500',
                  tags: ['GANs', 'Diffusion Models', 'VAEs', 'LLMs'],
                  items: [
                    'Image Generation & Editing',
                    'Text Generation & Completion',
                    'Style Transfer Applications',
                    'Code Generation System'
                  ]
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-slate-700/50 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500 hover:border-cyan-500/40">
                    {/* Animated gradient overlay on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient}/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl mb-4 shadow-lg`}
                        style={{ boxShadow: `0 10px 40px -10px` }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <project.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-lime-400 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-300 group-hover:text-slate-200 transition-colors">
                        {project.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Badge className="bg-slate-800/70 text-slate-200 border border-slate-700/50 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-violet-500/30 hover:border-cyan-500/60 transition-all cursor-pointer">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {project.items.map((item, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2 text-sm text-slate-300 group-hover:text-slate-100 transition-colors"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <span className="w-1.5 h-1.5 bg-gradient-to-br from-cyan-400 to-lime-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-32 relative border-t border-cyan-500/10 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent overflow-hidden">
        {/* Data Flow Particle Animation Background */}
        <div className="absolute inset-0 opacity-30">
          <DataFlowParticles />
        </div>

        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/15 to-pink-500/15 border border-violet-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-violet-300">Products & Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-white">
                Production-Ready
                <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  AI Solutions
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Industry-proven products solving real-world challenges at scale
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  name: 'Monetrix',
                  desc: 'AI-Powered CCTV Analytics',
                  gradient: 'from-cyan-600 to-blue-600',
                  icon: Camera,
                  status: 'Production Ready',
                  features: [
                    'Real-time object detection & tracking',
                    'Facial recognition & identification',
                    'Automated security alerts',
                    'People counting & analytics'
                  ],
                  useCases: [
                    'Retail store analytics',
                    'Building security management',
                    'Traffic monitoring',
                    'Crowd safety monitoring'
                  ],
                  tags: ['YOLO', 'OpenCV', 'Edge Computing', 'Real-time Processing'],
                  description: 'Monetrix transforms traditional CCTV systems into intelligent surveillance solutions using advanced computer vision and AI analytics. It provides real-time insights, automated alerts, and comprehensive data analysis for security and business intelligence.'
                },
                {
                  name: 'FlowMind',
                  desc: 'AI Audio Transcription Service',
                  gradient: 'from-violet-600 to-purple-600',
                  icon: MessageSquare,
                  status: 'Production Ready',
                  features: [
                    'Real-time speech-to-text',
                    'Multi-language support',
                    'Speaker diarization',
                    'AI-powered summarization'
                  ],
                  useCases: [
                    'Meeting transcription',
                    'Podcast content creation',
                    'Medical dictation',
                    'Accessibility solutions'
                  ],
                  tags: ['Whisper', 'Deep Learning', 'NLP', 'Real-time API'],
                  description: 'FlowMind is a powerful audio transcription service that converts speech to text with exceptional accuracy. Supporting multiple languages and speakers, it provides real-time transcription, speaker identification, and intelligent summarization capabilities.'
                },
                {
                  name: 'SuperTrading View',
                  desc: 'AI Trading Assistant',
                  gradient: 'from-lime-600 to-green-600',
                  icon: TrendingUp,
                  status: 'Production Ready',
                  features: [
                    'AI-powered market analysis',
                    'Pattern recognition & alerts',
                    'Predictive price movements',
                    'Risk assessment tools'
                  ],
                  useCases: [
                    'Stock market trading',
                    'Cryptocurrency analysis',
                    'Forex trading',
                    'Portfolio management'
                  ],
                  tags: ['Time Series ML', 'Deep Learning', 'Real-time Data', 'Technical Analysis'],
                  description: 'SuperTrading View is an intelligent trading assistant that leverages AI and machine learning to provide traders with actionable insights, pattern recognition, and predictive analytics for better decision-making in financial markets.'
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative overflow-hidden border border-slate-700/50 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-lg">
                    <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${product.gradient}/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <div className="md:flex relative">
                      <div className={`md:w-1/3 bg-gradient-to-br ${product.gradient} p-10 flex flex-col justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <motion.div
                          className="relative w-20 h-20 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <product.icon className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="relative text-4xl font-black text-white mb-2">{product.name}</h3>
                        <p className="relative text-white/80 text-lg">{product.desc}</p>
                      </div>
                      
                      <div className="md:w-2/3 p-10">
                        <div className="flex items-start justify-between mb-6">
                          <Badge className="bg-gradient-to-r from-lime-500 to-cyan-500 text-white border-0 shadow-lg shadow-lime-500/30">
                            {product.status}
                          </Badge>
                          <Badge variant="outline" className="gap-2 hover:bg-slate-800/50 transition-colors border-slate-600/50">
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </Badge>
                        </div>
                        
                        <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                          {product.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
                              <Layers className="w-5 h-5 text-cyan-400" />
                              Key Features
                            </h4>
                            <ul className="space-y-2">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                  <span className="w-1.5 h-1.5 bg-gradient-to-br from-cyan-400 to-lime-400 rounded-full mt-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
                              <Target className="w-5 h-5 text-violet-400" />
                              Use Cases
                            </h4>
                            <ul className="space-y-2">
                              {product.useCases.map((useCase, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                  <span className="w-1.5 h-1.5 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-slate-800/70 text-slate-200 border border-slate-700/50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Development Projects Section */}
      <section id="dev-projects" className="py-16 md:py-32 relative border-t border-cyan-500/10 overflow-hidden">
        {/* Floating Code Snippets Background */}
        <FloatingCodeSnippets />

        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-emerald-300">Full-Stack Development</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-white">
                Enterprise
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Applications
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Comprehensive web and mobile solutions for complex business challenges
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: 'Whatcast',
                  desc: 'WhatsApp API Chat & CRM Platform',
                  gradient: 'from-emerald-500 to-green-600',
                  badge: 'Featured',
                  features: [
                    'Real-time WhatsApp messaging',
                    'Automated chatbots & workflows',
                    'Contact management & CRM',
                    'Analytics & reporting dashboard',
                    'Multi-agent support'
                  ],
                  tags: ['Node.js', 'React', 'WhatsApp API', 'MongoDB', 'Socket.io']
                },
                {
                  icon: Server,
                  title: 'Enterprise ERP Solutions',
                  desc: 'Business management systems',
                  gradient: 'from-blue-500 to-indigo-600',
                  features: [
                    'Inventory & warehouse management',
                    'Sales & purchase tracking',
                    'Financial accounting',
                    'HR & payroll management',
                    'Production planning'
                  ],
                  tags: ['Python', 'Django', 'PostgreSQL', 'React', 'REST API']
                },
                {
                  icon: Globe,
                  title: 'Web Applications',
                  desc: 'Modern web solutions',
                  gradient: 'from-purple-500 to-violet-600',
                  features: [
                    'SaaS platforms with subscription models',
                    'E-commerce solutions',
                    'Learning management systems',
                    'Booking & reservation systems',
                    'Content management platforms'
                  ],
                  tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma']
                },
                {
                  icon: Smartphone,
                  title: 'Mobile Applications',
                  desc: 'Cross-platform mobile solutions',
                  gradient: 'from-orange-500 to-red-600',
                  features: [
                    'Fitness tracking applications',
                    'Social networking apps',
                    'E-commerce mobile apps',
                    'Productivity tools',
                    'Healthcare & wellness apps'
                  ],
                  tags: ['React Native', 'Flutter', 'Firebase', 'Expo']
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-slate-700/50 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient}/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <project.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        {project.badge && (
                          <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 shadow-lg shadow-emerald-500/30">
                            {project.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-300">
                        {project.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-white">
                          <Star className="w-5 h-5 text-amber-400" />
                          Core Features
                        </h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="w-1.5 h-1.5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-slate-800/70 text-slate-200 border border-slate-700/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-32 relative border-t border-cyan-500/10 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/15 to-purple-500/15 border border-violet-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-violet-300">Expertise</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-white">
                Skills &
                <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Technologies
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Proficient across the full spectrum of AI, ML, and modern development
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-16">
              {[
                {
                  icon: Brain,
                  title: 'Machine Learning',
                  gradient: 'from-violet-500 to-pink-500',
                  skills: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'Time Series Analysis']
                },
                {
                  icon: Code2,
                  title: 'Programming',
                  gradient: 'from-cyan-500 to-blue-500',
                  skills: ['Python', 'JavaScript/TypeScript', 'SQL', 'R', 'Java']
                },
                {
                  icon: Database,
                  title: 'Data & Cloud',
                  gradient: 'from-lime-500 to-emerald-500',
                  skills: ['PostgreSQL', 'MongoDB', 'AWS', 'Google Cloud', 'Big Data Processing']
                },
                {
                  icon: Cpu,
                  title: 'Frameworks & Tools',
                  gradient: 'from-orange-500 to-amber-500',
                  skills: ['TensorFlow / PyTorch', 'React / Next.js', 'Django / FastAPI', 'Docker / Kubernetes', 'Git / CI/CD']
                }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-slate-700/50 bg-slate-900/40 dark:bg-slate-950/60 hover:bg-slate-900/60 dark:hover:bg-slate-950/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-500">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${skill.gradient}/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative">
                      <motion.div
                        className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${skill.gradient} rounded-2xl shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <skill.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-bold mt-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {skill.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="relative">
                      <ul className="space-y-2">
                        {skill.skills.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Animated Proficiency Bars */}
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mt-12 p-8 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-lg border border-slate-700/50 rounded-2xl">
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full animate-pulse" />
                Proficiency Levels
              </h3>
              <div className="space-y-6">
                {[
                  { skill: 'Deep Learning & Neural Networks', percentage: 95 },
                  { skill: 'Data Analysis & Processing', percentage: 92 },
                  { skill: 'Full-Stack Development', percentage: 88 },
                  { skill: 'Cloud Architecture & DevOps', percentage: 85 },
                  { skill: 'Team Leadership & Mentorship', percentage: 90 }
                ].map((item, idx) => (
                  <SkillBar key={idx} skill={item.skill} percentage={item.percentage} delay={idx * 100} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 relative border-t border-cyan-500/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/15 to-orange-500/15 border border-rose-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-rose-300">Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-white">
                Let's Work
                <span className="block bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Open to collaborations, consulting, and teaching opportunities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Contact Form */}
              <motion.div variants={fadeInUp}>
                <Card className="relative overflow-hidden border border-slate-700/50 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-lg shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/15 to-orange-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2 text-white">Send a Message</CardTitle>
                    <CardDescription className="text-base text-slate-300">
                      I'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6">
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-white">Name</label>
                      <Input placeholder="Your name" className="h-12 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-cyan-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-white">Email</label>
                      <Input type="email" placeholder="your@email.com" className="h-12 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-cyan-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-white">Subject</label>
                      <Input placeholder="What's this about?" className="h-12 rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-cyan-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-white">Message</label>
                      <Textarea placeholder="Your message..." rows={5} className="rounded-xl border border-slate-700/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-cyan-500 transition-colors resize-none" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white rounded-xl h-12 text-base font-semibold shadow-xl shadow-cyan-500/30">
                      Send Message
                      <Mail className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <Card className="relative overflow-hidden border border-slate-700/50 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-violet-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2 text-white">Contact Information</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-4">
                    {[
                      { icon: Mail, label: 'farhansiddiqui0156@gmail.com' },
                      { icon: Github, label: 'github.com/farhan2905' },
                      { icon: Linkedin, label: 'linkedin.com/in/siddiquifarhann' },
                      { icon: Twitter, label: '9081061103' }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer"
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-slate-200">{item.label}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden border border-slate-700/50 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-500/15 to-emerald-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2 text-white">Available For</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <ul className="space-y-3">
                      {[
                        'AI/ML Consulting',
                        'Project Collaboration',
                        'Guest Lectures & Workshops',
                        'Technical Writing',
                        'Mentorship'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-200">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-lime-500/30"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </motion.div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Premium Style */}
      <footer className="py-8 md:py-12 border-t border-cyan-500/10 bg-gradient-to-r from-slate-900 to-indigo-950/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-xl flex items-center justify-center shadow-xl shadow-cyan-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="font-bold text-lg text-white">Farhan Siddiqui</span>
                <p className="text-sm text-slate-400">Data Science & AI/ML Faculty</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 text-center">
              © {new Date().getFullYear()} Farhan Siddiqui. All rights reserved.
            </p>
            
            <div className="flex items-center gap-3">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' }
              ].map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800/60 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-violet-500 rounded-xl flex items-center justify-center transition-all duration-300 group border border-slate-700/50 hover:border-cyan-500/50"
                >
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </footer>
      </motion.div>
    </div>
  )
}

const Zap = TrendingUp
