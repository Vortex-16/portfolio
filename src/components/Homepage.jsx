import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../hooks/useTheme';
import { BentoGrid, BentoCard, BentoTitle, BentoDescription } from './ui/BentoGrid';
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
      // Hero animations
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

      // Floating animation for profile
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
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20 px-4"
      aria-label="Home section"
    >
      {/* Hero Content */}
      <div className="container mx-auto max-w-7xl z-30 text-center mb-16">
        {/* Profile Image */}
        <div ref={profileRef} className="mb-8">
          <div className={`w-40 h-40 mx-auto rounded-full p-1 shadow-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-purple-400 to-purple-600' 
              : 'bg-gradient-to-br from-emerald-400 to-emerald-600'
          }`}>
            <img 
              src="/PofileNew.jpeg" 
              alt="Vikash Gupta - Profile photo" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-emerald-950'
          }`}
        >
          Hi, I'm <span className={`${
            isDark 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
          } bg-clip-text text-transparent`}>
            Vikash Gupta
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          CSE Student at St. Thomas College of Engineering and Technology
        </p>

        {/* Quick Info Cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-4xl mx-auto">
          <div className={`px-6 py-3 rounded-full backdrop-blur-md border ${
            isDark 
              ? 'bg-purple-500/10 border-purple-500/30' 
              : 'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            <span className={`font-semibold ${isDark ? 'text-purple-300' : 'text-emerald-700'}`}>
              💻 Full Stack Developer
            </span>
          </div>
          <div className={`px-6 py-3 rounded-full backdrop-blur-md border ${
            isDark 
              ? 'bg-blue-500/10 border-blue-500/30' 
              : 'bg-blue-500/10 border-blue-500/30'
          }`}>
            <span className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              🐧 Linux Enthusiast
            </span>
          </div>
          <div className={`px-6 py-3 rounded-full backdrop-blur-md border ${
            isDark 
              ? 'bg-pink-500/10 border-pink-500/30' 
              : 'bg-pink-500/10 border-pink-500/30'
          }`}>
            <span className={`font-semibold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>
              🚀 OS Explorer
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className={`text-base md:text-lg max-w-2xl mx-auto mb-8 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Passionate about building innovative web applications and exploring the depths of operating systems. 
          Currently learning with <span className={`font-semibold ${isDark ? 'text-purple-400' : 'text-emerald-600'}`}>EndeavourOS</span> 
          {' '}to understand Linux internals and working towards creating my own OS.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className={`p-4 rounded-xl backdrop-blur-md border ${
            isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/50 border-emerald-200/50'
          }`}>
            <div className={`text-3xl font-bold mb-1 ${
              isDark ? 'text-purple-400' : 'text-emerald-600'
            }`}>
              10+
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Projects
            </div>
          </div>
          <div className={`p-4 rounded-xl backdrop-blur-md border ${
            isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/50 border-emerald-200/50'
          }`}>
            <div className={`text-3xl font-bold mb-1 ${
              isDark ? 'text-purple-400' : 'text-emerald-600'
            }`}>
              3+
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Years Coding
            </div>
          </div>
          <div className={`p-4 rounded-xl backdrop-blur-md border ${
            isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/50 border-emerald-200/50'
          }`}>
            <div className={`text-3xl font-bold mb-1 ${
              isDark ? 'text-purple-400' : 'text-emerald-600'
            }`}>
              ∞
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Learning
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Highlights */}
      <div className="container mx-auto max-w-7xl px-4">
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <BentoCard size="medium">
            <FaCode className={`text-5xl mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <BentoTitle>Full Stack Developer</BentoTitle>
            <BentoDescription>
              Building modern web applications with React, Node.js, and cutting-edge technologies
            </BentoDescription>
            <Link 
              to="/projects" 
              className={`mt-4 inline-block text-sm font-semibold ${
                isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
              }`}
            >
              View Projects →
            </Link>
          </BentoCard>

          <BentoCard size="medium">
            <FaGraduationCap className={`text-5xl mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <BentoTitle>CSE Student</BentoTitle>
            <BentoDescription>
              Studying Computer Science at STCET, learning algorithms, data structures, and system design
            </BentoDescription>
            <Link 
              to="/about" 
              className={`mt-4 inline-block text-sm font-semibold ${
                isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              Learn More →
            </Link>
          </BentoCard>

          <BentoCard size="medium">
            <FaLinux className={`text-5xl mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <BentoTitle>OS Enthusiast</BentoTitle>
            <BentoDescription>
              Exploring operating systems with EndeavourOS, learning Linux internals, and building my own OS
            </BentoDescription>
            <Link 
              to="/os-journey" 
              className={`mt-4 inline-block text-sm font-semibold ${
                isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
              }`}
            >
              My OS Journey →
            </Link>
          </BentoCard>

          <BentoCard size="medium">
            <FaRocket className={`text-5xl mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            <BentoTitle>Let's Connect</BentoTitle>
            <BentoDescription>
              Interested in collaborating? Let's work together on exciting projects and innovative ideas
            </BentoDescription>
            <Link 
              to="/contact" 
              className={`mt-4 inline-block text-sm font-semibold ${
                isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
              }`}
            >
              Get in Touch →
            </Link>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
};

export default Homepage;