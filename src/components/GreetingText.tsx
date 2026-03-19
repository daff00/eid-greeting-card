import { useState, useEffect, type RefObject } from 'react'
import { motion } from 'framer-motion'

const lines = [
  { text: 'عِيدٌ مُبَارَكٌ', lang: 'arabic', size: 'text-5xl md:text-7xl' },
  { text: 'Selamat Hari Raya Idul Fitri', lang: 'id', size: 'text-2xl md:text-4xl' },
  { text: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ', lang: 'arabic', size: 'text-xl md:text-3xl' },
  { text: 'Minal Aidin wal Faizin\nMohon Maaf Lahir dan Batin', lang: 'id', size: 'text-lg md:text-2xl' },
  // { text: 'Mohon Maaf Lahir dan Batin', lang: 'id', size: 'text-lg md:text-2xl' }
]

function TypewriterLine({ text, delay, trigger }: { text: string; delay: number; trigger: boolean }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!trigger) return
    let i = 0
    setDisplayed('')
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 50)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay, trigger])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && trigger && (
        <span className="inline-block w-0.5 h-[0.9em] bg-gold-400 ml-1 animate-pulse align-middle opacity-80" />
      )}
    </span>
  )
}

interface Props {
  name: string
  scrollRef: RefObject<HTMLDivElement>
}

export default function GreetingText({ name, scrollRef }: Props) {
  const [inView, setInView] = useState(false)

  return (
    <motion.div
      className="text-center space-y-5 px-4"
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, root: scrollRef, amount: 0.4 }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`
            ${line.size} font-light tracking-wide leading-tight whitespace-pre-line
            ${line.lang === 'arabic'
              ? 'font-arabic text-gold-400 text-shadow-gold'
              : 'font-display italic text-cream'}
          `}
          style={{ direction: line.lang === 'arabic' ? 'rtl' : 'ltr' }}
        >
          <TypewriterLine text={line.text} delay={i * 700 + 200} trigger={inView} />
        </motion.div>
      ))}

      {name && (
        <motion.div
          key={name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pt-3 text-gold-300 font-body text-sm tracking-[0.35em] uppercase"
        >
          — untuk {name} —
        </motion.div>
      )}
    </motion.div>
  )
}
