import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "./components/ParticleBackground";
import MoonAndStars from "./components/MoonAndStars";
import GreetingText from "./components/GreetingText";
import Lanterns from "./components/Lanterns";
import NameInput from "./components/NameInput";
import ShareDownload from "./components/ShareDownload";

function getInitialName(): string {
  try {
    return new URLSearchParams(window.location.search).get("nama") ?? "";
  } catch {
    return "";
  }
}

export default function App() {
  const [name, setName] = useState<string>(getInitialName);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null!);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });

  const moonY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.4]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#041a1a] overflow-hidden">
      <audio
        ref={audioRef}
        src="/audio/eid-background-music.mp3"
        loop
      />

      {/* Audio Toggle Button */}
      <button
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-[#073333]/80 border border-gold-500/30 text-gold-400 backdrop-blur-sm transition-all hover:bg-[#073333] hover:scale-110"
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <ParticleBackground />

      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(13,102,102,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(7,51,51,0.6) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div
        ref={scrollRef}
        className="absolute inset-0 z-10 overflow-y-scroll snap-container"
        style={{
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Section 1: Hero */}
        <section
          className="relative w-full h-[100dvh] flex flex-col items-center justify-center gap-8 px-6"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >

          <motion.div style={{ y: moonY }} className="flex justify-center w-full">
            <MoonAndStars />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-center space-y-2"
          >
            <p className="font-body text-xs tracking-[0.5em] pl-[0.5em] uppercase text-gold-400 opacity-60">
              1 Syawal 1447 H
            </p>
            <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
          </motion.div>

          {name && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="font-display italic text-gold-300/70 text-base tracking-widest"
            >
              Untuk {name} ✦
            </motion.p>
          )}

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gold-400/60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
            <div className="w-px h-12 bg-gradient-to-b from-gold-400/60 to-transparent" />
          </motion.div>
        </section>

        {/* Section 2: Greeting */}
        <section
          className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-6 gap-10"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, root: scrollRef }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 w-full max-w-md"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500 opacity-40" />
            <span className="text-gold-400 text-xl">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500 opacity-40" />
          </motion.div>

          <GreetingText name={name} scrollRef={scrollRef} />

          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, root: scrollRef }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-4 w-full max-w-md"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500 opacity-40" />
            <span className="text-gold-400 text-xl">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500 opacity-40" />
          </motion.div>
        </section>

        {/* Section 3: Lanterns */}
        <section
          className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-6 gap-10"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, root: scrollRef }}
            transition={{ duration: 0.9 }}
            className="font-arabic text-3xl md:text-4xl text-gold-300 text-shadow-gold text-center"
            style={{ direction: "rtl" }}
          >
            كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, root: scrollRef }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-display italic text-cream/60 text-lg md:text-xl text-center"
          >
            Semoga setiap tahun kalian selalu dalam kebaikan
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, root: scrollRef }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full max-w-lg"
          >
            <Lanterns />
          </motion.div>
        </section>

        {/* Section 4: Personalise + Share */}
        <section
          className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-6 gap-10"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, root: scrollRef }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-2"
          >
            <span className="text-gold-400 text-4xl leading-none">☽</span>
            <p className="font-display italic text-cream/40 text-sm tracking-[0.3em]">
              Buat kartu ini milikmu
            </p>
          </motion.div>

          <NameInput name={name} onChange={setName} scrollRef={scrollRef} />

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

          <ShareDownload name={name} />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, root: scrollRef }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-body text-[11px] text-cream/20 tracking-[0.4em] text-center"
          >
            ✦ Taqabbalallahu minna wa minkum ✦
          </motion.p>
        </section>
      </div>
    </div>
  );
}
