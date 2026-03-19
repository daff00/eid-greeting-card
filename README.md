# 🌙 Eid Al-Fitr Greeting Card

An elegant, animated single-page greeting card website for Eid al-Fitr (Idul Fitri), built with React + TypeScript + Vite. Features a teal & gold Islamic aesthetic, smooth scroll-snap sections, particle stars, swaying lanterns, and a personalized share link.

![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **4 scroll-snap sections** — Hero moon, Arabic & Bahasa greeting, lanterns, and personalization
- **Animated crescent moon** — rises on load with orbiting sparkle dots and twinkling stars
- **Falling particle stars** — gold, cream, and teal particles drifting across the background
- **Typewriter effect** — Arabic and Bahasa Indonesia lines type themselves in on scroll
- **Swaying lanterns** — 5 SVG lanterns with idle sway; hover triggers an elastic physics swing with a brightened inner glow
- **Parallax background** — ambient teal radial gradients scale subtly as you scroll
- **Name personalization** — visitors type their name and the card updates live
- **Download card** — renders a clean 800×800 PNG via `html2canvas`, named after the recipient
- **Personalized share link** — encodes the recipient's name as `?nama=` in the URL; opening the link auto-fills the name

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| **Vite** | 8.x | Build tool & dev server |
| **React** | 19.x | UI framework |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.4 | Utility-first styling with custom teal/gold theme |
| **Framer Motion** | 11.x | Animations — parallax, entrance, elastic lantern swing |
| **@tsparticles/react** | 3.x | Falling star particle system |
| **@tsparticles/slim** | 3.x | Lightweight tsparticles engine |
| **html2canvas** | 1.4.x | Off-screen card rendering for PNG download |
| **Lucide React** | latest | Icons (download, share, sparkles) |

---

## 📁 Project Structure

```
eid-card/
├── public/
├── src/
│   ├── components/
│   │   ├── GeometricBorder.tsx   # SVG Islamic corner & edge ornaments
│   │   ├── GreetingText.tsx      # Typewriter greeting in Arabic + Bahasa
│   │   ├── Lanterns.tsx          # SVG lanterns with sway & hover swing
│   │   ├── MoonAndStars.tsx      # Animated crescent moon with orbiting dots
│   │   ├── NameInput.tsx         # Recipient name input with live preview
│   │   ├── ParticleBackground.tsx# tsparticles falling stars
│   │   └── ShareDownload.tsx     # PNG download + personalized URL share
│   ├── App.tsx                   # Root — scroll container, parallax, URL param read
│   ├── main.tsx
│   └── index.css                 # Google Fonts, Tailwind directives, global styles
├── tailwind.config.js            # Custom teal/gold color palette & font families
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/daff00/eid-greeting-card.git
cd eid-greeting-card

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open http://localhost:5173 in your browser.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔗 Personalized Share Link

When a visitor types a name and clicks **Bagikan (Share)**:

- The name is encoded into the URL as a query parameter, e.g. `https://eid-greeting-card-theta.vercel.app/?nama=Budi`
- On **mobile**, it attempts to share the card as a PNG image file via the Web Share API
- On **desktop**, the personalized URL is copied to clipboard
- Anyone who opens the shared link will have the name **auto-filled** from the URL, so the card greets them by name immediately

---

## 🎨 Design Tokens

The custom Tailwind theme is defined in `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `teal-900` | `#041a1a` | Page background |
| `teal-800` | `#073333` | Input & card surfaces |
| `gold-400` | `#fbbf24` | Primary accent — moon, Arabic text, borders |
| `gold-300` | `#fde68a` | Secondary gold — subtle highlights |
| `cream` | `#fdf6e3` | Body text |
| Font: `arabic` | Scheherazade New | Arabic calligraphy text |
| Font: `display` | Cormorant Garamond | Italic Bahasa headings |
| Font: `body` | Raleway | UI labels, inputs, buttons |

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `localhost:5173` |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## 🌙 Sections Overview

| # | Section | Key Elements |
|---|---|---|
| 1 | **Hero** | Crescent moon, particle stars, parallax, date label, recipient name if pre-filled |
| 2 | **Greeting** | Typewriter in Arabic + Bahasa Indonesia, gold ornamental dividers |
| 3 | **Lanterns** | Arabic dua, Bahasa translation, 5 interactive swaying SVG lanterns |
| 4 | **Personalize** | Name input, download PNG, share personalized link |

---

Music used as the background: <a href="https://pixabay.com/users/lnplusmusic-47631836/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=487552">Andrii Poradovskyi</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=487552">Pixabay</a>

---
*Taqabbalallahu minna wa minkum — Selamat Hari Raya Idul Fitri 1447 H* ✦