import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { useTheme } from '../../hooks/useTheme';
import { JOURNEY_TIMELINE } from '../../constants/timeline';
import {
  FaTrophy, FaBolt, FaUserTie, FaLaptopCode, FaCloud,
  FaAward, FaCalendarAlt, FaCheckCircle, FaExternalLinkAlt, FaChevronRight
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
      className={`rounded-3xl border p-5 sm:p-6 backdrop-blur-xl shadow-xl transition-all relative overflow-hidden flex flex-col justify-between ${
        isDark
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

  // Extract entries for 2025-2026 (My Second Year) or filter by year
  const secondYearItem = JOURNEY_TIMELINE.find(item => item.id === 'second-year-journey');
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
                className={`px-4 py-2 rounded-full font-lexa text-xs font-bold transition-all duration-300 ${
                  selectedYear === tab.id
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

        {/* ── OTHER YEARS CARDS ── */}
        {selectedYear !== '2025-2026' && (
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

                  {selectedYear === '2026+' && (
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-mono text-xs font-bold mb-3">
                        Future Vision & 3rd Year
                      </div>
                      <h3 className="font-lexa text-2xl font-bold mb-3">Stepping into 3rd Year & Building Systems</h3>
                      <p className="font-sans text-sm opacity-90 leading-relaxed">
                        Focusing on High-Level & Low-Level System Design (HLD/LLD), Linux Internals, and building production-scale software applications.
                      </p>
                    </div>
                  )}
                </div>
              </StoryBentoCard>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default JourneyBentoBoard;
