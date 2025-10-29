import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../hooks/useTheme';
import { LiquidGlassGrid, LiquidGlassCard } from './ui/LiquidGlassCard';
import { FaCode, FaGraduationCap, FaLinux, FaRocket } from 'react-icons/fa';

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
      <div className="flex-1 flex items-center justify-center py-12 lg:py-0 mt-32 lg:mt-24">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 lg:pl-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div ref={titleRef} className="space-y-5 lg:space-y-6 order-2 lg:order-1">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Hi<br />
                <span className="font-bold">it's Vikash</span>
              </h1>
              
              <p className={`text-sm sm:text-base lg:text-base leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Passionate about building innovative web applications and exploring the depths of operating systems. <br />
                Currently learning with EndeavourOS to understand Linux internals and working towards creating my own OS.
              </p>

              <div className="pt-2">
                <Link 
                  to="/about"
                  className={`inline-block px-8 py-3 text-white font-medium rounded-full text-sm transition-all duration-300 ${
                    isDark 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  About Me
                </Link>
              </div>

              <div ref={subtitleRef} className="flex flex-wrap gap-3 pt-3">
                <span className={`px-5 py-2 text-white font-medium rounded text-sm ${
                  isDark ? 'bg-purple-600' : 'bg-orange-500'
                }`}>
                  c
                </span>
                <span className={`px-5 py-2 text-white font-medium rounded text-sm ${
                  isDark ? 'bg-purple-600' : 'bg-orange-500'
                }`}>
                  java
                </span>
                <span className={`px-5 py-2 font-medium rounded text-sm ${
                  isDark 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-800 text-white'
                }`}>
                  javascript
                </span>
                <span className={`px-5 py-2 font-medium rounded text-sm ${
                  isDark 
                    ? 'bg-gray-200 text-gray-900' 
                    : 'bg-gray-200 text-gray-900'
                }`}>
                  python
                </span>
              </div>
            </div>

            <div ref={profileRef} className="relative flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px]">
                <div className="relative z-10 w-full h-full">
                  <img 
                    src="/PofileNew.jpeg" 
                    alt="Vikash Gupta - Profile photo" 
                    className="w-full h-full rounded-full object-cover shadow-2xl"
                  />
                  
                  <div className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-5 lg:left-5 px-4 py-3 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl ${
                    isDark ? 'bg-gray-900' : 'bg-gray-900'
                  }`}>
                    <div className="text-white text-2xl sm:text-3xl font-bold leading-tight">3+</div>
                    <div className="text-gray-400 text-xs sm:text-sm">years experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-20 px-6 lg:px-12 lg:pl-24 mt-12 lg:mt-20">
        <div className="container mx-auto max-w-7xl">
        
          <LiquidGlassGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            <LiquidGlassCard variant="cutcorner" animationDelay={0}>
              <FaCode className={`text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Full Stack Developer
              </h3>
              <p className={`text-sm lg:text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Building modern web applications with React, Node.js, and cutting-edge technologies
              </p>
              <Link 
                to="/projects" 
                className={`mt-3 lg:mt-4 inline-flex items-center gap-2 text-sm font-semibold group ${
                  isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
                }`}
              >
                View Projects 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </LiquidGlassCard>

            <LiquidGlassCard variant="slanted" animationDelay={0.1}>
              <FaGraduationCap className={`text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                CSE Student
              </h3>
              <p className={`text-sm lg:text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Studying Computer Science at STCET, learning algorithms, data structures, and system design
              </p>
              <Link 
                to="/about" 
                className={`mt-3 lg:mt-4 inline-flex items-center gap-2 text-sm font-semibold group ${
                  isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Learn More 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </LiquidGlassCard>

            <LiquidGlassCard variant="default" animationDelay={0.2}>
              <FaLinux className={`text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                OS Enthusiast
              </h3>
              <p className={`text-sm lg:text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Exploring operating systems with EndeavourOS, learning Linux internals, and building my own OS
              </p>
              <Link 
                to="/os-journey" 
                className={`mt-3 lg:mt-4 inline-flex items-center gap-2 text-sm font-semibold group ${
                  isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                }`}
              >
                My OS Journey 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </LiquidGlassCard>

            <LiquidGlassCard variant="cutcorner" animationDelay={0.3}>
              <FaRocket className={`text-4xl lg:text-5xl mb-3 lg:mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Let's Connect
              </h3>
              <p className={`text-sm lg:text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Interested in collaborating? Let's work together on exciting projects and innovative ideas
              </p>
              <Link 
                to="/contact" 
                className={`mt-3 lg:mt-4 inline-flex items-center gap-2 text-sm font-semibold group ${
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