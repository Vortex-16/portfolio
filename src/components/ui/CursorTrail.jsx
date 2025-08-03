import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const CursorTrail = () => {
  const { isDark } = useTheme();
  const trailRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Create trail elements
    const trailElements = [];
    for (let i = 0; i < 6; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.cssText = `
        position: fixed;
        width: ${12 - i * 1}px;
        height: ${12 - i * 1}px;
        border-radius: 50%;
        background: ${isDark 
          ? `hsl(${280 + i * 8}, 60%, ${50 - i * 2}%)` 
          : `hsl(${140 + i * 8}, 60%, ${45 - i * 2}%)`
        };
        pointer-events: none;
        z-index: 1000;
        opacity: ${0.4 - i * 0.04};
        mix-blend-mode: multiply;
        transform: translate(-50%, -50%);
        will-change: transform;
      `;
      document.body.appendChild(trail);
      trailElements.push(trail);
    }

    trailRef.current = trailElements;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animateTrail = () => {
      trailElements.forEach((trail, index) => {
        gsap.to(trail, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          duration: 0.2 + index * 0.02,
          ease: 'power2.out'
        });
      });
    };

    const handleMouseDown = () => {
      trailElements.forEach((trail, index) => {
        gsap.to(trail, {
          scale: 1.5,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          delay: index * 0.01
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    const animationFrame = () => {
      animateTrail();
      requestAnimationFrame(animationFrame);
    };
    animationFrame();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      trailElements.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
    };
  }, [isDark]);

  return null; // This component doesn't render anything directly
};

export default CursorTrail;
