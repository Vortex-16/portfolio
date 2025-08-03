import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

const ParticleField = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMouseMoving = useRef(false);

  // Generate particle data - reduced count for better performance
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() * 60 + (isDark ? 260 : 140), // Purple range for dark, green for light
    }));
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particle elements
    particles.forEach((particle, index) => {
      const element = document.createElement('div');
      element.className = 'particle absolute rounded-full pointer-events-none transition-all duration-300';
      element.style.width = `${particle.size}px`;
      element.style.height = `${particle.size}px`;
      element.style.background = `hsl(${particle.hue}, 70%, ${isDark ? '60%' : '50%'})`;
      element.style.opacity = particle.opacity;
      element.style.boxShadow = `0 0 ${particle.size * 2}px hsl(${particle.hue}, 70%, ${isDark ? '60%' : '50%'})`;
      
      container.appendChild(element);
      particlesRef.current[index] = {
        element,
        data: particle
      };
    });

    // Animate particles
    const animateParticles = () => {
      particlesRef.current.forEach(({ element, data }, index) => {
        // Update position
        data.x += data.vx;
        data.y += data.vy;

        // Bounce off edges
        if (data.x < 0 || data.x > window.innerWidth) data.vx *= -1;
        if (data.y < 0 || data.y > window.innerHeight) data.vy *= -1;

        // Mouse interaction
        if (isMouseMoving.current) {
          const dx = mouseRef.current.x - data.x;
          const dy = mouseRef.current.y - data.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            data.vx += (dx / distance) * force * 0.01;
            data.vy += (dy / distance) * force * 0.01;
            
            // Increase glow effect
            element.style.boxShadow = `0 0 ${data.size * 4}px hsl(${data.hue}, 70%, ${isDark ? '70%' : '60%'})`;
          } else {
            element.style.boxShadow = `0 0 ${data.size * 2}px hsl(${data.hue}, 70%, ${isDark ? '60%' : '50%'})`;
          }
        }

        // Apply position
        gsap.set(element, {
          x: data.x,
          y: data.y,
          rotation: index * 2
        });
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isMouseMoving.current = true;
    };

    const handleMouseLeave = () => {
      isMouseMoving.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Scroll-based animations
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        particlesRef.current.forEach(({ element }, index) => {
          gsap.set(element, {
            y: `+=${progress * 2}`,
            rotation: progress * 360 + index * 2,
            scale: 0.5 + progress * 0.5
          });
        });
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      // Clean up particles
      particlesRef.current.forEach(({ element }) => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      particlesRef.current = [];
    };
  }, [particles, isDark]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: isDark 
          ? 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)'
          : 'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.1) 100%)'
      }}
    />
  );
};

export default ParticleField;
