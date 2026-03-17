'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Menu, X, ArrowRight, Sparkles, Award, Brain, GraduationCap, Rocket,
  Mail, Github, Linkedin, Twitter, MessageSquare, BarChart3, Camera, TrendingUp,
  Users, CheckCircle2, Server, Globe, Smartphone, Star, Layers, Target,
  Code2, Database, Cpu, ExternalLink
} from 'lucide-react'

const LazyInteractiveNeuralNetwork = dynamic(
  () => import('@/components/interactive-neural-network'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.10),transparent_70%)]" />
    ),
  }
)

const LazyDataFlowParticles = dynamic(
  { ssr: false }
)

const LazyFloatingCodeSnippets = dynamic(
  () => import('@/components/floating-code-snippets'),
  { ssr: false }
)

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
    const isMobile = window.innerWidth < 768;
    const newNodes = Array.from({ length: isMobile ? 6 : 14 }, (_, i) => ({
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
          <stop offset="0%" stopColor="#4DEEFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#D966FF" stopOpacity="0.6" />
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

// Heavy background effects are split into lazy-loaded components.

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
    }, 150)

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
                filter: 'drop-shadow(0 0 12px rgba(77, 238, 255, 0.8))',
              }}
            />

            {/* Signal core */}
            <circle
              cx={x}
              cy={y}
              r={3}
              fill="#D966FF"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(217, 102, 255, 1))',
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
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (hasCompletedRef.current) return
    const timer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true
        onComplete()
      }
    }, 5500)
    return () => clearTimeout(timer)
  }, [])

  const layers = [
    { id: 'input', x: 12, nodes: 5, label: 'Input Data', sublabel: 'Questions & Context', dataType: 'Questions' },
    { id: 'hidden1', x: 37, nodes: 7, label: 'Processing Layer 1', sublabel: 'Feature Extraction', dataType: 'Patterns' },
    { id: 'hidden2', x: 62, nodes: 8, label: 'Processing Layer 2', sublabel: 'Decision Reasoning', dataType: 'Reasoning' },
    { id: 'output', x: 88, nodes: 3, label: 'Agentic Decisions', sublabel: 'Calculated Answers', dataType: 'Answers' }
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
      className="fixed inset-0  z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
    >
      <svg 
        className="w-full h-full max-w-4xl" 
        viewBox="0 0 1000 600" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="layerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DEEFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#D966FF" stopOpacity="0.8" />
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
                        stroke="black"
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
                className="text-sm font-bold fill-black"
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
                className="text-xs fill-black opacity-70"
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
                stroke="black"
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
                      delay: layerIdx * 0.4 + nodeIdx * 0.06 + 0.2,
                    }}
                    filter="url(#nodeShadowLanding)"
                    style={{
                      boxShadow: '0 0 20px rgba(77, 238, 255, 0.8)',
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
          transition={{ duration: 1.2, delay: 3, ease: 'easeOut' }}
        >
          <text
            x="500"
            y="300"
            textAnchor="middle"
            className="text-4xl font-black fill-black"
            style={{ fontSize: '48px', fontWeight: 'black' }}
          >
            Farhan Siddiqui
          </text>
          <text
            x="500"
            y="360"
            textAnchor="middle"
            className="text-2xl"
            fill="url(#layerGradient)"
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          >
            AI/ML & Full-Stack Developer
          </text>
          <text
            x="500"
            y="400"
            textAnchor="middle"
            className="text-base"
            fill="url(#layerGradient)"
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
              className="text-xs fill-black opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.8 + 1.5,
              }}
              style={{ fontSize: '11px', fontWeight: '600' }}
            >
              Ôåô {layer.dataType}
            </motion.text>
          </motion.g>
        ))}

        {/* Progress indicator */}
        <motion.rect
          x="200"
          y="520"
          width="0"
          height="4"
          fill="black"
          animate={{ width: 600 }}
          transition={{ duration: 4.8, ease: 'easeInOut' }}
          rx="2"
        />
      </svg>
    </motion.div>
  )
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const enableHeavyEffects = !shouldReduceMotion
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showLanding, setShowLanding] = useState(() => enableHeavyEffects)
  const handleLandingComplete = useCallback(() => setShowLanding(false), [])
  const mouseFrameRef = useRef<number | null>(null)
  const pendingMouseRef = useRef({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const landingActive = showLanding && enableHeavyEffects
  const sectionRevealProps = enableHeavyEffects
    ? {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '-100px' },
        variants: staggerContainer,
      }
    : {
        viewport: { once: true, margin: '0px' },
      }

  // Lock scroll during landing animation
  useEffect(() => {
    if (landingActive) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [landingActive])
  
  const backgroundY = useTransform(scrollY, [0, 2000], [0, 300])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      setScrollProgress(progress)

      const sections = ['hero', 'about', 'ai-projects', 'products', 'dev-projects', 'contact']
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
      if (isMobile) return;

      pendingMouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      if (mouseFrameRef.current === null) {
        mouseFrameRef.current = requestAnimationFrame(() => {
          setMousePosition(pendingMouseRef.current)
          mouseFrameRef.current = null
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    if (enableHeavyEffects) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (mouseFrameRef.current !== null) {
        cancelAnimationFrame(mouseFrameRef.current)
      }
    }
  }, [enableHeavyEffects])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen  dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 text-foreground overflow-x-hidden relative">
      {/* Epic Neural Network Landing Animation */}
      <AnimatePresence>
        {landingActive && (
          <NeuralNetworkLandingAnimation onComplete={handleLandingComplete} />
        )}
      </AnimatePresence>

      {/* Main Content - Fades in after landing animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: landingActive ? 0 : 1 }}
        transition={{ duration: 0.5, delay: landingActive ? 0 : 0.1 }}
        className="w-full"
      >
        {/* Intelligent Spotlight Cursor */}
        {enableHeavyEffects && !isMobile && <SpotlightCursor mousePosition={mousePosition} />}

        {/* Premium Ambient Background Effects with Neon */}
      {enableHeavyEffects ? (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Neon Cyan Orb */}
        <motion.div
          className="absolute top-20 left-1/4 w-[760px] h-[760px] bg-gradient-to-br from-sky-400/16 via-indigo-400/10 to-transparent rounded-full "
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
        />
        {/* Neon Lime Orb */}
        <motion.div
          className="absolute bottom-0 right-1/3 w-[620px] h-[620px] bg-gradient-to-bl from-teal-400/12 via-emerald-400/8 to-transparent rounded-full "
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
        />
        {/* Neon Violet Orb */}
        <motion.div
          className="absolute top-1/3 -left-1/4 w-[680px] h-[680px]  rounded-full "
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-indigo-500/8 via-transparent to-cyan-500/8 rounded-full "
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
          className="fixed w-80 h-80 rounded-full  opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 72%)`,
            left: mousePosition.x,
            top: mousePosition.y,
            x: '-50%',
            y: '-50%',
          }}
        />
      </div>
      ) : (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,140,255,0.14),transparent_65%)]" />
      </div>
      )}

      {/* Premium Neon Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 z-50   "
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* Premium Floating Navigation with Glassmorphism */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-white dark:bg-black dark:bg-white dark:bg-black  border  dark: rounded-2xl px-2 py-2   relative overflow-hidden group">
          <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="hidden md:flex items-center gap-1 relative z-10">
            {[
              { id: 'about', label: 'About' },
              { id: 'ai-projects', label: 'Intelligent Solutions' },
              { id: 'products', label: 'Products' },
              { id: 'dev-projects', label: 'Development' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-black dark:text-black dark:text-white dark:text-black dark:text-black dark:text-white'
                    : 'text-black dark:text-black dark:text-white dark:text-black dark:text-black dark:text-white hover:text-black dark:text-black dark:text-white dark:hover:text-black dark:text-black dark:text-white'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0  dark:from-sky-500/15 dark:to-indigo-500/15 rounded-xl border "
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="ml-2 bg-black text-white hover:bg-black/80 rounded-xl font-semibold"
            >
              Contact
            </Button>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white dark:bg-black dark:hover:bg-white dark:bg-black transition-colors relative z-10"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-black dark:text-black dark:text-white" /> : <Menu className="w-5 h-5 text-black dark:text-black dark:text-white" />}
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
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black dark:bg-white dark:bg-black  border  rounded-2xl p-4   relative overflow-hidden"
            >
              <div className="absolute inset-0 " />
              <div className="flex flex-col gap-2 relative z-10">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'ai-projects', label: 'Intelligent Solutions' },
                  { id: 'products', label: 'Products' },
                  { id: 'dev-projects', label: 'Development' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                      activeSection === item.id
                        ? ' text-black dark:text-black dark:text-white dark:text-black dark:text-black dark:text-white border '
                        : 'text-black dark:text-black dark:text-white dark:text-black dark:text-black dark:text-white hover:bg-white dark:bg-black dark:hover:bg-white dark:bg-black'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-2 bg-black text-white hover:bg-black/80 font-semibold"
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
        {enableHeavyEffects && (
          <div className="absolute inset-0 opacity-28">
            <NeuralNetworkBackground heroRef={heroRef} />
          </div>
        )}

        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ opacity, scale }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7 }}
              className="relative rounded-3xl border  bg-white dark:bg-black  overflow-hidden h-[85vh] md:h-[72vh] min-h-[600px] md:min-h-[560px]"
            >
              <div className="absolute left-4 sm:left-6 top-4 sm:top-6 z-20">
                <div className="inline-flex items-center gap-2 rounded-full border  bg-white dark:bg-black px-3 py-1.5  mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-black dark:text-black dark:text-white" />
                  <span className="text-[11px] sm:text-xs font-semibold text-black dark:text-black dark:text-white">Interactive Neural Network</span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-black dark:text-black dark:text-white">
                  Farhan Siddiqui
                </h1>
                <p className="text-xs sm:text-sm text-black dark:text-black dark:text-white mt-1">
                  AI/ML Mentor & Agentic Systems Designer
                </p>
              </div>

              <div className="absolute inset-0">
                <LazyInteractiveNeuralNetwork />
              </div>
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
            <div className="absolute inset-0  rounded-full  opacity-50" />
            <div className="relative w-8 h-12 bg-white dark:bg-black dark:bg-white dark:bg-black  border  rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5  rounded-full  "
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section - Coming Next */}
      <section id="about" className="py-16 md:py-32 relative border-t ">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            {...sectionRevealProps}
          >
            {/* Section Header with Neon Badge */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2  border  rounded-full px-5 py-2 mb-6 ">
                <span className="w-2 h-2  rounded-full animate-pulse" />
                <span className="text-sm font-bold text-black dark:text-black dark:text-white">About Me</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-black dark:text-white">
                Bridging Academia
                <span className="block  text-sketch">
                  & Industry Excellence
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-white max-w-3xl mx-auto font-medium leading-relaxed">
                "We are moving from a world where we write instructions for computers to execute, to a world where we provide data and the computer discovers the rules. AI is not just a tool; it is a fundamental shift in how we solve complex problems at scale."
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
              <motion.div variants={fadeInUp}>
                <Card className="sketch-box group relative h-full overflow-hidden border  bg-white dark:bg-black dark:bg-white dark:bg-black hover:bg-white dark:bg-black dark:hover:bg-white dark:bg-black  transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full  -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12  rounded-xl mb-3  "
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <GraduationCap className="w-6 h-6 text-black dark:text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-black dark:text-white mb-1">Academic Excellence</CardTitle>
                    <CardDescription className="text-sm text-black dark:text-black dark:text-white">
                      AI/ML faculty with practical, project-first teaching
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <p className="text-black dark:text-black dark:text-white text-sm leading-relaxed">
                      I have mentored 1000+ learners across Data Science, Machine Learning, and AI by combining fundamentals with real project delivery. My approach focuses on clear concepts, production-ready execution, and strong problem-solving habits.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Designed end-to-end AI/ML curriculum with capstone outcomes',
                        'Guided students for internships, placements, and research tracks',
                        'Conducted hands-on workshops on NLP, CV, and model deployment',
                        'Mentored project teams on architecture, code quality, and delivery',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-black dark:text-black dark:text-white">
                          <span className="w-1.5 h-1.5  rounded-full mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="sketch-box group relative h-full overflow-hidden border  bg-white dark:bg-black dark:bg-white dark:bg-black hover:bg-white dark:bg-black dark:hover:bg-white dark:bg-black  transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-500/15 to-transparent rounded-full  -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12  rounded-xl mb-3  "
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Zap className="w-6 h-6 text-black dark:text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-black dark:text-white mb-1">Industry Experience</CardTitle>
                    <CardDescription className="text-sm text-black dark:text-black dark:text-white">
                      Shipping AI products for real business workflows
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <p className="text-black dark:text-black dark:text-white text-sm leading-relaxed">
                      I build and deploy practical AI systems across analytics, transcription, computer vision, and decision support. From idea to production, I focus on reliable pipelines, measurable outcomes, and maintainable full-stack delivery.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Built products like Monetrix, FlowMind, and SuperTrading View',
                        'Designed agentic workflows and automation-first system pipelines',
                        'Delivered custom ML solutions for domain-specific use cases',
                        'Collaborated with cross-functional teams from prototype to launch',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-black dark:text-black dark:text-white">
                          <span className="w-1.5 h-1.5  rounded-full mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
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

      {/* AI/ML Projects Section */}
      <section id="ai-projects" className="py-16 md:py-32 relative border-t ">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            {...sectionRevealProps}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2  border  rounded-full px-5 py-2 mb-6 ">
                <span className="w-2 h-2  rounded-full animate-pulse" />
                <span className="text-sm font-bold text-black dark:text-black dark:text-white">AI & Machine Learning</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-black dark:text-white">
                Intelligent
                <span className="block  text-sketch">
                  Solutions Showcase
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-black dark:text-white max-w-2xl mx-auto">
                A unified view of intelligent system capabilities across core AI domains and production technology stacks
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Machine Learning Systems',
                  desc: 'Modeling, prediction, and perception across structured and unstructured data',
                  gradient: 'from-cyan-500 to-blue-500',
                  tags: ['Deep Learning', 'NLP', 'Computer Vision', 'Time Series'],
                  items: [
                    'Built supervised and unsupervised models for forecasting and decision support',
                    'Delivered NLP pipelines for summarization, classification, and contextual search',
                    'Developed computer vision systems for detection, tracking, and analytics',
                    'Applied reinforcement and sequential learning for dynamic optimization tasks'
                  ]
                },
                {
                  icon: Layers,
                  title: 'Agentic Systems',
                  desc: 'Automation-first AI workflows with autonomous reasoning and execution',
                  gradient: 'from-violet-500 to-purple-500',
                  tags: ['Agentic Design', 'Workflow Automation', 'Multi-Agent', 'Tool Calling'],
                  items: [
                    'Designed agentic architectures that chain planning, retrieval, and action layers',
                    'Implemented tool-calling pipelines for business operations and support workflows',
                    'Built multi-agent orchestration patterns for collaborative task execution',
                    'Engineered decision-flow control with observability and fallback strategies'
                  ]
                },
                {
                  icon: Server,
                  title: 'IoT & Smart Systems',
                  desc: 'Edge-connected intelligence for physical environments and real-time actions',
                  gradient: 'from-lime-500 to-green-500',
                  tags: ['IoT Integration', 'SLM on Edge', 'Sensor Pipelines', 'Embedded AI'],
                  items: [
                    'Integrated sensors and connected devices into unified intelligent platforms',
                    'Applied lightweight SLM models for low-latency edge inference',
                    'Built event-driven pipelines for telemetry, alerts, and adaptive controls',
                    'Designed smart system architectures for reliability and scale'
                  ]
                },
                {
                  icon: Database,
                  title: 'Data & Cloud Intelligence',
                  desc: 'Data engineering and cloud-native infrastructure powering intelligent products',
                  gradient: 'from-cyan-500 to-teal-500',
                  tags: ['PostgreSQL', 'MongoDB', 'AWS/GCP', 'MLOps Pipelines'],
                  items: [
                    'Built robust data layers for analytics, model training, and retrieval',
                    'Deployed cloud-native AI services with scalable APIs and background jobs',
                    'Implemented MLOps practices for versioning, monitoring, and lifecycle control',
                    'Enabled secure data flow across product, model, and reporting systems'
                  ]
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="sketch-box group relative h-full overflow-hidden border  bg-white dark:bg-black dark:bg-white dark:bg-black hover:bg-white dark:bg-black dark:hover:bg-white dark:bg-black  hover: transition-all duration-500 hover:">
                    {/* Animated gradient overlay on hover */}
                    <motion.div 
                      className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient}/20 rounded-full  -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl mb-4 `}
                        style={{ boxShadow: `0 10px 40px -10px` }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <project.icon className="w-8 h-8 text-black dark:text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold mb-2 text-black dark:text-white  transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base text-black dark:text-black dark:text-white group-hover:text-black dark:text-black dark:text-white transition-colors">
                        {project.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Badge className="sketch-box border-none bg-white dark:bg-black text-black dark:text-black dark:text-white border  hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-violet-500/30 hover: transition-all cursor-pointer">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {project.items.map((item, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2 text-sm text-black dark:text-black dark:text-white group-hover:text-black dark:text-black dark:text-white transition-colors"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <span className="w-1.5 h-1.5  rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
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
      <section id="products" className="py-16 md:py-32 relative border-t  bg-gradient-to-b from-transparent via-slate-900/30 to-transparent overflow-hidden">
        {/* Data Flow Particle Animation Background */}
        <div className="absolute inset-0 opacity-30">
          {enableHeavyEffects && <LazyDataFlowParticles />}
        </div>

        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto relative z-10"
            {...sectionRevealProps}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2  border  rounded-full px-5 py-2 mb-6 ">
                <span className="w-2 h-2  rounded-full animate-pulse" />
                <span className="text-sm font-bold text-black dark:text-black dark:text-white">Products & Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-black dark:text-white">
                Production-Ready
                <span className="block  text-sketch">
                  AI Solutions
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-black dark:text-white max-w-2xl mx-auto">
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
                  <Card className="sketch-box group relative overflow-hidden border  bg-white dark:bg-black dark:bg-white dark:bg-black hover:bg-white dark:bg-black dark:hover:bg-white dark:bg-black ">
                    <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${product.gradient}/15 rounded-full  -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <div className="md:flex relative">
                      <div className={`md:w-1/3 bg-gradient-to-br ${product.gradient} p-7 flex flex-col justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <motion.div
                          className="relative w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <product.icon className="w-8 h-8 text-black dark:text-white" />
                        </motion.div>
                        <h3 className="relative text-3xl font-black text-black dark:text-white mb-1.5">{product.name}</h3>
                        <p className="relative text-black dark:text-white text-base">{product.desc}</p>
                      </div>
                      
                      <div className="md:w-2/3 p-7">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className="sketch-box border-none  text-black dark:text-white border-0  ">
                            {product.status}
                          </Badge>
                          <Badge variant="outline" className="gap-2 hover:bg-white dark:bg-black transition-colors ">
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </Badge>
                        </div>
                        
                        <p className="text-black dark:text-black dark:text-white mb-6 leading-relaxed text-base">
                          {product.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-bold text-base mb-3 flex items-center gap-2 text-black dark:text-white">
                              <Layers className="w-4 h-4 text-black dark:text-black dark:text-white" />
                              Key Features
                            </h4>
                            <ul className="space-y-2">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-black dark:text-black dark:text-white">
                                  <span className="w-1.5 h-1.5  rounded-full mt-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-base mb-3 flex items-center gap-2 text-black dark:text-white">
                              <Target className="w-4 h-4 text-black dark:text-black dark:text-white" />
                              Use Cases
                            </h4>
                            <ul className="space-y-2">
                              {product.useCases.map((useCase, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-black dark:text-black dark:text-white">
                                  <span className="w-1.5 h-1.5  rounded-full mt-2 flex-shrink-0" />
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-white dark:bg-black text-black dark:text-black dark:text-white border ">
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
      <section id="dev-projects" className="py-16 md:py-32 relative border-t  overflow-hidden">
        {/* Floating Code Snippets Background */}
        {enableHeavyEffects && <LazyFloatingCodeSnippets />}

        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto relative z-10"
            {...sectionRevealProps}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2  border  rounded-full px-5 py-2 mb-6 ">
                <span className="w-2 h-2  rounded-full animate-pulse" />
                <span className="text-sm font-bold text-emerald-300">Full-Stack Development</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-black dark:text-white">
                Enterprise
                <span className="block  text-sketch">
                  Applications
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-black dark:text-white max-w-2xl mx-auto">
                Comprehensive web and mobile solutions for complex business challenges
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: 'Whatcast',
                  desc: 'WhatsApp API Chat & CRM Platform',
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
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="sketch-box group relative h-full overflow-hidden border-2 border-black bg-white transition-all duration-500">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <motion.div
                          className={`inline-flex items-center justify-center w-12 h-12 bg-black/5 rounded-xl`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <project.icon className="w-6 h-6 text-black dark:text-white" />
                        </motion.div>
                        {project.badge && (
                          <Badge className="sketch-box border-none  text-black dark:text-white border-0  ">
                            {project.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold mb-1 text-black dark:text-white  transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-black dark:text-black dark:text-white">
                        {project.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-4 pt-0">
                      <div>
                        <h4 className="font-bold text-base mb-2 flex items-center gap-2 text-black">
                          <Star className="w-4 h-4 text-black" />
                          Core Features
                        </h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-black dark:text-black dark:text-white">
                              <span className="w-1.5 h-1.5  rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t ">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-white text-[11px] text-black border border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 relative border-t ">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            {...sectionRevealProps}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2  border  rounded-full px-5 py-2 mb-6 ">
                <span className="w-2 h-2  rounded-full animate-pulse" />
                <span className="text-sm font-bold text-rose-300">Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-black dark:text-white">
                Let's Work
                <span className="block  text-sketch">
                  Together
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-black dark:text-white max-w-2xl mx-auto">
                Open to collaborations, consulting, and teaching opportunities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Contact Form */}
              <motion.div variants={fadeInUp}>
                <Card className="sketch-box relative overflow-hidden border  bg-white dark:bg-black dark:bg-white dark:bg-black  ">
                  <div className="absolute top-0 right-0 w-64 h-64  rounded-full  -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2 text-black dark:text-white">Send a Message</CardTitle>
                    <CardDescription className="text-base text-black dark:text-black dark:text-white">
                      I'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6">
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-black dark:text-white">Name</label>
                      <Input placeholder="Your name" className="h-12 rounded-xl border  bg-white dark:bg-black text-black dark:text-white placeholder:text-black dark:text-black dark:text-white focus: transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-black dark:text-white">Email</label>
                      <Input type="email" placeholder="your@email.com" className="h-12 rounded-xl border  bg-white dark:bg-black text-black dark:text-white placeholder:text-black dark:text-black dark:text-white focus: transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-black dark:text-white">Subject</label>
                      <Input placeholder="What's this about?" className="h-12 rounded-xl border  bg-white dark:bg-black text-black dark:text-white placeholder:text-black dark:text-black dark:text-white focus: transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-black dark:text-white">Message</label>
                      <Textarea placeholder="Your message..." rows={5} className="rounded-xl border  bg-white dark:bg-black text-black dark:text-white placeholder:text-black dark:text-black dark:text-white focus: transition-colors resize-none" />
                    </div>
                    <Button className="sketch-button w-full  hover:from-sky-400 hover:to-indigo-400 text-black dark:text-white rounded-xl h-12 text-base font-semibold  ">
                      Send Message
                      <Mail className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <Card className="sketch-box relative overflow-hidden border  bg-white dark:bg-black dark:bg-white dark:bg-black ">
                  <div className="absolute top-0 right-0 w-64 h-64  rounded-full  -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2 text-black dark:text-white">Contact Information</CardTitle>
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
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:bg-black transition-colors cursor-pointer"
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-10 h-10  rounded-xl flex items-center justify-center  ">
                          <item.icon className="w-5 h-5 text-black dark:text-white" />
                        </div>
                        <span className="text-black dark:text-black dark:text-white">{item.label}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="sketch-box relative overflow-hidden border  bg-white dark:bg-black dark:bg-white dark:bg-black ">
                  <div className="absolute top-0 right-0 w-64 h-64  rounded-full  -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2 text-black dark:text-white">Available For</CardTitle>
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
                        <li key={i} className="flex items-center gap-3 text-black dark:text-black dark:text-white">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 w-6 h-6  rounded-full flex items-center justify-center  "
                          >
                            <CheckCircle2 className="w-4 h-4 text-black dark:text-white" />
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
      <footer className="py-8 md:py-12 border-t  /50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12  rounded-xl flex items-center justify-center  "
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain className="w-6 h-6 text-black dark:text-white" />
              </motion.div>
              <div>
                <span className="font-bold text-lg text-black dark:text-white">Farhan Siddiqui</span>
                <p className="text-sm text-black dark:text-black dark:text-white">Data Science & AI/ML Faculty</p>
              </div>
            </div>
            
            <p className="text-sm text-black dark:text-black dark:text-white text-center">
              ┬® {new Date().getFullYear()} Farhan Siddiqui. All rights reserved.
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
                  className="w-10 h-10 bg-white dark:bg-black hover:bg-gradient-to-br hover:from-sky-500 hover:to-indigo-500 rounded-xl flex items-center justify-center transition-all duration-300 group border  hover:"
                >
                  <item.icon className="w-5 h-5 text-black dark:text-black dark:text-white group-hover:text-black dark:text-white transition-colors" />
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
