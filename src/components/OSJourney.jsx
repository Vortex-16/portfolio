import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../hooks/useTheme';
import InteractiveTerminal from './ui/InteractiveTerminal';
import { FaLinux, FaTerminal, FaCode, FaBook, FaRocket, FaCog } from 'react-icons/fa';
import { SiArchlinux, SiGnubash, SiVim, SiGit } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// Custom Bento Card for OS Journey
const OSBentoCard = ({ children, className = '', size = 'medium', delay = 0 }) => {
  const { isDark } = useTheme();
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay]);

  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-1',
    large: 'col-span-1 md:col-span-2',
    tall: 'col-span-1 row-span-2',
    wide: 'col-span-1 md:col-span-2 lg:col-span-3',
    featured: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  };

  return (
    <div
      ref={cardRef}
      className={`
        ${sizeClasses[size]}
        ${isDark 
          ? 'bg-gradient-to-br from-purple-900/40 via-violet-900/30 to-fuchsia-900/40 border-purple-500/20' 
          : 'bg-gradient-to-br from-white/90 via-emerald-50/70 to-emerald-100/90 border-emerald-300/50'
        }
        backdrop-blur-xl
        border
        rounded-2xl
        p-5 md:p-6
        transition-all
        duration-300
        hover:shadow-2xl
        ${isDark ? 'hover:shadow-purple-500/10' : 'hover:shadow-emerald-500/20'}
        ${className}
      `}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const OSJourney = () => {
  const { isDark } = useTheme();
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className={`min-h-screen pt-32 md:pt-40 pb-20 px-4 md:px-8 lg:pl-32 lg:pr-16 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
    }`}>
      {/* Header Section */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-12 md:mb-16 text-center">
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <FaLinux className={`text-5xl md:text-7xl lg:text-8xl ${isDark ? 'text-purple-400' : 'text-emerald-600'}`} />
        </div>
        <h1 className={`font-lexa text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          My Journey into Operating Systems
        </h1>
        <p className={`font-monorama text-base md:text-xl max-w-3xl mx-auto ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Building the foundation to create my own OS, exploring Linux from the ground up with EndeavourOS
        </p>
      </div>

      {/* Interactive Terminal */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <InteractiveTerminal />
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 auto-rows-auto">
          
          {/* Why Build an OS - Large Featured Card */}
          <OSBentoCard size="large" delay={0}>
            <div className="h-full flex flex-col">
              <h3 className={`font-lexa text-xl md:text-2xl font-bold mb-3 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="text-2xl">🚀</span> Why Build an OS?
              </h3>
              <p className={`font-monorama text-sm md:text-base mb-4 flex-grow ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Building an operating system is the ultimate challenge in computer science. 
                It's about understanding every layer from hardware to software.
              </p>
              <div className={`p-3 md:p-4 rounded-xl ${isDark ? 'bg-purple-900/40' : 'bg-emerald-100/60'}`}>
                <p className={`font-monorama text-xs md:text-sm italic ${isDark ? 'text-purple-200' : 'text-emerald-800'}`}>
                  "The dream of every true programmer is to build their own operating system."
                </p>
              </div>
            </div>
          </OSBentoCard>

          {/* EndeavourOS Card */}
          <OSBentoCard size="medium" delay={0.1}>
            <div className="flex flex-col items-center text-center h-full">
              <SiArchlinux className={`text-4xl md:text-5xl mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`font-lexa text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                EndeavourOS
              </h3>
              <p className={`font-monorama text-xs md:text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                My daily driver for learning Linux internals.
              </p>
              <ul className={`font-monorama text-xs space-y-1 text-left ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>✓ Rolling release</li>
                <li>✓ AUR access</li>
                <li>✓ Lightweight</li>
              </ul>
            </div>
          </OSBentoCard>

          {/* Learning Path - Tall Card */}
          <OSBentoCard size="tall" delay={0.15}>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <FaBook className={`text-3xl ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <h3 className={`font-lexa text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Learning Path
                </h3>
              </div>
              <div className="space-y-3 flex-grow">
                {[
                  { title: 'OS Development', desc: 'OSDev.org, Bootloaders' },
                  { title: 'Kernel Programming', desc: 'Linux Kernel, Memory' },
                  { title: 'System Programming', desc: 'C/C++, Assembly, POSIX' },
                  { title: 'Low-Level Debugging', desc: 'GDB, QEMU, Valgrind' },
                ].map((item, i) => (
                  <div key={i} className={`p-2 md:p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/60'}`}>
                    <p className={`font-monorama font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </p>
                    <p className={`font-monorama text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </OSBentoCard>

          {/* Terminal Mastery */}
          <OSBentoCard size="medium" delay={0.2}>
            <div className="flex flex-col items-center text-center h-full">
              <FaTerminal className={`text-4xl mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`font-lexa text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Terminal Mastery
              </h3>
              <p className={`font-monorama text-xs md:text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Living in the terminal, mastering shell scripting.
              </p>
              <div className="flex gap-3 mt-auto">
                <SiGnubash className={`text-2xl md:text-3xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <SiVim className={`text-2xl md:text-3xl ${isDark ? 'text-green-500' : 'text-green-600'}`} />
                <SiGit className={`text-2xl md:text-3xl ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
            </div>
          </OSBentoCard>

          {/* Current OS Projects - Wide Card */}
          <OSBentoCard size="wide" delay={0.25}>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <FaCode className={`text-3xl ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <h3 className={`font-lexa text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Current OS Projects
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {[
                  { title: 'Bootloader', desc: 'Custom bootloader in Assembly' },
                  { title: 'Kernel Modules', desc: 'Linux kernel module development' },
                  { title: 'Shell Implementation', desc: 'Unix shell from scratch in C' },
                ].map((project, i) => (
                  <div key={i} className={`p-3 md:p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/60'}`}>
                    <h4 className={`font-monorama font-bold text-sm mb-1 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                      {project.title}
                    </h4>
                    <p className={`font-monorama text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </OSBentoCard>

          {/* System Architecture */}
          <OSBentoCard size="medium" delay={0.3}>
            <div className="flex flex-col items-center text-center h-full">
              <FaCog className={`text-4xl mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`font-lexa text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                System Architecture
              </h3>
              <p className={`font-monorama text-xs md:text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Understanding computer architecture and hardware-software interfaces.
              </p>
              <div className={`mt-auto p-2 md:p-3 rounded-lg w-full ${isDark ? 'bg-purple-900/40' : 'bg-purple-100/60'}`}>
                <p className={`font-monorama text-xs ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>
                  CPU → Memory → Storage → I/O
                </p>
              </div>
            </div>
          </OSBentoCard>

          {/* My OS Vision - Large Card */}
          <OSBentoCard size="large" delay={0.35}>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <FaRocket className={`text-3xl md:text-4xl ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <h3 className={`font-lexa text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  My OS Vision
                </h3>
              </div>
              <p className={`font-monorama text-xs md:text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Creating a microkernel-based OS that emphasizes:
              </p>
              <ul className={`font-monorama space-y-2 text-sm flex-grow ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {[
                  'Modularity and minimal kernel footprint',
                  'Security through isolation',
                  'Modern hardware support',
                  'Developer-friendly tooling',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isDark ? 'bg-red-400' : 'bg-red-600'}`}></span>
                    <span className="text-xs md:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-3 p-3 rounded-xl ${isDark ? 'bg-red-900/30 border border-red-500/30' : 'bg-red-100/60 border border-red-300/50'}`}>
                <p className={`font-monorama text-xs italic ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                  "Every great OS started as a hobby project. This is mine."
                </p>
              </div>
            </div>
          </OSBentoCard>
        </div>
      </div>
    </div>
  );
};

export default OSJourney;
