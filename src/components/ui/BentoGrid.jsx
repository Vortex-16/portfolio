import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

export const BentoGrid = ({ children, className = '' }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Animate grid items on scroll
    const items = grid.querySelectorAll('.bento-item');
    
    gsap.fromTo(
      items,
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
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children]);

  return (
    <div 
      ref={gridRef}
      className={`grid gap-4 md:gap-6 auto-rows-auto ${className}`}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ 
  children, 
  className = '', 
  size = 'medium',
  animationDelay = 0,
  hover = true 
}) => {
  const { isDark } = useTheme();
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !hover) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

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
  }, [hover]);

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2',
    tall: 'col-span-1 md:col-span-1 row-span-2',
    wide: 'col-span-1 md:col-span-3 row-span-1',
  };

  return (
    <div
      ref={cardRef}
      className={`
        bento-item
        ${sizeClasses[size]}
        ${isDark 
          ? 'bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-fuchsia-900/30 border-purple-500/20' 
          : 'bg-gradient-to-br from-white/80 via-emerald-50/50 to-emerald-100/80 border-emerald-200/50'
        }
        backdrop-blur-xl
        border
        rounded-2xl
        p-6
        transition-all
        duration-300
        ${hover ? 'hover:shadow-2xl cursor-pointer' : ''}
        ${className}
      `}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

export const BentoTitle = ({ children, className = '' }) => {
  const { isDark } = useTheme();
  
  return (
    <h3 className={`
      text-2xl md:text-3xl font-bold mb-4
      ${isDark ? 'text-white' : 'text-gray-900'}
      ${className}
    `}>
      {children}
    </h3>
  );
};

export const BentoDescription = ({ children, className = '' }) => {
  const { isDark } = useTheme();
  
  return (
    <p className={`
      text-sm md:text-base
      ${isDark ? 'text-gray-300' : 'text-gray-700'}
      ${className}
    `}>
      {children}
    </p>
  );
};

export default BentoGrid;
