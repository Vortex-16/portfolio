import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { useTheme } from '../../hooks/useTheme';
import { JOURNEY_TIMELINE } from '../../constants/timeline';
import {
  FaTrophy, FaBolt, FaUserTie, FaLaptopCode, FaCloud,
  FaAward, FaCalendarAlt, FaCheckCircle, FaExternalLinkAlt, FaChevronRight,
  FaEye, FaDownload, FaTimes, FaShieldAlt
} from 'react-icons/fa';
import { SiGooglecloud, SiGithub, SiReact } from 'react-icons/si';

const YearBadge = ({ year }) => (
  <div className="inline-block px-4 py-1 rounded-full text-xs font-mono font-bold bg-black/80 text-white dark:bg-white/10 dark:text-gray-200 border border-white/10 shadow-sm">
    {year}
  </div>
);

const StoryBentoCard = ({ children, className = '', accent = '' }) => {
  const { isDark } = useTheme();
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`rounded-3xl border p-5 sm:p-6 backdrop-blur-xl shadow-xl transition-all relative overflow-hidden flex flex-col justify-between ${isDark
        ? 'bg-[#12121a]/90 border-white/10 hover:border-purple-500/40 shadow-black/50'
        : 'bg-white/95 border-gray-200/90 hover:border-emerald-500/40 shadow-gray-300/40'
        } ${className}`}
    >
      {accent && (
        <div
          className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
          style={{ backgroundColor: accent }}
        />
      )}
      {children}
    </motion.div>
  );
};

const JourneyBentoBoard = () => {
  const { isDark } = useTheme();
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [showCertModal, setShowCertModal] = useState(false);

  // Stagger animation on year tab change
  useEffect(() => {
    anime({
      targets: '.bento-year-card',
      translateY: ['25px', '0px'],
      opacity: [0, 1],
      scale: [0.97, 1],
      delay: anime.stagger(60),
      duration: 550,
      easing: 'easeOutQuad',
    });
  }, [selectedYear]);

  // Lock body scroll and listen for Escape key when certificate modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowCertModal(false);
    };
    if (showCertModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showCertModal]);

  // Extract entries for each tab
  const firstYearItem = JOURNEY_TIMELINE.find(item => item.id === 'first-year-hackathon-srey');
  const schoolItem = JOURNEY_TIMELINE.find(item => item.id === 'class-11-java');

  return (
    <section id="journey-bento-section" className="py-2 md:py-6 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">

        {/* ── Year Selector Tabs ── */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-xl bg-black/10 dark:bg-white/5 border-white/10 shadow-lg">
            {[
              { id: '2023', label: '2023 · Class 11-12' },
              { id: '2024-2025', label: '2024–2025 · First Year' },
              { id: '2025-2026', label: '2025–2026 · Second Year' },
              { id: '2026+', label: '2026+ · 3rd Year' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedYear(tab.id)}
                className={`px-4 py-2 rounded-full font-lexa text-xs font-bold transition-all duration-300 ${selectedYear === tab.id
                  ? isDark
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Header Title (Image Design Style) ── */}
        <div className="text-center mb-10">
          <YearBadge year={selectedYear === '2025-2026' ? '2025 — 2026' : selectedYear} />

          <h1 className="font-lexa text-4xl sm:text-5xl md:text-6xl font-black mt-3 mb-2 tracking-tight leading-tight">
            My <span className={isDark ? 'text-purple-400' : 'text-emerald-600'}>
              {selectedYear === '2025-2026' ? 'Second Year' : selectedYear === '2024-2025' ? 'First Year' : selectedYear === '2023' ? 'School Foundations' : 'Third Year'}
            </span> of Engineering
          </h1>

          <p className="font-sans text-base sm:text-lg font-medium opacity-80 max-w-xl mx-auto">
            {selectedYear === '2025-2026'
              ? 'A year of learning, building, leading and competing.'
              : selectedYear === '2024-2025'
                ? 'First hackathon, team leadership and victory.'
                : selectedYear === '2023'
                  ? 'Self-taught Java, fixing errors without AI or spoon-feeding.'
                  : 'Stepping into 3rd year with deeper system design and scale.'}
          </p>
        </div>

        {/* ── 2025-2026 SECOND YEAR BENTO BOARD (Exact Figma Card Layout) ── */}
        {selectedYear === '2025-2026' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">

            {/* 1. HERO TOP LEFT: Google Solution Challenge Top 106 */}
            <div className="bento-year-card md:col-span-6">
              <StoryBentoCard accent="#ea4335">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 p-0.5 shadow-md shrink-0">
                      <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center">
                        <FaCloud className="text-xl text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-lexa font-bold text-lg sm:text-xl leading-tight">
                        Google Solution Challenge 2026
                      </h3>
                      <p className="font-sans text-xs text-gray-500 dark:text-gray-400">Build with AI</p>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-300 font-lexa text-xs font-extrabold w-fit mb-4">
                  <FaTrophy className="text-amber-500" />
                  <span>Top 106 Teams Globally</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Selected among the Top 106 teams worldwide! A major milestone bringing together AI, full-stack software development, and real-world problem solving.
                </p>
              </StoryBentoCard>
            </div>

            {/* 2. HERO TOP RIGHT: Impetus Hackathon Top 13 */}
            <div className="bento-year-card md:col-span-6">
              <StoryBentoCard accent="#8b5cf6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center text-2xl shrink-0 border border-purple-500/30">
                      <FaBolt />
                    </div>
                    <div>
                      <h3 className="font-lexa font-bold text-lg sm:text-xl leading-tight">
                        Impetus Hackathon 2026
                      </h3>
                      <p className="font-sans text-xs text-gray-500 dark:text-gray-400">National Level Competition</p>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-300 font-lexa text-xs font-extrabold w-fit mb-4">
                  <FaTrophy className="text-purple-500" />
                  <span>Top 13 Finalists</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Shortlisted among the Top 13 Finalists of Impetus Hackathon 2026 — one of the strongest competitive engineering milestones of the year.
                </p>
              </StoryBentoCard>
            </div>

            {/* 3. ROW 2 LEFT: GDGoC STCET Web Lead */}
            <div className="bento-year-card md:col-span-4">
              <StoryBentoCard accent="#3b82f6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center text-xl shrink-0 border border-blue-500/30">
                    <FaUserTie />
                  </div>
                  <div>
                    <h4 className="font-lexa font-bold text-base">GDG on Campus</h4>
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400">STCET Kolkata</p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 font-mono text-xs font-bold w-fit mb-2">
                  Web & Full Stack Coordinator
                </div>
                <p className="font-sans text-xs text-gray-600 dark:text-gray-400">
                  Transition from participant to technical community lead.
                </p>
              </StoryBentoCard>
            </div>

            {/* 4. ROW 2 CENTER: GDGoC Tech Sprint Rank 8 */}
            <div className="bento-year-card md:col-span-4">
              <StoryBentoCard accent="#10b981">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xl shrink-0 border border-emerald-500/30">
                    <FaLaptopCode />
                  </div>
                  <div>
                    <h4 className="font-lexa font-bold text-base">Team Tekkuzen</h4>
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400">GDGoC Tech Sprint 2025</p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-mono text-xs font-bold w-fit mb-2">
                  Rank 8 in Round 1
                </div>
                <p className="font-sans text-xs text-gray-600 dark:text-gray-400">
                  Building under tight constraints & rapid team delivery.
                </p>
              </StoryBentoCard>
            </div>

            {/* 5. ROW 2 RIGHT: IIT Events Strip */}
            <div className="bento-year-card md:col-span-4">
              <StoryBentoCard accent="#06b6d4">
                <h4 className="font-lexa font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">
                  IIT Competitions & Events
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-mono font-bold text-xs text-cyan-400">KSHITIJ</div>
                    <div className="text-[10px] text-gray-400">IIT KGP</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-mono font-bold text-xs text-cyan-400">CodeFest</div>
                    <div className="text-[10px] text-gray-400">IIT (BHU)</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-mono font-bold text-xs text-cyan-400">Diversion</div>
                    <div className="text-[10px] text-gray-400">36H Hack</div>
                  </div>
                </div>
              </StoryBentoCard>
            </div>

            {/* 6. BOTTOM ROW: Stats Summary Bar */}
            <div className="bento-year-card md:col-span-12">
              <div className="p-6 rounded-3xl border backdrop-blur-xl bg-white/5 dark:bg-white/[0.03] border-white/10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  <div className="pt-2 sm:pt-0">
                    <div className="font-lexa text-2xl sm:text-3xl font-extrabold text-purple-400">10+</div>
                    <div className="font-sans text-xs text-gray-400">Hackathons & Events</div>
                  </div>
                  <div className="pt-2 sm:pt-0">
                    <div className="font-lexa text-2xl sm:text-3xl font-extrabold text-blue-400">2</div>
                    <div className="font-sans text-xs text-gray-400">IIT-Level Events</div>
                  </div>
                  <div className="pt-2 sm:pt-0">
                    <div className="font-lexa text-2xl sm:text-3xl font-extrabold text-emerald-400">1</div>
                    <div className="font-sans text-xs text-gray-400">Open Source Initiative</div>
                  </div>
                  <div className="pt-2 sm:pt-0">
                    <div className="font-lexa text-2xl sm:text-3xl font-extrabold text-amber-400">∞</div>
                    <div className="font-sans text-xs text-gray-400">Things to Learn</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── 2026+ THIRD YEAR BENTO BOARD ── */}
        {selectedYear === '2026+' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
            {/* Top Main Hero: Role, Company, Period, & Certificate Badge */}
            <div className="bento-year-card md:col-span-12">
              <StoryBentoCard accent="#10b981">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                        Web Developer Intern
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 font-mono text-xs text-gray-300 border border-white/10">
                        <FaCalendarAlt size={12} className="text-emerald-400" />
                        22/08/2026 – 22/09/2026 (1 Month)
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-xs font-semibold border border-emerald-500/30">
                        <FaAward size={12} />
                        Issued: 22/09/2026
                      </span>
                    </div>

                    <h2 className="font-lexa text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                      Web Developer @ <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">DEXMY Education</span>
                    </h2>

                    <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90 max-w-3xl">
                      Worked as a Web Developer at DEXMY Education, contributing to the development and hardening of an EdTech platform across frontend, backend integration, scheduling, testing, and payment workflows.
                    </p>
                  </div>

                  {/* Certificate preview trigger */}
                  <div className="shrink-0 flex flex-col items-center sm:items-start lg:items-end gap-2.5 w-full sm:w-auto">
                    <div
                      onClick={() => setShowCertModal(true)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all hover:scale-105 hover:border-emerald-400/50 bg-black/40 p-1.5 w-full max-w-[260px] sm:w-52"
                      title="Click to view full certificate"
                    >
                      <img
                        src="/DexmyCertificate.jpeg"
                        alt="Dexmy Certificate of Completion"
                        className="w-full h-auto rounded-xl object-contain shadow-md"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold rounded-2xl">
                        <FaEye /> View Certificate
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCertModal(true)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-3.5 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95 w-full max-w-[260px] sm:w-auto"
                    >
                      <FaAward /> View Certificate
                    </button>
                  </div>
                </div>

                {/* 5 Core Accomplishments Grid */}
                <div className="pt-6">
                  <h4 className="font-lexa font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">
                    Key Contributions & Deliverables
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-white/[0.02] border-white/10 hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <FaUserTie className="text-emerald-400 text-base shrink-0" />
                        <h5 className="font-lexa font-bold text-sm">Parent Dashboard</h5>
                      </div>
                      <p className="font-sans text-xs leading-relaxed opacity-80">
                        Developed and integrated a responsive Parent Dashboard with multi-child management, child switching, class tracking, dynamic course discovery, validation, and role-based access control.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-white/[0.02] border-white/10 hover:border-amber-500/30 transition-all">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <FaBolt className="text-amber-400 text-base shrink-0" />
                        <h5 className="font-lexa font-bold text-sm">Booking & Concurrency System</h5>
                      </div>
                      <p className="font-sans text-xs leading-relaxed opacity-80">
                        Improved the booking and teacher-assignment system to handle duplicate bookings, race conditions, overlapping schedules, timezone consistency, teacher availability, authorization, and database-level integrity.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-white/[0.02] border-white/10 hover:border-blue-500/30 transition-all">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <FaLaptopCode className="text-blue-400 text-base shrink-0" />
                        <h5 className="font-lexa font-bold text-sm">Testing Service Integration</h5>
                      </div>
                      <p className="font-sans text-xs leading-relaxed opacity-80">
                        Integrated the existing Node.js/Express Testing service with DexMy’s FastAPI-based application while preserving the existing PostgreSQL architecture, implementing Test Creator roles, authentication/authorization integration, dashboards, and student testing flows.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <FaShieldAlt className="text-purple-400 text-base shrink-0" />
                        <h5 className="font-lexa font-bold text-sm">Payment & Package Hardening</h5>
                      </div>
                      <p className="font-sans text-xs leading-relaxed opacity-80">
                        Audited and hardened the payment and package-purchase architecture, strengthening server-side payment validation, webhook handling, idempotency, duplicate-processing protection, transaction safety, package activation, and student/admin payment synchronization.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-white/[0.02] border-white/10 hover:border-pink-500/30 transition-all">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <FaCheckCircle className="text-pink-400 text-base shrink-0" />
                        <h5 className="font-lexa font-bold text-sm">Production Reliability</h5>
                      </div>
                      <p className="font-sans text-xs leading-relaxed opacity-80">
                        Focused on production reliability through backend validation, secure authorization, automated testing, edge-case handling, API integration, database integrity, and maintainable Git/PR workflows.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-white/[0.02] border-white/10 hover:border-teal-500/30 transition-all">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <FaTrophy className="text-teal-400 text-base shrink-0" />
                        <h5 className="font-lexa font-bold text-sm">Engineering Impact & Scale</h5>
                      </div>
                      <p className="font-sans text-xs leading-relaxed opacity-80">
                        Successfully delivered across frontend & backend architectures in production, bridging real-world EdTech systems with CSE 3rd Year focus on system design (HLD/LLD) and OS building.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key areas pills */}
                <div className="pt-6 border-t border-white/10 mt-6">
                  <h4 className="font-lexa font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">
                    Key Areas & Technical Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React Development',
                      'FastAPI',
                      'Node.js',
                      'Express.js',
                      'PostgreSQL',
                      'REST APIs',
                      'Authentication & Authorization',
                      'RBAC',
                      'Payment Systems',
                      'Webhooks',
                      'Concurrency Handling',
                      'Database Transactions',
                      'Testing',
                      'Production Hardening',
                    ].map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </StoryBentoCard>
            </div>
          </div>
        )}

        {/* ── FIRST YEAR & SCHOOL CARDS ── */}
        {(selectedYear === '2024-2025' || selectedYear === '2023') && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            <div className="md:col-span-12">
              <StoryBentoCard accent="#10b981">
                <div className="p-4 sm:p-6">
                  {selectedYear === '2024-2025' && firstYearItem && (
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold mb-3">
                        🏆 WINNER — Team Alpha (1st Place)
                      </div>
                      <h3 className="font-lexa text-2xl font-bold mb-3">{firstYearItem.title}</h3>
                      <p className="font-sans text-sm opacity-90 leading-relaxed mb-4">{firstYearItem.summary}</p>
                      <div className="space-y-2">
                        {firstYearItem.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs opacity-80">
                            <FaCheckCircle className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedYear === '2023' && schoolItem && (
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold mb-3">
                        Pearls Of God School (ISC)
                      </div>
                      <h3 className="font-lexa text-2xl font-bold mb-3">{schoolItem.title}</h3>
                      <p className="font-sans text-sm opacity-90 leading-relaxed mb-4">{schoolItem.summary}</p>
                      <div className="space-y-2">
                        {schoolItem.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs opacity-80">
                            <FaCheckCircle className="text-blue-400 mt-0.5 shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </StoryBentoCard>
            </div>
          </div>
        )}

        {/* Certificate Modal rendered via React Portal directly into document.body */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {showCertModal && (
              <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 md:p-8">
                {/* Full-screen Backdrop with Blur Effect (blurs the page behind) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCertModal(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Solid, Opaque Modal Card (unblurred so no background bleed-through) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative max-w-4xl w-full max-h-[88vh] rounded-3xl border border-white/20 bg-[#0d121c] text-white shadow-2xl overflow-hidden flex flex-col z-10"
                >
                  {/* Clean Solid Header */}
                  <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#151c2a] shrink-0">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <FaAward size={20} />
                      </div>
                      <div>
                        <h3 className="font-lexa font-bold text-base sm:text-lg tracking-tight text-white">
                          Dexmy Certificate of Completion
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-xs text-emerald-400 font-medium">
                            1 (One) Month Internship
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-500" />
                          <span className="font-mono text-xs text-gray-300">
                            22/08/2026 – 22/09/2026
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="/DexmyCertificate.jpeg"
                        download="Vikash_Gupta_Dexmy_Certificate.jpeg"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-mono text-xs font-bold transition-all shadow-md active:scale-95 text-white"
                      >
                        <FaDownload size={12} /> Download
                      </a>
                      <button
                        onClick={() => setShowCertModal(false)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Clean Solid Image Viewport */}
                  <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-[#070a10]">
                    <img
                      src="/DexmyCertificate.jpeg"
                      alt="Dexmy Certificate of Completion - Vikash Gupta"
                      className="max-h-[68vh] w-auto rounded-xl shadow-2xl object-contain border border-white/10"
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
};

export default JourneyBentoBoard;
