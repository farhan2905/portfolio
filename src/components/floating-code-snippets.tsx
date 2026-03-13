'use client'

import { motion } from 'framer-motion'

export default function FloatingCodeSnippets() {
  const codeSnippets = [
    { code: 'const ai = "powerful"', color: '#00D9FF' },
    { code: 'function innovate() {}', color: '#B620E0' },
    { code: 'model.train(data)', color: '#00FF88' },
    { code: 'await predict(input)', color: '#00D9FF' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-xs font-mono px-3 py-2 bg-slate-900/50 border rounded backdrop-blur"
          style={{
            borderColor: snippet.color + '40',
            color: snippet.color,
            left: `${15 + index * 20}%`,
            top: `${10 + index * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  )
}
