import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { filters } from '../../constants/projects';
import ProjectCard from '../ui/ProjectCard';
import ProjectDetailsModal from '../ui/ProjectDetailsModal';
import DevTrackDemo from '../ui/DevTrackDemo';
import useGsapReveal from '../../hooks/useGsapReveal';
import { FaCode, FaRocket, FaStar, FaCodeBranch, FaExternalLinkAlt, FaGithub, FaLayerGroup } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { projects, loading } = useGitHubProjects();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDevTrack, setShowDevTrack] = useState(false);
  const [heroTab, setHeroTab] = useState('overview'); // 'overview' | 'features' | 'tech'
  const { isDark } = useTheme();

  const sectionRef = useRef(null);
  const starContainerRef = useRef(null);
  const starSvgRef = useRef(null);

  // Find top featured project for Hero Showcase (DevTrack or first featured)
  const topFeaturedProject = projects.find((p) => p.demoType === 'devtrack') || projects.find((p) => p.featured) || projects[0];

  // GSAP ScrollTrigger reveal — re-runs when the filter or load state changes
  const gridRef = useGsapReveal({
    selector: '.gsap-reveal',
    deps: [activeFilter, loading],
  });

  // ── GSAP Mouse & Scroll-Driven Parallax Star Effect ──
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-driven movement: star travels down the screen (y: 60vh) while rotating 720deg
      gsap.fromTo(
        starSvgRef.current,
        {
          rotateZ: 0,
          y: -40,
          scale: 0.85,
          opacity: 0.2,
        },
        {
          rotateZ: 720,
          y: '55vh',
          scale: 1.3,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            scrub: 1.2,
          },
        }
      );

      // 2. Smooth Mouse Parallax tracking
      const xTo = gsap.quickTo(starContainerRef.current, 'x', { duration: 0.7, ease: 'power3.out' });
      const yTo = gsap.quickTo(starContainerRef.current, 'y', { duration: 0.7, ease: 'power3.out' });

      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        // Calculate normalized offset (-40px to +40px)
        const offsetX = ((e.clientX / innerWidth) - 0.5) * 80;
        const offsetY = ((e.clientY / innerHeight) - 0.5) * 80;
        xTo(offsetX);
        yTo(offsetY);
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = (activeFilter === "All"
    ? projects
    : projects.filter(project =>
      project.category?.toLowerCase()
        .split('/')
        .some(cat => cat.trim() === activeFilter.toLowerCase())
    )
  ).filter((p) => !p.demoType); // Keep featured hero distinct from general grid

  return (
    <section ref={sectionRef} className="min-h-screen py-20 md:py-24 relative z-10 overflow-hidden">

      {/* ── Fixed Viewport Star: Travels down screen on scroll + Mouse Parallax ── */}
      <div
        ref={starContainerRef}
        aria-hidden
        className="pointer-events-none fixed top-24 right-4 sm:right-8 md:top-28 md:right-16 z-0"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={starSvgRef}
          className="relative w-36 h-36 md:w-56 md:h-56 flex items-center justify-center will-change-transform"
        >
          {/* Glowing background aura */}
          <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 transition-colors duration-500 ${isDark ? 'bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400' : 'bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-500'}`} />

          {/* Premium 8-Point Geometric Star SVG */}
          <svg
            viewBox="0 0 200 200"
            className={`w-full h-full drop-shadow-2xl transition-colors duration-500 ${isDark ? 'text-indigo-400' : 'text-emerald-600'}`}
          >
            <defs>
              <linearGradient id="starGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="starGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Core 8-Point Star */}
            <path
              d="M100,0 L115,70 L185,40 L130,90 L200,100 L130,110 L185,160 L115,130 L100,200 L85,130 L15,160 L70,110 L0,100 L70,90 L15,40 L85,70 Z"
              fill={isDark ? "url(#starGradDark)" : "url(#starGradLight)"}
              opacity={isDark ? "0.3" : "0.25"}
            />
            {/* Inner 4-Point Sharp Star */}
            <path
              d="M100,20 L112,88 L180,100 L112,112 L100,180 L88,112 L20,100 L88,88 Z"
              fill={isDark ? "url(#starGradDark)" : "url(#starGradLight)"}
              opacity={isDark ? "0.7" : "0.6"}
            />
            {/* Center Core Sparkle */}
            <circle cx="100" cy="100" r="10" fill="#ffffff" opacity="0.9" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border ${isDark
              ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700'
              }`}
          >
            <FaRocket className="text-xs" />
            <span>PORTFOLIO SHOWCASE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-lexa text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Crafted{' '}
            <span className={`${isDark ? 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400' : 'bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600'} bg-clip-text text-transparent`}>
              Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-monorama text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Explore featured flagship projects, system utilities, and open-source innovations.
          </motion.p>
        </div>


        {/* ═══════════════════════════════════════════════════════════════════════
            FEATURED HERO SPOTLIGHT SECTION
            - Desktop: Concept 2 (Split Showcase Card with Interactive Tabs & Live Demo)
            - Mobile:  Concept 1 (Vibrant Touch Banner Card)
           ═══════════════════════════════════════════════════════════════════════ */}
        {topFeaturedProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-14 md:mb-20"
          >
            {/* Desktop View (Split Showcase Concept 2) */}
            <div className={`hidden md:grid grid-cols-12 gap-6 p-6 md:p-8 rounded-3xl border transition-all duration-300 ${isDark
              ? 'bg-[#0a0a0c]/90 border-indigo-500/20 shadow-[0_0_50px_rgba(79,70,229,0.1)] hover:border-indigo-500/40'
              : 'bg-white/90 border-emerald-300/60 shadow-[0_12px_40px_rgba(5,150,105,0.12)] hover:border-emerald-400'
              }`}>
              
              {/* Left Column: Visual Card Preview */}
              <div className="col-span-6 flex flex-col justify-between">
                <div>
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-indigo-600 text-white shadow-md">
                      <HiSparkles className="text-amber-300 text-[10px]" />
                      Featured Spotlight
                    </span>
                    {topFeaturedProject.stars > 0 && (
                      <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${isDark ? 'bg-white/5 border-white/10 text-amber-400' : 'bg-gray-100 border-gray-200 text-amber-600'}`}>
                        <FaStar size={12} /> {topFeaturedProject.stars} stars
                      </span>
                    )}
                  </div>

                  <h3 className={`font-lexa text-2xl lg:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {topFeaturedProject.title}
                  </h3>

                  <p className={`font-monorama text-sm leading-relaxed mb-6 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {topFeaturedProject.description}
                  </p>
                </div>

                {/* Image / Interactive Box */}
                <div className="relative rounded-2xl overflow-hidden aspect-video group mb-6 border border-black/10">
                  <img
                    src={topFeaturedProject.image}
                    alt={topFeaturedProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/project-fallback.png'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <div className="flex flex-wrap gap-2">
                      {topFeaturedProject.techStack?.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-black/60 text-indigo-300 border border-indigo-400/30 backdrop-blur-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call to actions */}
                <div className="flex items-center gap-3">
                  {topFeaturedProject.demoType === 'devtrack' ? (
                    <button
                      onClick={() => setShowDevTrack(!showDevTrack)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                    >
                      <FaCode size={13} />
                      {showDevTrack ? 'Close Interactive Demo' : 'Launch Interactive Demo'}
                    </button>
                  ) : topFeaturedProject.demo ? (
                    <a
                      href={topFeaturedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                    >
                      <FaExternalLinkAlt size={12} />
                      Live Preview
                    </a>
                  ) : null}

                  {topFeaturedProject.github && (
                    <a
                      href={topFeaturedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all active:scale-95 ${isDark
                        ? 'border-white/15 text-gray-300 hover:text-white hover:bg-white/5'
                        : 'border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                      <FaGithub size={14} />
                      Repository
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(topFeaturedProject)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all active:scale-95 ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-emerald-700 hover:text-emerald-800'}`}
                  >
                    Case Study →
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Details Panel */}
              <div className="col-span-6 flex flex-col h-full pl-4 border-l border-white/10">
                {/* Tabs */}
                <div className="flex gap-2 p-1 rounded-xl bg-black/20 mb-4 border border-white/5">
                  <button
                    onClick={() => setHeroTab('overview')}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${heroTab === 'overview'
                      ? (isDark ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white')
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                      }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setHeroTab('features')}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${heroTab === 'features'
                      ? (isDark ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white')
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                      }`}
                  >
                    Key Architecture
                  </button>
                  <button
                    onClick={() => setHeroTab('tech')}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${heroTab === 'tech'
                      ? (isDark ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white')
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                      }`}
                  >
                    Tech Stack & Impact
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-5 rounded-2xl bg-black/30 border border-white/5 overflow-y-auto max-h-[360px]">
                  {heroTab === 'overview' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Project Mission</h4>
                        <p className={`font-monorama text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {topFeaturedProject.longDescription || topFeaturedProject.description || "An innovative solution engineered with clean code architecture and real-time interactive capabilities."}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                          <span className="font-mono text-[10px] text-gray-500 uppercase block">Category</span>
                          <span className={`font-mono text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{topFeaturedProject.category}</span>
                        </div>
                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                          <span className="font-mono text-[10px] text-gray-500 uppercase block">Status</span>
                          <span className="font-mono text-xs font-bold text-emerald-400">Active / Maintained</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {heroTab === 'features' && (
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Core Features</h4>
                      {(topFeaturedProject.features || [
                        "Real-time analytics and tracking dashboard",
                        "Clean responsive UI with glassmorphic aesthetic",
                        "High performance asset loading and caching",
                        "Modular architecture built for scalability"
                      ]).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-monorama">
                          <span className="text-indigo-400 mt-0.5">✦</span>
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {heroTab === 'tech' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {topFeaturedProject.techStack?.map((t) => (
                            <span key={t} className={`font-mono text-xs px-3 py-1 rounded-lg border ${isDark ? 'bg-white/10 border-white/15 text-white' : 'bg-gray-100 border-gray-200 text-gray-800'}`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <span className="font-mono text-[10px] text-gray-500 uppercase block mb-1">Open Source Contribution</span>
                        <p className={`font-monorama text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Code is open-source and available on GitHub for community exploration and pull requests.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Collapsible Interactive Demo Drawer */}
              <AnimatePresence>
                {showDevTrack && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="col-span-12 overflow-hidden pt-4 border-t border-white/10"
                  >
                    <DevTrackDemo />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile View (Vibrant Touch Banner Card Concept 1) */}
            <div className={`block md:hidden rounded-2xl p-5 border ${isDark
              ? 'bg-[#0d0d10] border-indigo-500/30 shadow-lg'
              : 'bg-white border-emerald-300 shadow-md'
              }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-600 text-white">
                  <HiSparkles className="text-amber-300 text-[9px]" /> Top Project
                </span>
                {topFeaturedProject.stars > 0 && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 font-bold">
                    <FaStar size={11} /> {topFeaturedProject.stars}
                  </span>
                )}
              </div>

              <h3 className={`font-lexa text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {topFeaturedProject.title}
              </h3>

              <p className={`font-monorama text-xs leading-relaxed mb-4 line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {topFeaturedProject.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {topFeaturedProject.techStack?.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-2 border-t border-white/10">
                {topFeaturedProject.demoType === 'devtrack' ? (
                  <button
                    onClick={() => setShowDevTrack(!showDevTrack)}
                    className="flex-1 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 text-center transition-all active:scale-95"
                  >
                    {showDevTrack ? 'Hide Demo' : 'Open Intelligence'}
                  </button>
                ) : topFeaturedProject.demo ? (
                  <a
                    href={topFeaturedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-indigo-600 text-center transition-all active:scale-95"
                  >
                    Live Demo
                  </a>
                ) : null}

                <button
                  onClick={() => setSelectedProject(topFeaturedProject)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all active:scale-95 ${isDark ? 'border-white/15 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                >
                  Details
                </button>
              </div>

              {/* Mobile Collapsible Demo Drawer */}
              <AnimatePresence>
                {showDevTrack && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden pt-4"
                  >
                    <DevTrackDemo />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}


        {/* ═══════════════════════════════════════════════════════════════════════
            FILTER NAVIGATION BAR (Touch Friendly Scrollable Pills)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FaLayerGroup className={isDark ? 'text-indigo-400' : 'text-emerald-600'} size={14} />
            <h3 className={`font-lexa text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Explore All Projects
            </h3>
          </div>

          {/* Horizontal Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-colors duration-300 ${activeFilter === filter
                  ? 'text-white'
                  : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                  }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className={`absolute inset-0 rounded-full ${isDark ? 'bg-indigo-600' : 'bg-emerald-600'}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </div>


        {/* ═══════════════════════════════════════════════════════════════════════
            PROJECTS GRID FEED
           ═══════════════════════════════════════════════════════════════════════ */}
        <div ref={gridRef}>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className={isDark ? 'text-indigo-400 mb-4' : 'text-emerald-600 mb-4'}
              >
                <AiOutlineLoading3Quarters size={36} />
              </motion.div>
              <p className={`font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Syncing project repositories...</p>
            </div>
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <div key={project.id} className="gsap-reveal h-full">
                      <ProjectCard
                        project={project}
                        index={index}
                        onClick={() => setSelectedProject(project)}
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProjects.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <p className={`font-mono text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No projects found matching category "{activeFilter}".</p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
