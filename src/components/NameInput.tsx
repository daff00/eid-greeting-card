import type { RefObject } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  name: string;
  onChange: (v: string) => void;
  scrollRef: RefObject<HTMLDivElement>;
}

export default function NameInput({ name, onChange, scrollRef }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, root: scrollRef, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-5"
    >
      <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-400/70">
        Personalisasi Kartu
      </p>

      <div className="relative group">
        <div className="absolute inset-0 rounded-full bg-gold-400/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <input
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Masukkan nama kamu..."
          maxLength={40}
          className="
      relative w-72 md:w-96 px-6 py-3.5 rounded-full
      bg-teal-800/40 backdrop-blur-sm
      border border-gold-500/25 focus:border-gold-400/60
      text-cream placeholder-cream/25
      font-body text-center tracking-wider text-sm
      outline-none transition-all duration-400
      focus:shadow-[0_0_28px_rgba(251,191,36,0.15),inset_0_1px_0_rgba(251,191,36,0.1)]
    "
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          <motion.div
            animate={{
              rotate: name ? 360 : 0,
              scale: name ? 1.1 : 1,
              opacity: name ? 1 : 0.4,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-gold-400/50"
          >
            <Sparkles size={15} />
          </motion.div>
        </div>
      </div>

      {name && (
        <motion.p
          key={name}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-gold-300/80 text-base"
        >
          ✦ &nbsp;Kartu ini untuk {name}&nbsp; ✦
        </motion.p>
      )}
    </motion.div>
  );
}
