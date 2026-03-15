import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true } },
          color: { value: ['#fbbf24', '#fde68a', '#ffffff', '#14a0a0'] },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.1, max: 0.7 },
            animation: { enable: true, speed: 0.6, sync: false },
          },
          size: {
            value: { min: 0.5, max: 2.5 },
            animation: { enable: true, speed: 1, sync: false },
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
