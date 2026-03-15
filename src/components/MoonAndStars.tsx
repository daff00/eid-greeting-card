import { motion } from "framer-motion";

export default function MoonAndStars() {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 mx-auto">
      {/* Outer soft halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 240,
          height: 240,
          background:
            "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mid glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 180,
          background:
            "radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      {/* Crescent moon */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-44 h-44"
        style={{ filter: "drop-shadow(0 0 30px rgba(251,191,36,0.4))" }}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <defs>
          {/* The Mask: White reveals, Black hides */}
          <mask id="moon-mask">
            <circle cx="50" cy="50" r="40" fill="white" />
            <circle cx="68" cy="40" r="36" fill="black" />
          </mask>

          {/* Gradient for a 3D spherical look */}
          <radialGradient id="moon-gradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fef3c7" /> {/* Light gold */}
            <stop offset="60%" stopColor="#fbbf24" /> {/* Warm gold */}
            <stop offset="100%" stopColor="#d97706" /> {/* Deep amber shadow */}
          </radialGradient>
        </defs>

        {/* Main Moon Body with Mask Applied */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="url(#moon-gradient)"
          mask="url(#moon-mask)"
        />

        {/* Softened Craters - Moved inside the masked area */}
        <g mask="url(#moon-mask)" opacity="0.4">
          <circle cx="32" cy="56" r="4" fill="#b45309" opacity="0.2" />
          <circle cx="22" cy="42" r="2" fill="#b45309" opacity="0.15" />
          <circle cx="38" cy="68" r="2.5" fill="#b45309" opacity="0.1" />
        </g>

        {/* Subtle Rim Highlight */}
        <path
          d="M 25 20 A 40 40 0 0 0 25 80"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.3"
        />
      </motion.svg>

      {/* Orbiting sparkle dots */}
      {[
        { deg: 0, r: 88, size: 3, color: "#fbbf24", dur: 14 },
        { deg: 72, r: 96, size: 2, color: "#fde68a", dur: 18 },
        { deg: 144, r: 82, size: 3.5, color: "#fbbf24", dur: 11 },
        { deg: 216, r: 100, size: 2, color: "#14a0a0", dur: 20 },
        { deg: 288, r: 90, size: 2.5, color: "#fde68a", dur: 15 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.color,
            top: "50%",
            left: "50%",
            transformOrigin: `${s.r}px 0px`,
            boxShadow: `0 0 6px ${s.color}`,
          }}
          animate={{ rotate: [s.deg, s.deg + 360] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Twinkling fixed stars around moon */}
      {[
        { x: -90, y: -30, s: 2 },
        { x: 80, y: -60, s: 1.5 },
        { x: -70, y: 60, s: 1.5 },
        { x: 90, y: 40, s: 2 },
        { x: 20, y: -95, s: 1 },
      ].map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-gold-300"
          style={{ width: star.s, height: star.s, x: star.x, y: star.y }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{
            duration: 2 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
