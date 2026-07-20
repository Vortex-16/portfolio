# ⚡ Vikash Gupta — Production Engineering & Developer Portfolio

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.13-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Portfolio](https://img.shields.io/badge/Live-vikash.is--a.dev-059669)](https://vikash.is-a.dev)

A high-performance, responsive web platform built with **React 19**, **GSAP ScrollTrigger**, **Framer Motion**, and **Aceternity UI Vortex**. Engineered with a focus on **Low-Level Animation Physics**, **Sub-Second First Contentful Paint (FCP)**, **WebP Asset Optimization**, and **Zero Security Vulnerabilities**.

---

## 🏛️ High-Level Design (HLD)

### 1. System Architecture Diagram

```
                             [ Browser Viewport ]
                                       │
                      ┌────────────────┴────────────────┐
                      ▼                                 ▼
             [ Layout Container ]             [ Background Canvas Engine ]
             (Lenis Smooth Scroll)           (Aceternity Vortex + Noise3D)
                      │                                 │
         ┌────────────┼────────────┐                    │
         ▼            ▼            ▼                    │
    [ Homepage ]  [ About ]   [ Projects ]              │
         │            │            │                    │
         │     (OneDrive Live) (GSAP Scrub Star)       │
         │            │            │                    │
         └────────────┴────────────┴────────────────────┘
                                   │
                                   ▼
                      [ Global Theme Sync Context ]
                     (Dark: Arch / Light: Emerald)
```

### 2. Architectural Highlights

- **Single Page Application (SPA) with Dynamic Chunk Splitting**: Lazy loads routes via `React.lazy()` and Vite `manualChunks` configuration, decoupling heavy vendor modules (`vendor-framer`, `vendor-gsap`, `vendor-router`) into isolated browser-cached bundles.
- **Unified Scroll Engine**: Synchronizes Lenis smooth-scrolling with GSAP's global ticker (`gsap.ticker.add(raf)`), preventing frame jitter and keeping ScrollTrigger elements locked to hardware refresh rates.
- **Theme-Adaptive Rendering**: Context-driven theme system supporting real-time canvas particle recoloring (Purple/Cyan for Dark Mode vs Deep Emerald/Teal for Light Mode) with high-contrast text typography.

---

## 🔬 Low-Level Design (LLD)

### 1. Aceternity UI Vortex Canvas Engine (`src/components/ui/vortex.jsx`)

The background particle system replaces heavy 3D WebGL runtimes (like Three.js/Vanta, saving **~600KB** bundle overhead) with a custom 2D canvas procedural flow field:

- **Mathematical Engine**: Uses `simplex-noise` (`createNoise3D`) to map 3D noise coordinates $(x \cdot 0.0015, y \cdot 0.0015, \text{tick} \cdot 0.0015)$ to radial particle vector velocities:
  $$\mathbf{v} = \begin{pmatrix} \cos(\text{noise} \cdot 2\pi) \cdot \text{speed} \\ \sin(\text{noise} \cdot 2\pi) \cdot \text{speed} \end{pmatrix}$$
- **Particle Array Structure**: Uses high-performance typed arrays (`Float32Array`) storing contiguous 9-float strides `[x, y, vx, vy, life, ttl, speed, radius, hue]` for zero-garbage-collection loop iterations.
- **Light Mode Canvas Fill Guard**: Dynamically toggles canvas frame fade opacity (`rgba(15, 15, 22, 0.2)` in Dark vs `rgba(236, 253, 245, 0.25)` in Light) to eliminate screen darkening bugs and preserve crisp typography.

### 2. GSAP Parallax & Physics Interaction (`src/components/pages/Projects.jsx`)

- **Scroll-Scrubbed Accent**: Rotates an accent SVG element $720^\circ$ while translating it along the Y-axis (`55vh`) tied to the section's `ScrollTrigger` scrub pipeline (`scrub: 1.2`).
- **Mouse Parallax Interactivity**: Uses `gsap.quickTo()` for hardware-accelerated cursor offset tracking ($X, Y \in [-40\text{px}, +40\text{px}]$) without triggering React re-renders.
- **Defensive Ref Null Guarding**: Protects all GSAP target contexts against unmounted DOM elements, eliminating target null warnings.

### 3. Dynamic OneDrive Document Viewer (`src/components/pages/About.jsx`)

- **Live Cloud Resume Embed**: Integrates Microsoft's Office Online Web Viewer via OneDrive share parameter (`?em=2`), enabling instant live resume synchronization whenever the source Word document is modified in OneDrive.
- **Fallback Architecture**: Gracefully falls back to `/public/resume.pdf` if the cloud link is offline, providing dedicated **Download PDF** and **Full Screen** action triggers.

---

## ⚡ Performance & Asset Benchmarks

| Metric | Before Optimization | After Optimization | Improvement |
|---|---|---|---|
| **Image Assets Payload** | `27.4 MB` (PNG/JPG) | `2.19 MB` (WebP @ Q82) | **-91.8% (-25.21 MB)** |
| **Initial JS Bundle** | `~1.2 MB` (Three.js/Vanta) | `~322 KB` (Vortex Canvas) | **-73.1% (-600 KB)** |
| **Production Build Time** | `14.9s` | `7.8s` | **47.6% Faster** |
| **Security Audit Vulnerabilities** | `5` (3 High, 2 Low) | `0` | **100% Resolved** |

---

## 📁 Project Directory Structure

```
d:\hdd\portfolio\
├── public/                 # Optimized WebP assets & resume PDF
├── scripts/
│   └── convert-to-webp.mjs # Automated Sharp image processing pipeline
├── src/
│   ├── components/
│   │   ├── layout/         # App Layout shell & smooth scroll wrappers
│   │   ├── pages/          # Lazy-loaded page routes (Homepage, About, Projects, OSJourney, Contact)
│   │   └── ui/             # Core component library
│   │       ├── vortex.jsx             # Aceternity UI Vortex Canvas engine
│   │       ├── LiquidGlassCard.jsx    # Glassmorphism cards with mouse tilt
│   │       ├── ResponsiveNavigation.jsx# Waybar top bar & mobile tab bar
│   │       └── ProjectDetailsModal.jsx# Accessible project view modal
│   ├── constants/          # Application data (projects, OS timeline, nav)
│   ├── hooks/              # Custom hooks (useTheme, useLenis, useGsapReveal)
│   ├── utils/              # API wrappers (GitHub API, EmailJS)
│   ├── App.jsx             # App routing & suspense fallback
│   ├── index.css           # Design tokens, typography & CSS utilities
│   └── main.jsx            # DOM entry point
├── vite.config.js          # Vite build config, Terser compression & manual chunks
└── package.json            # Dependencies & scripts
```

---

## 🛠️ Technology Stack Matrix

| Layer | Technologies |
|---|---|
| **Core Architecture** | React 19, JavaScript (ES6+), JSX |
| **Styling & Design Tokens** | Tailwind CSS 3.4, Custom CSS Glassmorphism |
| **Animation & Motion** | GSAP 3 (ScrollTrigger, Observer), Framer Motion 12, Anime.js |
| **Background Engine** | Aceternity UI Vortex (HTML5 Canvas + Simplex Noise) |
| **Smooth Scroll** | Lenis |
| **Build & Optimization** | Vite 8, Terser, Sharp (WebP conversion) |
| **Tooling & Icons** | React Icons, Lucide React, ESLint 9 |

---

## 📦 Local Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/Vortex-16/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Execute production build
npm run build
```

Then navigate to `http://localhost:5173`.

---

## 👤 Author

**Vikash Gupta** — Computer Science & Engineering Undergrad (2024–2028)
- **Portfolio**: [vikash.is-a.dev](https://vikash.is-a.dev)
- **GitHub**: [@Vortex-16](https://github.com/Vortex-16)

---

Licensed under the [MIT License](LICENSE).
