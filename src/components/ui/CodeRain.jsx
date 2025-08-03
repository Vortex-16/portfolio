import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const CodeRain = ({ isActive }) => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const codeSymbols = [
    '{}', '[]', '()', '<>', '/>', '&&', '||', '++', '--', '=>', 
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 
    'for', 'while', 'import', 'export', 'class', 'extends',
    'console.log', 'useState', 'useEffect', 'async', 'await',
    '0', '1', 'true', 'false', 'null', 'undefined'
  ];

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const drops = [];
    const numDrops = 25;

    // Create drops
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
      drop.style.cssText = `
        position: absolute;
        font-family: 'Courier New', monospace;
        font-size: ${Math.random() * 12 + 8}px;
        color: ${isDark ? '#8B5CF6' : '#059669'};
        opacity: ${Math.random() * 0.8 + 0.2};
        pointer-events: none;
        white-space: nowrap;
        font-weight: ${Math.random() > 0.5 ? 'bold' : 'normal'};
        text-shadow: 0 0 10px currentColor;
      `;
      
      container.appendChild(drop);
      drops.push({
        element: drop,
        x: Math.random() * window.innerWidth,
        y: -50,
        speed: Math.random() * 3 + 1,
        rotation: Math.random() * 360
      });
    }

    // Animation function
    const animate = () => {
      drops.forEach((drop) => {
        drop.y += drop.speed;
        drop.rotation += 1;
        
        // Reset when drop goes off screen
        if (drop.y > window.innerHeight + 50) {
          drop.y = -50;
          drop.x = Math.random() * window.innerWidth;
          drop.element.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        }
        
        gsap.set(drop.element, {
          x: drop.x,
          y: drop.y,
          rotation: drop.rotation
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      drops.forEach(drop => {
        if (drop.element.parentNode) {
          drop.element.parentNode.removeChild(drop.element);
        }
      });
    };
  }, [isActive, isDark]);

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-5 overflow-hidden"
      style={{ 
        background: isDark 
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))' 
          : 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.3))'
      }}
    />
  );
};

export default CodeRain;
