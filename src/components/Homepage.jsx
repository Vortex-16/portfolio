import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../hooks/useTheme';
import { LiquidGlassGrid, LiquidGlassCard } from './ui/LiquidGlassCard';
import { FaCode, FaGraduationCap, FaLinux, FaRocket } from 'react-icons/fa';
import VantaGlobe from './ui/VantaGlobe';

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(profileRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
      });

      gsap.to(profileRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col relative overflow-hidden"
      aria-label="Home section"
    >
      {/* Vanta Globe Background */}
      <VantaGlobe />
      
      <div className="flex-1 flex items-center justify-center py-8 md:py-12 lg:py-0 mt-24 md:mt-28 lg:mt-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-12 lg:pl-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
            <div ref={titleRef} className="space-y-4 md:space-y-5 lg:space-y-6 order-2 lg:order-1">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="font-monorama font-normal">Hi</span><br />
                <span className="font-lexa font-bold">it's Vikash</span>
              </h1>
              
              <p className={`font-monorama text-sm sm:text-base lg:text-base leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Passionate about building innovative web applications and exploring the depths of operating systems. <br className="hidden md:block" />
                Currently learning with EndeavourOS to understand Linux internals and working towards creating my own OS.
              </p>

              <div className="pt-2">
                <Link 
                  to="/about"
                  className={`inline-block px-6 md:px-8 py-2.5 md:py-3 text-white font-monorama font-medium rounded-full text-sm transition-all duration-300 ${
                    isDark 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  About Me
                </Link>
              </div>

              <div ref={subtitleRef} className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-3">
                <span className={`font-monorama px-4 md:px-5 py-1.5 md:py-2 text-white font-medium rounded text-xs md:text-sm ${
                  isDark ? 'bg-purple-600' : 'bg-orange-500'
                }`}>
                  c
                </span>
                <span className={`font-monorama px-4 md:px-5 py-1.5 md:py-2 text-white font-medium rounded text-xs md:text-sm ${
                  isDark ? 'bg-purple-600' : 'bg-orange-500'
                }`}>
                  java
                </span>
                <span className={`font-monorama px-4 md:px-5 py-1.5 md:py-2 font-medium rounded text-xs md:text-sm ${
                  isDark 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-800 text-white'
                }`}>
                  javascript
                </span>
                <span className={`font-monorama px-4 md:px-5 py-1.5 md:py-2 font-medium rounded text-xs md:text-sm ${
                  isDark 
                    ? 'bg-gray-200 text-gray-900' 
                    : 'bg-gray-200 text-gray-900'
                }`}>
                  python
                </span>
              </div>
            </div>

            {/* Profile image - visible on mobile, hidden on desktop */}
            <div ref={profileRef} className="relative flex justify-center lg:hidden items-center order-1 lg:order-2">
              <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px]">
                <div className="relative z-10 w-full h-full">
                  <img 
                    src="/PofileNew.jpeg" 
                    alt="Vikash Gupta - Profile photo" 
                    className="w-full h-full rounded-full object-cover shadow-2xl"
                  />
                  
                  <div className={`absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 rounded-xl sm:rounded-2xl shadow-2xl ${
                    isDark ? 'bg-gray-900' : 'bg-gray-900'
                  }`}>
                    <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold font-monorama leading-tight">3+</div>
                    <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-monorama">years experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 lg:pl-24 mt-8 md:mt-12 lg:mt-20">
        <div className="container mx-auto max-w-7xl">
        
          <LiquidGlassGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            <LiquidGlassCard variant="cutcorner" animationDelay={0}>
              <FaCode className={`text-3xl md:text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h3 className={`font-lexa text-lg md:text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Full Stack Developer
              </h3>
              <p className={`font-monorama text-xs md:text-sm lg:text-base mb-3 md:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Building modern web applications with React, Node.js, and cutting-edge technologies
              </p>
              <Link 
                to="/projects" 
                className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold group ${
                  isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
                }`}
              >
                View Projects 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </LiquidGlassCard>

            <LiquidGlassCard variant="slanted" animationDelay={0.1}>
              <FaGraduationCap className={`text-3xl md:text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`font-lexa text-lg md:text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                CSE Student
              </h3>
              <p className={`font-monorama text-xs md:text-sm lg:text-base mb-3 md:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Studying Computer Science at STCET, learning algorithms, data structures, and system design
              </p>
              <Link 
                to="/about" 
                className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold group ${
                  isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Learn More 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </LiquidGlassCard>

            <LiquidGlassCard variant="default" animationDelay={0.2}>
              <FaLinux className={`text-3xl md:text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`font-lexa text-lg md:text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                OS Enthusiast
              </h3>
              <p className={`font-monorama text-xs md:text-sm lg:text-base mb-3 md:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Exploring operating systems with EndeavourOS, learning Linux internals, and building my own OS
              </p>
              <Link 
                to="/os-journey" 
                className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold group ${
                  isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                }`}
              >
                My OS Journey 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </LiquidGlassCard>

            <LiquidGlassCard variant="cutcorner" animationDelay={0.3}>
              <FaRocket className={`text-3xl md:text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className={`font-lexa text-lg md:text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Let's Connect
              </h3>
              <p className={`font-monorama text-xs md:text-sm lg:text-base mb-3 md:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Interested in collaborating? Let's work together on exciting projects and innovative ideas
              </p>
              <Link 
                to="/contact" 
                className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold group ${
                  isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                }`}
              >
                Get in Touch 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </LiquidGlassCard>
          </LiquidGlassGrid>
        </div>
      </div>
    </section>
  );
};

export default Homepage;