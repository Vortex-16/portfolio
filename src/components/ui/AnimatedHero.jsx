import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const AnimatedHero = () => {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set will-change for better performance
      gsap.set('.profile-image', { willChange: 'transform, opacity' });
      gsap.set(titleRef.current, { willChange: 'transform, opacity' });
      gsap.set(subtitleRef.current, { willChange: 'transform, opacity' });
      gsap.set(ctaRef.current, { willChange: 'transform, opacity' });

      // Animate profile image
      gsap.fromTo('.profile-image', 
        { 
          opacity: 0,
          scale: 0.5,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.4)",
          delay: 0.2
        }
      );

      // Title animation
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { 
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 1.2
        }
      );

      // Description animation
      gsap.fromTo('.hero-description',
        { 
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 1.5
        }
      );

      // CTA button animation
      gsap.fromTo(ctaRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 3
        }
      );

      // Floating particles animation
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, index) => {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          });

          gsap.to(particle, {
            y: "-=50",
            x: "+=30",
            rotation: 360,
            duration: 4 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          });
        });
      }

      // Parallax scroll effect
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCTAClick = () => {
    const projectsSection = document.getElementById('about');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? 'bg-purple-400/30' : 'bg-emerald-400/40'
            }`}
            style={{
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Profile Image */}
        <div className="mb-8 profile-image flex justify-center">
          <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full p-1 shadow-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-purple-400 to-pink-600' 
              : 'bg-gradient-to-br from-emerald-400 to-emerald-600'
          }`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
              <img 
                src="/PofileNew.jpeg" 
                alt="Vikash Gupta" 
                className="w-full h-full object-cover object-center"
                onLoad={(e) => {
                  e.target.style.opacity = '1';
                }}
                onError={(e) => {
                  console.log('Image failed to load, showing fallback');
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 flex items-center justify-center text-2xl md:text-3xl font-bold text-white" style={{ display: 'none' }}>
                V
              </div>
            </div>
          </div>
        </div>

        {/* Animated Title */}
        <h1 
          ref={titleRef}
          className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' 
              : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800'
          } bg-clip-text text-transparent drop-shadow-2xl`}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '-0.02em',
            textShadow: isDark 
              ? '0 0 30px rgba(168, 85, 247, 0.4)' 
              : '0 0 30px rgba(52, 211, 153, 0.4)'
          }}
        >
          Hi, I'm Vikash Gupta
        </h1>

        {/* Animated Subtitle */}
        <div 
          ref={subtitleRef}
          className={`text-xl md:text-2xl font-medium mb-8 ${
            isDark ? 'text-purple-200' : 'text-emerald-700'
          } min-h-[2rem]`}
        >
          CSE Student & Full Stack Developer
        </div>

        {/* Description */}
        <p className={`hero-description text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-emerald-600'
        }`}>
          Passionate about creating innovative web solutions and exploring the latest technologies. 
          Currently pursuing Computer Science and Engineering while building amazing projects.
        </p>

        {/* Animated CTA Button */}
        <button
          ref={ctaRef}
          onClick={handleCTAClick}
          className={`group relative px-12 py-4 text-xl font-bold rounded-full overflow-hidden transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
              : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white'
          } shadow-2xl hover:shadow-3xl transform hover:scale-105`}
        >
          <span className="relative z-10">Explore My Work</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Floating Code Symbols */}
        <div className="absolute inset-0 pointer-events-none">
          {['<', '>', '{', '}', '/>', '()'].map((symbol, index) => (
            <div
              key={symbol}
              className={`absolute text-4xl font-mono opacity-20 ${
                isDark ? 'text-purple-400' : 'text-emerald-600'
              }`}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 40}%`,
                animation: `float 6s ease-in-out infinite ${index * 0.5}s`,
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedHero;
