'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
  Brain,
  Code2,
  Bot,
  Database,
  Workflow,
  Users,
  Sparkles,
  Github,
  Cpu,
  Layers,
  BookOpen,
  Zap,
  Rocket,
} from 'lucide-react'

type NodeCategory = 'works' | 'knowledge' | 'skills' | 'type'

interface NodeDetails {
  title: string
  subtitle?: string
  content: string
  tags?: string[]
  links?: { label: string; url: string }[]
}

interface NetworkNode {
  id: string
  label: string
  category: NodeCategory
  radius: number
  icon: ReactNode
  description: string
  details: NodeDetails
  x?: number
  y?: number
}

interface AnimatedNode extends NetworkNode {
  x: number
  y: number
  vx: number
  vy: number
  driftPhaseX: number
  driftPhaseY: number
}

interface Connection {
  from: string
  to: string
}

const CATEGORY_CONFIG = {
  works: {
    color: '#3b82f6',
    textColor: 'text-blue-300',
    label: 'Works',
  },
  knowledge: {
    color: '#10b981',
    textColor: 'text-emerald-300',
    label: 'Knowledge',
  },
  skills: {
    color: '#8b5cf6',
    textColor: 'text-violet-300',
    label: 'Skills',
  },
  type: {
    color: '#f59e0b',
    textColor: 'text-amber-300',
    label: 'Type',
  },
} as const

const BASE_NODES: NetworkNode[] = [
  {
    id: 'multi-agent',
    label: 'Multi-Agent AI',
    category: 'works',
    radius: 34,
    icon: <Cpu className="w-4 h-4" />,
    description: 'AI orchestration platform',
    details: {
      title: 'Multi-Agent AI Platform',
      subtitle: 'Featured Project',
      content: 'A multi-agent architecture where specialized agents collaborate for planning, tool usage, and robust execution.',
      tags: ['LangChain', 'OpenAI', 'Next.js', 'PostgreSQL'],
      links: [{ label: 'View Demo', url: '#' }],
    },
  },
  {
    id: 'rag-system',
    label: 'RAG System',
    category: 'works',
    radius: 29,
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Document intelligence',
    details: {
      title: 'Intelligent Document Q&A',
      subtitle: 'RAG Implementation',
      content: 'Semantic retrieval + generation workflow for context-rich Q&A over large document collections.',
      tags: ['RAG', 'Vector DB', 'React'],
    },
  },
  {
    id: 'code-assistant',
    label: 'Code Assistant',
    category: 'works',
    radius: 28,
    icon: <Code2 className="w-4 h-4" />,
    description: 'Developer tooling',
    details: {
      title: 'AI Code Assistant',
      subtitle: 'Developer Experience',
      content: 'Context-aware coding assistant for completion, explanation, and refactoring guidance.',
      tags: ['TypeScript', 'LLM APIs', 'VS Code'],
    },
  },
  {
    id: 'analytics',
    label: 'Analytics',
    category: 'works',
    radius: 27,
    icon: <Layers className="w-4 h-4" />,
    description: 'Real-time insights',
    details: {
      title: 'Analytics Dashboard',
      subtitle: 'Visualization',
      content: 'High-signal dashboards combining live metrics and predictive layers for business decisions.',
      tags: ['Python', 'FastAPI', 'React'],
    },
  },
  {
    id: 'neural',
    label: 'Neural Networks',
    category: 'knowledge',
    radius: 33,
    icon: <Brain className="w-4 h-4" />,
    description: 'Deep learning systems',
    details: {
      title: 'Neural Network Expertise',
      subtitle: '50+ Models Built',
      content: 'Deep expertise in building and deploying neural networks including CNNs, RNNs, and Transformers.',
      tags: ['PyTorch', 'TensorFlow', 'Transformers', 'CNN', 'RNN'],
    },
  },
  {
    id: 'llms',
    label: 'LLMs',
    category: 'knowledge',
    radius: 30,
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Large language models',
    details: {
      title: 'Large Language Models',
      subtitle: 'Fine-tuning & Deployment',
      content: 'Building practical LLM pipelines for generation, retrieval, and enterprise-level use cases.',
      tags: ['Prompting', 'Fine-tuning', 'Inference'],
    },
  },
  {
    id: 'agents',
    label: 'Agent Systems',
    category: 'knowledge',
    radius: 30,
    icon: <Bot className="w-4 h-4" />,
    description: 'Autonomous workflows',
    details: {
      title: 'Agentic Systems Design',
      subtitle: 'Reasoning & Tool Use',
      content: 'Designing planning-capable, tool-augmented agents that can execute multi-step goals reliably.',
      tags: ['Planning', 'Memory', 'Tools'],
    },
  },
  {
    id: 'web-dev',
    label: 'Web Development',
    category: 'skills',
    radius: 33,
    icon: <Code2 className="w-4 h-4" />,
    description: 'Modern full-stack',
    details: {
      title: 'Full-Stack Development',
      subtitle: 'Modern Product Delivery',
      content: 'Building responsive, scalable products with fast iteration loops and clean UX architecture.',
      tags: ['Next.js', 'React', 'TypeScript'],
    },
  },
  {
    id: 'data-eng',
    label: 'Data Engineering',
    category: 'skills',
    radius: 29,
    icon: <Database className="w-4 h-4" />,
    description: 'Pipelines & ETL',
    details: {
      title: 'Data Engineering',
      subtitle: 'Pipeline Architecture',
      content: 'Designing ETL and streaming pipelines for reliable, traceable, production data systems.',
      tags: ['SQL', 'ETL', 'Airflow'],
    },
  },
  {
    id: 'system-design',
    label: 'System Design',
    category: 'skills',
    radius: 29,
    icon: <Workflow className="w-4 h-4" />,
    description: 'Scalable architecture',
    details: {
      title: 'System Design',
      subtitle: 'Scale & Reliability',
      content: 'Architecting robust distributed systems with practical trade-offs and measurable reliability.',
      tags: ['Cloud', 'Microservices', 'DevOps'],
    },
  },
  {
    id: 'mentor',
    label: 'AI Mentor',
    category: 'type',
    radius: 34,
    icon: <Users className="w-4 h-4" />,
    description: 'Mentorship and teaching',
    details: {
      title: 'AI/ML Mentorship',
      subtitle: '1000+ Students',
      content: 'Mentorship across AI/ML tracks with strong focus on fundamentals, projects, and career acceleration.',
      tags: ['Teaching', 'Curriculum', 'Coaching'],
    },
  },
  {
    id: 'consultant',
    label: 'Consultant',
    category: 'type',
    radius: 28,
    icon: <Zap className="w-4 h-4" />,
    description: 'AI strategy advisory',
    details: {
      title: 'AI Strategy Consultant',
      subtitle: 'Advisory Services',
      content: 'Helping teams adopt AI safely and efficiently with architecture, roadmap, and execution plans.',
      tags: ['Strategy', 'Architecture'],
    },
  },
  {
    id: 'developer',
    label: 'Developer',
    category: 'type',
    radius: 28,
    icon: <Rocket className="w-4 h-4" />,
    description: 'Production builder',
    details: {
      title: 'Full-Stack Builder',
      subtitle: 'From Idea to Delivery',
      content: 'Shipping production-grade applications with strong engineering quality and product velocity.',
      tags: ['Build', 'Deploy', 'Iterate'],
    },
  },
]

const CONNECTIONS: Connection[] = [
  { from: 'multi-agent', to: 'agents' },
  { from: 'multi-agent', to: 'llms' },
  { from: 'rag-system', to: 'llms' },
  { from: 'rag-system', to: 'neural' },
  { from: 'code-assistant', to: 'llms' },
  { from: 'analytics', to: 'data-eng' },
  { from: 'analytics', to: 'web-dev' },
  { from: 'neural', to: 'mentor' },
  { from: 'llms', to: 'mentor' },
  { from: 'agents', to: 'consultant' },
  { from: 'web-dev', to: 'developer' },
  { from: 'system-design', to: 'consultant' },
  { from: 'data-eng', to: 'developer' },
  { from: 'mentor', to: 'consultant' },
  { from: 'agents', to: 'neural' },
]

function getNodeLayout(width: number, height: number): AnimatedNode[] {
  const isMobile = width < 768;
  const centerX = width * (isMobile ? 0.5 : 0.47)
  const centerY = height * (isMobile ? 0.5 : 0.54)
  const orbit = Math.min(width, height) * (isMobile ? 0.38 : 0.34)

  const categoryAngles: Record<NodeCategory, number> = {
    works: -Math.PI / 4,
    knowledge: Math.PI / 4,
    skills: (3 * Math.PI) / 4,
    type: (-3 * Math.PI) / 4,
  }

  const perCategory: Record<NodeCategory, NetworkNode[]> = {
    works: BASE_NODES.filter((node) => node.category === 'works'),
    knowledge: BASE_NODES.filter((node) => node.category === 'knowledge'),
    skills: BASE_NODES.filter((node) => node.category === 'skills'),
    type: BASE_NODES.filter((node) => node.category === 'type'),
  }

  return BASE_NODES.map((node) => {
    const group = perCategory[node.category]
    const idx = group.findIndex((n) => n.id === node.id)
    const spread = (idx - (group.length - 1) / 2) * 0.38
    const angle = categoryAngles[node.category] + spread
    const radius = orbit * (0.78 + (idx % 3) * 0.06)

    return {
      ...node,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      driftPhaseX: Math.random() * Math.PI * 2,
      driftPhaseY: Math.random() * Math.PI * 2,
    }
  })
}

export default function InteractiveNeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const uiFrameCounterRef = useRef(0)
  const nodesRef = useRef<AnimatedNode[]>([])
  const hoveredNodeRef = useRef<AnimatedNode | null>(null)
  const selectedNodeRef = useRef<AnimatedNode | null>(null)

  const [nodes, setNodes] = useState<AnimatedNode[]>([])
  const [selectedNode, setSelectedNode] = useState<AnimatedNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<AnimatedNode | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const recalculateLayout = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const laidOutNodes = getNodeLayout(rect.width, rect.height)
    setDimensions({ width: rect.width, height: rect.height })
    nodesRef.current = laidOutNodes
    setNodes(laidOutNodes)
  }, [])

  useEffect(() => {
    recalculateLayout()
    window.addEventListener('resize', recalculateLayout)
    return () => window.removeEventListener('resize', recalculateLayout)
  }, [recalculateLayout])

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode
  }, [hoveredNode])

  useEffect(() => {
    selectedNodeRef.current = selectedNode
  }, [selectedNode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let tick = 0

    const minPadding = 18
    const maxSpeed = 0.68
    const separationBuffer = 14
    const easing = 0.992

    const draw = () => {
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      context.clearRect(0, 0, canvas.width, canvas.height)

      const panelInset = selectedNodeRef.current ? 340 : 0
      const maxX = Math.max(140, canvas.width - panelInset)

      const updatedNodes = nodesRef.current.map((node) => ({ ...node }))

      for (let i = 0; i < updatedNodes.length; i++) {
        for (let j = i + 1; j < updatedNodes.length; j++) {
          const first = updatedNodes[i]
          const second = updatedNodes[j]

          const dx = second.x - first.x
          const dy = second.y - first.y
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001
          const minDistance = first.radius + second.radius + separationBuffer

          if (distance < minDistance) {
            const overlap = minDistance - distance
            const pushX = (dx / distance) * overlap * 0.06
            const pushY = (dy / distance) * overlap * 0.06

            first.vx -= pushX
            first.vy -= pushY
            second.vx += pushX
            second.vy += pushY
          }
        }
      }

      for (const node of updatedNodes) {
        node.vx += Math.sin(tick * 0.012 + node.driftPhaseX) * 0.006
        node.vy += Math.cos(tick * 0.011 + node.driftPhaseY) * 0.006
        node.vx += (Math.random() - 0.5) * 0.003
        node.vy += (Math.random() - 0.5) * 0.003

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed
          node.vy = (node.vy / speed) * maxSpeed
        }

        node.x += node.vx
        node.y += node.vy

        const leftBound = node.radius + minPadding
        const rightBound = maxX - node.radius - minPadding
        const topBound = node.radius + minPadding
        const bottomBound = canvas.height - node.radius - minPadding

        if (node.x < leftBound) {
          node.x = leftBound
          node.vx = Math.abs(node.vx)
        }
        if (node.x > rightBound) {
          node.x = rightBound
          node.vx = -Math.abs(node.vx)
        }
        if (node.y < topBound) {
          node.y = topBound
          node.vy = Math.abs(node.vy)
        }
        if (node.y > bottomBound) {
          node.y = bottomBound
          node.vy = -Math.abs(node.vy)
        }

        node.vx *= easing
        node.vy *= easing
      }

      nodesRef.current = updatedNodes
      uiFrameCounterRef.current += 1
      if (uiFrameCounterRef.current % 2 === 0) {
        setNodes(updatedNodes)
      }

      const nodeMap = Object.fromEntries(updatedNodes.map((node) => [node.id, node])) as Record<string, AnimatedNode>

      context.fillStyle = 'rgba(148, 163, 184, 0.08)'
      for (let x = 0; x < canvas.width; x += 44) {
        for (let y = 0; y < canvas.height; y += 44) {
          context.beginPath()
          context.arc(x, y, 0.8, 0, Math.PI * 2)
          context.fill()
        }
      }

      CONNECTIONS.forEach((connection) => {
        const from = nodeMap[connection.from]
        const to = nodeMap[connection.to]
        if (!from || !to) return

        const highlighted =
          hoveredNodeRef.current?.id === from.id ||
          hoveredNodeRef.current?.id === to.id ||
          selectedNodeRef.current?.id === from.id ||
          selectedNodeRef.current?.id === to.id

        const fromX = from.x ?? 0
        const fromY = from.y ?? 0
        const toX = to.x ?? 0
        const toY = to.y ?? 0
        const dx = toX - fromX
        const dy = toY - fromY
        const distance = Math.sqrt(dx * dx + dy * dy) || 1
        const normalX = -dy / distance
        const normalY = dx / distance
        const stretch = Math.min(24, Math.max(6, distance * 0.06))
        const wave = Math.sin(tick * 0.04 + distance * 0.02) * 3
        const controlX = (fromX + toX) / 2 + normalX * (stretch + wave)
        const controlY = (fromY + toY) / 2 + normalY * (stretch + wave)

        context.beginPath()
        context.moveTo(fromX, fromY)
        context.quadraticCurveTo(controlX, controlY, toX, toY)

        if (highlighted) {
          context.strokeStyle = 'rgba(59, 130, 246, 0.9)'
          context.lineWidth = 2
          context.shadowColor = 'rgba(59, 130, 246, 0.8)'
          context.shadowBlur = 12
        } else {
          const pulse = 0.12 + Math.sin(tick * 0.02) * 0.03
          context.strokeStyle = `rgba(148, 163, 184, ${pulse})`
          context.lineWidth = 1
          context.shadowBlur = 0
        }

        context.stroke()
        context.shadowBlur = 0
      })

      tick += 1
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions])

  // const getPointFromMouseEvent = (event: React.MouseEvent<HTMLCanvasElement>) => {
  //   const canvas = canvasRef.current
  //   if (!canvas) return null
  //   const rect = canvas.getBoundingClientRect()
  //   return {
  //     x: event.clientX - rect.left,
  //     y: event.clientY - rect.top,
  //   }
  // }

  const findHoveredNode = (x: number, y: number) => {
    return nodesRef.current.find((node) => {
      const dx = (node.x ?? 0) - x
      const dy = (node.y ?? 0) - y
      return Math.sqrt(dx * dx + dy * dy) <= node.radius + 6
    })
  }

  const handleCanvasMove = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Determine coordinates based on event type
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const point = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }

    const hovered = findHoveredNode(point.x, point.y)
    setHoveredNode((previous) => (previous?.id === hovered?.id ? previous : (hovered ?? null)))
    if (!('touches' in event)) {
      canvas.style.cursor = hovered ? 'pointer' : 'default'
    }
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    let clientX, clientY;
    if ('changedTouches' in event) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const point = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }

    const clicked = findHoveredNode(point.x, point.y)
    setSelectedNode((previous) => (previous?.id === clicked?.id ? previous : (clicked ?? null)))
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseMove={handleCanvasMove}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasMove}
        onTouchMove={handleCanvasMove}
        onTouchEnd={handleCanvasClick}
      />

      {nodes.map((node) => {
        const config = CATEGORY_CONFIG[node.category]
        const selected = selectedNode?.id === node.id
        const hovered = hoveredNode?.id === node.id

        return (
          <motion.button
            key={node.id}
            className="absolute rounded-full flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: (node.x ?? 0) - node.radius,
              top: (node.y ?? 0) - node.radius,
              width: node.radius * 2,
              height: node.radius * 2,
              background: `radial-gradient(circle at 30% 30%, ${config.color}40, ${config.color}15)`,
              border: `2px solid ${selected || hovered ? config.color : config.color + '60'}`,
              boxShadow: selected || hovered ? `0 0 20px ${config.color}70` : `0 0 10px ${config.color}30`,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: selected ? 1.14 : hovered ? 1.08 : 1 }}
            whileHover={{ scale: 1.12 }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => setSelectedNode(node)}
          >
            <span style={{ color: config.color }} className="mb-0.5">{node.icon}</span>
            <span className="text-[8px] sm:text-[9px] font-medium text-slate-100 leading-tight px-1 text-center">
              {node.label}
            </span>
          </motion.button>
        )
      })}

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="absolute right-3 top-3 bottom-3 w-[320px] max-w-[42vw] bg-slate-900/95 border border-slate-700/70 rounded-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            <div className="px-4 py-3 border-b border-slate-700/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${CATEGORY_CONFIG[selectedNode.category].color}33` }}
                >
                  <span style={{ color: CATEGORY_CONFIG[selectedNode.category].color }}>{selectedNode.icon}</span>
                </div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${CATEGORY_CONFIG[selectedNode.category].textColor}`}>
                  {CATEGORY_CONFIG[selectedNode.category].label}
                </p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <h3 className="text-xl font-bold text-slate-100 mb-1">{selectedNode.details.title}</h3>
              {selectedNode.details.subtitle && (
                <p className={`text-sm mb-4 ${CATEGORY_CONFIG[selectedNode.category].textColor}`}>
                  {selectedNode.details.subtitle}
                </p>
              )}
              <p className="text-sm leading-relaxed text-slate-300 mb-5">{selectedNode.details.content}</p>

              {selectedNode.details.tags && (
                <>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {selectedNode.details.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md text-xs bg-slate-800 border border-slate-700 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {selectedNode.details.links && (
                <div className="space-y-2">
                  {selectedNode.details.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-700/70 flex gap-2">
              <button className="flex-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-white flex items-center justify-center gap-2">
                <Github className="w-4 h-4" />
                View Code
              </button>
              <button
                className="flex-1 px-3 py-2 rounded-lg text-sm text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: CATEGORY_CONFIG[selectedNode.category].color }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
