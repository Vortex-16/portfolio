import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';
import InteractiveTerminal from '../ui/InteractiveTerminal';
import OSJourneyTimeline from '../ui/OSJourneyTimeline';
import { OS_PROGRESSION } from '../../constants/os';
import { FaLinux } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const OSJourney = () => {
  const { isDark } = useTheme();
  const headerRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Reveal the distro strip logos on scroll.
      if (stripRef.current) {
        const distroLogos = stripRef.current.querySelectorAll('[data-distro]');
        if (distroLogos.length > 0) {
          gsap.from(distroLogos, {
            opacity: 0,
            y: 30,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.6)',
            scrollTrigger: { trigger: stripRef.current, start: 'top 85%' },
          });
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-20 px-4 md:px-8 lg:pl-32 lg:pr-16">
      {/* Header Section */}
      <div ref={headerRef} className="max-w-6xl mx-auto mb-12 md:mb-16 text-center">
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <FaLinux className={`text-5xl md:text-7xl lg:text-8xl ${isDark ? 'text-[#1793d1]' : 'text-emerald-600'}`} />
        </div>
        <h1 className={`font-lexa text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My Journey into Operating Systems
        </h1>
        <p className={`font-monorama text-base md:text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          From a first Java program in BlueJ to ricing Arch on Wayland — the winding road from Windows into Linux, chasing the dream of building my own OS.
        </p>
      </div>

      {/* Animated Journey Carousel */}
      <div className="max-w-5xl mx-auto mb-16 md:mb-24">
        <OSJourneyTimeline />
      </div>

      {/* Interactive Terminal */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <InteractiveTerminal />
      </div>

      {/* Distros I've run */}
      <div ref={stripRef} className="max-w-5xl mx-auto">
        <h2 className={`font-lexa text-xl md:text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Distros I've Lived In
        </h2>
        <div className="flex flex-wrap items-start justify-center gap-5 md:gap-8">
          {OS_PROGRESSION.map((os) => (
            <a
              key={os.name}
              href={os.url}
              target="_blank"
              rel="noopener noreferrer"
              data-distro
              title={`Visit ${os.name} website`}
              className="group flex flex-col items-center w-24 md:w-28 focus:outline-none"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-2 border backdrop-blur-xl transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1 ${isDark ? 'bg-white/[0.06] border-white/15 group-hover:border-arch-blue/40' : 'bg-white/40 border-white/60 group-hover:border-emerald-400/60'} group-hover:shadow-xl`}>
                <img src={os.src} alt={os.name} className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-md" loading="lazy" />
              </div>
              <p className={`font-monorama font-semibold text-xs text-center leading-tight transition-colors ${isDark ? 'text-gray-200 group-hover:text-arch-blue' : 'text-gray-800 group-hover:text-emerald-700'}`}>
                {os.name}
              </p>
              <p className={`font-monorama text-[10px] text-center mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {os.label}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OSJourney;
