import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

export const LiquidGlassCard = ({ 
  children, 
  className = '', 
  variant = 'default', // 'default', 'slanted', 'cutcorner', 'hexagon'
  animationDelay = 0 
}) => {
  const { isDark } = useTheme();
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Scroll animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: animationDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Mouse move effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });

      // Subtle tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const rotateX = ((mouseY - centerY) / centerY) * 5;
      const rotateY = ((centerX - mouseX) / centerX) * 5;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      // Glow effect
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.6,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationDelay]);

  // Get shape class based on variant
  const getShapeClass = () => {
    const shapes = {
      default: '',
      slanted: 'clip-slanted',
      cutcorner: 'clip-cutcorner',
      hexagon: 'clip-hexagon',
    };
    return shapes[variant] || '';
  };

  return (
    <div
      ref={cardRef}
      className={`
        liquid-glass-card
        relative overflow-hidden
        ${getShapeClass()}
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Liquid Glass Background */}
      <div 
        className={`
          absolute inset-0 
          backdrop-blur-xl
          ${isDark 
            ? 'bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-violet-900/20' 
            : 'bg-gradient-to-br from-emerald-100/40 via-emerald-200/30 to-teal-100/40'
          }
          border
          ${isDark ? 'border-purple-500/20' : 'border-emerald-400/30'}
        `}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(88, 28, 135, 0.05) 50%, rgba(168, 85, 247, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(20, 184, 166, 0.15) 100%)',
        }}
      />

      {/* Moving gradient glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${
            isDark 
              ? 'rgba(168, 85, 247, 0.4)' 
              : 'rgba(5, 150, 105, 0.4)'
          } 0%, transparent 50%)`,
        }}
      />

      {/* Shimmer effect */}
      <div 
        className={`
          absolute inset-0 opacity-30
          bg-gradient-to-r 
          ${isDark 
            ? 'from-transparent via-purple-300/10 to-transparent' 
            : 'from-transparent via-emerald-300/20 to-transparent'
          }
          animate-shimmer
        `}
      />

      {/* Noise texture for glass effect */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8 flex flex-col items-center text-center">
        {children}
      </div>

      {/* Border highlight */}
      <div 
        className={`
          absolute inset-0 
          rounded-inherit
          bg-gradient-to-br 
          ${isDark 
            ? 'from-purple-400/20 via-transparent to-pink-400/20' 
            : 'from-emerald-400/30 via-transparent to-teal-400/30'
          }
          opacity-0 hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        `}
        style={{
          clipPath: 'inset(0 round inherit)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
    </div>
  );
};

export const LiquidGlassGrid = ({ children, className = '' }) => {
  return (
    <div 
      className={`grid gap-5 lg:gap-6 auto-rows-auto ${className}`}
    >
      {children}
    </div>
  );
};

// Add custom CSS for clip paths and animations
const style = document.createElement('style');
style.textContent = `
  .clip-slanted {
    clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 95%);
  }
  
  .clip-cutcorner {
    clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px));
  }
  
  .clip-hexagon {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 3s infinite;
  }

  .liquid-glass-card {
    transform-style: preserve-3d;
    will-change: transform;
  }
`;
document.head.appendChild(style);
