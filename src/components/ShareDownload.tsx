import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Check, Loader2, Link } from 'lucide-react'
import html2canvas from 'html2canvas'

interface Props {
  name: string
}

export default function ShareDownload({ name }: Props) {
  const [downloading, setDownloading] = useState(false)
  const [shareState, setShareState] = useState<'idle' | 'sharing' | 'done'>('idle')

  const buildCanvas = async (): Promise<HTMLCanvasElement> => {
    const card = document.createElement('div')
    card.style.cssText = `
      position: fixed; left: -9999px; top: 0;
      width: 800px; height: 800px;
      background: linear-gradient(160deg, #041a1a 0%, #073333 50%, #041a1a 100%);
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 24px; font-family: serif;
      color: #fdf6e3; padding: 48px; box-sizing: border-box;
    `
    card.innerHTML = `
      <div style="border:1px solid rgba(251,191,36,0.4);position:absolute;inset:16px;border-radius:2px;"></div>
      <div style="border:1px solid rgba(251,191,36,0.15);position:absolute;inset:24px;border-radius:2px;"></div>
      <div style="font-size:72px;line-height:1;color:#fbbf24;text-shadow:0 0 30px rgba(251,191,36,0.6);margin-bottom:4px;">☽</div>
      <div style="font-size:64px;font-weight:400;color:#fbbf24;text-shadow:0 0 24px rgba(251,191,36,0.5);text-align:center;line-height:1.2;direction:rtl;">عِيدٌ مُبَارَكٌ</div>
      <div style="width:120px;height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.6),transparent);margin:4px 0;"></div>
      <div style="font-size:28px;font-style:italic;color:#fdf6e3;text-align:center;letter-spacing:0.04em;">Selamat Hari Raya Idul Fitri</div>
      <div style="font-size:28px;color:rgba(253,230,138,0.8);text-align:center;direction:rtl;">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ صِيَامَنَا وَصِيَامَكُمْ</div>
      <div style="font-size:24px;font-style:italic;color:rgba(253,246,227,0.6);letter-spacing:0.05em;text-align:center;">Minal Aidin wal Faizin<br>Mohon Maaf Lahir dan Batin</div>
      ${name ? `
        <div style="margin-top:8px;width:80px;height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.4),transparent);"></div>
        <div style="font-size:16px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(253,230,138,0.7);">— untuk ${name} —</div>
      ` : ''}
      <div style="position:absolute;bottom:28px;font-size:11px;letter-spacing:0.5em;color:rgba(253,246,227,0.2);text-transform:uppercase;margin-bottom: 0.5rem;">1 Syawal 1447 H</div>
    `
    document.body.appendChild(card)
    const canvas = await html2canvas(card, {
      backgroundColor: null, scale: 2, useCORS: true, allowTaint: true, width: 800, height: 800,
    })
    document.body.removeChild(card)
    return canvas
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const canvas = await buildCanvas()
      const link = document.createElement('a')
      link.download = name
        ? `eid-card-${name.replace(/\s+/g, '-').toLowerCase()}.png`
        : 'eid-al-fitr-card.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    setShareState('sharing')
    try {
      // Build a personalized URL — encode the name as a query param
      const url = new URL(window.location.href)
      url.search = '' // clear any existing params
      if (name) url.searchParams.set('nama', name)
      const personalizedUrl = url.toString()

      const greeting = name
        ? `عِيدٌ مُبَارَكٌ، ${name}! 🌙\nSelamat Hari Raya Idul Fitri!\nMinal Aidin wal Faizin ✨\n\n${personalizedUrl}`
        : `عِيدٌ مُبَارَكٌ 🌙\nSelamat Hari Raya Idul Fitri!\nMinal Aidin wal Faizin ✨\n\n${personalizedUrl}`

      if (navigator.share) {
        // On mobile: try to share card image + personalized URL
        const canvas = await buildCanvas()
        await new Promise<void>((resolve) => {
          canvas.toBlob(async (blob) => {
            if (!blob) { resolve(); return }
            const file = new File([blob], 'eid-card.png', { type: 'image/png' })
            try {
              if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ title: 'Selamat Eid Al-Fitr', text: greeting, files: [file] })
              } else {
                await navigator.share({ title: 'Selamat Eid Al-Fitr', text: greeting, url: personalizedUrl })
              }
            } catch { /* user cancelled */ }
            resolve()
          }, 'image/png')
        })
      } else {
        // Desktop fallback: copy personalized URL to clipboard
        await navigator.clipboard.writeText(personalizedUrl)
      }
      setShareState('done')
      setTimeout(() => setShareState('idle'), 2800)
    } catch {
      setShareState('idle')
    }
  }

  const btnBase =
    'flex items-center gap-2.5 px-7 py-3.5 rounded-full font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer border backdrop-blur-sm select-none disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-5"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`${btnBase} bg-gold-500/15 border-gold-400/40 text-gold-300 hover:bg-gold-500/25 hover:border-gold-400/70 hover:shadow-[0_0_24px_rgba(251,191,36,0.25)] active:scale-95`}
        >
          {downloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
          {downloading ? 'Menyimpan...' : 'Unduh Kartu'}
        </button>

        <button
          onClick={handleShare}
          disabled={shareState === 'sharing'}
          className={`${btnBase} bg-teal-700/20 border-teal-400/30 text-teal-300 hover:bg-teal-600/30 hover:border-teal-400/60 active:scale-95`}
        >
          {shareState === 'sharing' && <Loader2 size={15} className="animate-spin" />}
          {shareState === 'done'    && <Check size={15} />}
          {shareState === 'idle'    && <Share2 size={15} />}
          {shareState === 'sharing' ? 'Memproses...' : shareState === 'done' ? 'Terkirim!' : 'Bagikan'}
        </button>
      </div>

      {/* Subtle hint about what share does */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: name ? 0.5 : 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.25em] text-gold-400/60 uppercase"
      >
        <Link size={10} />
        Link akan mengandung nama {name}
      </motion.p>
    </motion.div>
  )
}
