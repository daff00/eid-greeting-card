import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import type { AnimationControls } from 'framer-motion'

interface LanternProps {
  color: string
  accent: string
  delay: number
  scale?: number
}

function Lantern({ color, accent, delay, scale = 1 }: LanternProps) {
  const [hovered, setHovered] = useState(false)
  const controls: AnimationControls = useAnimation()

  const handleHoverStart = async () => {
    setHovered(true)
    // Swing hard left then right with elastic overshoot, then settle into idle
    await controls.start({
      rotate: [-7, -28, 22, -14, 10, -6, 4, -7],
      transition: {
        duration: 1.6,
        ease: 'easeInOut',
        times: [0, 0.15, 0.35, 0.52, 0.65, 0.76, 0.88, 1],
      },
    })
    // Resume normal idle sway after the elastic burst
    controls.start({
      rotate: [-7, 7, -7],
      transition: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
    })
  }

  const handleHoverEnd = () => {
    setHovered(false)
  }

  return (
    <motion.div
      style={{ transformOrigin: 'top center', scale }}
      animate={controls}
      initial={{ rotate: -7 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onAnimationComplete={() => {
        // Kick off the idle sway when the component first mounts
      }}
      onViewportEnter={() => {
        controls.start({
          rotate: [-7, 7, -7],
          transition: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay },
        })
      }}
      viewport={{ once: true }}
      className="cursor-pointer"
    >
      <motion.svg
        viewBox="0 0 60 110"
        className="w-10 h-20 md:w-14 md:h-28"
        animate={{
          filter: hovered
            ? `drop-shadow(0 0 22px ${accent}ff) drop-shadow(0 0 40px ${accent}66)`
            : `drop-shadow(0 0 10px ${accent}88)`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Hanging cord */}
        <line x1="30" y1="0" x2="30" y2="14" stroke="#fbbf24" strokeWidth="1.2" opacity="0.7" />

        {/* Top crown */}
        <ellipse cx="30" cy="15" rx="13" ry="4.5" fill={accent} />
        <rect x="22" y="11" width="16" height="4" rx="1" fill={accent} opacity="0.8" />

        {/* Main body */}
        <path d="M17 15 Q8 48 12 74 Q20 84 30 84 Q40 84 48 74 Q52 48 43 15 Z" fill={color} />

        {/* Inner glow — brightens on hover */}
        <motion.ellipse
          cx="30" cy="48" rx="11" ry="18"
          animate={{ fill: hovered ? 'rgba(255,220,80,0.35)' : 'rgba(255,220,80,0.18)' }}
          transition={{ duration: 0.3 }}
        />
        <motion.ellipse
          cx="30" cy="48" rx="6" ry="11"
          animate={{ fill: hovered ? 'rgba(255,235,120,0.28)' : 'rgba(255,235,120,0.12)' }}
          transition={{ duration: 0.3 }}
        />

        {/* Ribs */}
        {[20, 32, 44, 57, 68].map((y, i) => {
          const w = i < 2 ? 12 + i * 3 : i > 3 ? 12 + (4 - i) * 3 : 18
          return (
            <path key={i}
              d={`M${30 - w} ${y} Q30 ${y + 2.5} ${30 + w} ${y}`}
              stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" fill="none"
            />
          )
        })}

        {/* Bottom cap */}
        <ellipse cx="30" cy="76" rx="11" ry="4" fill={accent} opacity="0.9" />
        <rect x="22" y="74" width="16" height="4" rx="1" fill={accent} opacity="0.7" />

        {/* Tassels — swing counter to body for natural physics feel */}
        {[-5, 0, 5].map((dx, i) => (
          <motion.line key={i}
            x1={30 + dx} y1="80"
            x2={28 + dx + (i - 1) * 2} y2={93 + i * 2}
            stroke="#fbbf24" strokeWidth="0.9" opacity="0.6"
            animate={{
              x2: hovered
                ? [28 + dx + (i - 1) * 2 + 6, 28 + dx + (i - 1) * 2 - 6]
                : [28 + dx + (i - 1) * 2 - 2, 28 + dx + (i - 1) * 2 + 2],
            }}
            transition={{
              duration: hovered ? 0.4 : 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  )
}

export default function Lanterns() {
  const data = [
    { color: '#0a4040', accent: '#0d8080', delay: 0,    scale: 0.82 },
    { color: '#7c3a0a', accent: '#d97706', delay: 0.5,  scale: 1.0  },
    { color: '#062e2e', accent: '#0d6666', delay: 1.0,  scale: 1.22 },
    { color: '#6b3209', accent: '#b45309', delay: 0.25, scale: 0.9  },
    { color: '#083838', accent: '#14a0a0', delay: 0.75, scale: 1.05 },
  ]

  return (
    <div className="relative flex items-start justify-center gap-5 md:gap-8 pt-2">
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.5) 20%, rgba(251,191,36,0.5) 80%, transparent)' }}
      />
      {data.map((l, i) => <Lantern key={i} {...l} />)}
    </div>
  )
}
