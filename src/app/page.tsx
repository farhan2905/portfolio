'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Brain, 
  Code2, 
  Database, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Camera,
  MessageSquare,
  Zap,
  ArrowRight,
  ExternalLink,
  Server,
  Globe,
  Layout,
  Smartphone,
  FileText,
  BarChart3,
  Users,
  Target,
  Award,
  CheckCircle2,
  Menu,
  X,
  Play,
  Pause,
  Layers,
  Cpu,
  Network,
  Rocket,
  Star
} from 'lucide-react'
import { useTheme } from 'next-themes'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export default function Home() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 500])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

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
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
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

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 text-foreground overflow-x-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Mouse-following gradient */}
        <motion.div
          className="fixed w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)`,
            left: mousePosition.x + '%',
            top: mousePosition.y + '%',
            x: '-50%',
            y: '-50%',
          }}
        />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl px-2 py-2 shadow-2xl shadow-purple-500/10">
          <div className="hidden md:flex items-center gap-1">
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
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-purple-100 dark:bg-purple-900/30 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg shadow-purple-500/25"
            >
              Contact
            </Button>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {['about', 'ai-projects', 'products', 'dev-projects', 'skills'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                      activeSection === item
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                  </button>
                ))}
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Contact
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-24 pb-16">
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ opacity, scale }}
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 rounded-full px-6 py-2.5">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    </motion.div>
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Data Science & AI/ML Faculty
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
                <span className="block mb-2">Dr. Faculty</span>
                <span className="relative">
                  Name
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 2 150 2 298 10"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-6"
            >
              Transforming Ideas into{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                  Intelligent Solutions
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-3 bg-purple-500/20 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                />
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Expert in Data Science, Machine Learning, and AI Development with years of academic teaching experience and extensive practical industry applications
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-16"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('ai-projects')}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="rounded-2xl px-8 py-6 text-lg font-semibold border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                Get In Touch
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
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
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 rounded-2xl p-6 text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full blur-lg opacity-50" />
            <div className="relative w-8 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">About Me</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                Bridging Academia
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  & Industry
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Passionate about teaching data science and building innovative AI solutions that make a real impact
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <motion.div variants={fadeInUp} className="space-y-6">
                {/* Academic Excellence */}
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-xl shadow-purple-500/25"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold mb-2">Academic Excellence</CardTitle>
                    <CardDescription className="text-base">
                      Years of transformative teaching experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
                            className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mt-0.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Research & Innovation */}
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 hover:from-pink-500/10 hover:to-rose-500/10 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-xl shadow-pink-500/25"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Brain className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold mb-2">Research & Innovation</CardTitle>
                    <CardDescription className="text-base">
                      Pushing the boundaries of AI technology
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      My research interests span across Natural Language Processing, Computer Vision, and Deep Learning architectures. I actively contribute to open-source projects and stay updated with the latest advancements in AI technology.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Column */}
              <motion.div variants={fadeInUp} className="space-y-6">
                {/* Industry Experience */}
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 hover:from-blue-500/10 hover:to-cyan-500/10 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4 shadow-xl shadow-blue-500/25"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Zap className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold mb-2">Industry Experience</CardTitle>
                    <CardDescription className="text-base">
                      Building production-ready AI solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
                            className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mt-0.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Mission */}
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 hover:from-violet-500/10 hover:to-purple-500/10 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <CardHeader className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-xl shadow-violet-500/25"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold mb-2">My Mission</CardTitle>
                    <CardDescription className="text-base">
                      Empowering the next generation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
      <section id="ai-projects" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-800 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">AI & Machine Learning</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                Intelligent
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Cutting-edge AI projects demonstrating expertise across various domains
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project Cards */}
              {[
                {
                  icon: MessageSquare,
                  title: 'Natural Language Processing',
                  desc: 'Advanced text analysis & understanding',
                  gradient: 'from-purple-500 to-pink-500',
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
                  gradient: 'from-blue-500 to-cyan-500',
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
                  gradient: 'from-orange-500 to-red-500',
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
                  gradient: 'from-green-500 to-teal-500',
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
                  gradient: 'from-violet-500 to-purple-500',
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
                  gradient: 'from-pink-500 to-rose-500',
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
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-500">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient}/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl mb-4 shadow-xl`}
                        style={{ boxShadow: `0 10px 40px -10px ${project.gradient.split('-')[1]}500` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <project.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {project.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-300/50 dark:hover:bg-slate-600/50 transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {project.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
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
      <section id="products" className="py-32 relative bg-gradient-to-b from-transparent via-purple-50/50 to-transparent dark:via-purple-950/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-200 dark:border-pink-800 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">Products & Services</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                Innovative
                <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  AI Products
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Production-ready solutions solving real-world problems
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  name: 'Monetrix',
                  desc: 'AI-Powered CCTV Analytics',
                  gradient: 'from-purple-600 to-pink-600',
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
                  gradient: 'from-blue-600 to-cyan-600',
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
                  gradient: 'from-green-600 to-teal-600',
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
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${product.gradient}/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
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
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                            {product.status}
                          </Badge>
                          <Badge variant="outline" className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </Badge>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                          {product.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                              <Layers className="w-5 h-5 text-purple-500" />
                              Key Features
                            </h4>
                            <ul className="space-y-2">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <span className="w-1.5 h-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                              <Target className="w-5 h-5 text-pink-500" />
                              Use Cases
                            </h4>
                            <ul className="space-y-2">
                              {product.useCases.map((useCase, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <span className="w-1.5 h-1.5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mt-2 flex-shrink-0" />
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-300/50 dark:hover:bg-slate-600/50 transition-colors">
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
      <section id="dev-projects" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-800 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Development Projects</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                Full-Stack
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Comprehensive web applications and enterprise systems
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Project Cards */}
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
                  <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-500">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient}/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl shadow-xl`}
                          style={{ boxShadow: `0 10px 40px -10px ${project.gradient.split('-')[1]}500` }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <project.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        {project.badge && (
                          <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 shadow-lg">
                            {project.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {project.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          Core Features
                        </h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <span className="w-1.5 h-1.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-300/50 dark:hover:bg-slate-600/50 transition-colors">
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
      <section id="skills" className="py-32 relative bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-950/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-200 dark:border-violet-800 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">Expertise</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                Skills &
                <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Technologies
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Proficient across the full spectrum of AI and development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Machine Learning',
                  gradient: 'from-purple-500 to-pink-500',
                  skills: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'Time Series Analysis']
                },
                {
                  icon: Code2,
                  title: 'Programming',
                  gradient: 'from-blue-500 to-cyan-500',
                  skills: ['Python', 'JavaScript/TypeScript', 'SQL', 'R', 'Java']
                },
                {
                  icon: Database,
                  title: 'Data & Cloud',
                  gradient: 'from-green-500 to-teal-500',
                  skills: ['PostgreSQL', 'MongoDB', 'AWS', 'Google Cloud', 'Big Data Processing']
                },
                {
                  icon: Cpu,
                  title: 'Frameworks & Tools',
                  gradient: 'from-orange-500 to-red-500',
                  skills: ['TensorFlow / PyTorch', 'React / Next.js', 'Django / FastAPI', 'Docker / Kubernetes', 'Git / CI/CD']
                }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-500">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${skill.gradient}/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                    
                    <CardHeader className="relative">
                      <motion.div
                        className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${skill.gradient} rounded-2xl shadow-xl`}
                        style={{ boxShadow: `0 10px 40px -10px ${skill.gradient.split('-')[1]}500` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <skill.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-bold mt-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {skill.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="relative">
                      <ul className="space-y-2">
                        {skill.skills.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
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

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-200 dark:border-rose-800 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">Get In Touch</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                Let's Work
                <span className="block bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Open to collaborations, consulting, and teaching opportunities
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div variants={fadeInUp}>
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2">Send a Message</CardTitle>
                    <CardDescription className="text-base">
                      I'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6">
                    <div>
                      <label className="text-sm font-semibold mb-3 block">Name</label>
                      <Input placeholder="Your name" className="h-12 rounded-xl border-2 focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block">Email</label>
                      <Input type="email" placeholder="your@email.com" className="h-12 rounded-xl border-2 focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block">Subject</label>
                      <Input placeholder="What's this about?" className="h-12 rounded-xl border-2 focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block">Message</label>
                      <Textarea placeholder="Your message..." rows={5} className="rounded-xl border-2 focus:border-purple-500 transition-colors resize-none" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl h-12 text-base font-semibold shadow-xl shadow-purple-500/25">
                      Send Message
                      <Mail className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2">Contact Information</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-4">
                    {[
                      { icon: Mail, label: 'faculty@email.com' },
                      { icon: Github, label: 'github.com/faculty' },
                      { icon: Linkedin, label: 'linkedin.com/in/faculty' },
                      { icon: Twitter, label: '@faculty_ai' }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold mb-2">Available For</CardTitle>
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
                        <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
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

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-purple-50/50 dark:from-slate-950 dark:to-purple-950/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/25"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="font-bold text-lg">Farhan Siddiqui</span>
                <p className="text-sm text-slate-600 dark:text-slate-400">Data Science & AI/ML Faculty</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
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
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
