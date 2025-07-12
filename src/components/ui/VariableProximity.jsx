import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VariableProximity = ({ 
  text = "Hi, I'm Vikash Gupta — 2nd Year CSE Student & Developer.",
  className = "",
  isDark = false
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getCharacterStyle = (index, char) => {
    if (!containerRef.current) return {};
    
    const charElement = containerRef.current.children[index];
    if (!charElement) return {};
    
    const rect = charElement.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const charX = rect.left - containerRect.left + rect.width / 2;
    const charY = rect.top - containerRect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - charX, 2) + 
      Math.pow(mousePosition.y - charY, 2)
    );
    
    const maxDistance = 100;
    const influence = Math.max(0, 1 - distance / maxDistance);
    
    const scale = 1 + influence * 0.5;
    const weight = 300 + influence * 600;
    const glow = influence * 20;
    
    return {
      transform: `scale(${scale})`,
      fontWeight: weight,
      textShadow: `0 0 ${glow}px ${isDark ? '#9e4bba' : '#059669'}`,
      color: influence > 0.3 ? (isDark ? '#9e4bba' : '#059669') : 'inherit',
      transition: 'all 0.1s ease-out',
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-default select-none ${className}`}
      style={{ lineHeight: 1.4 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={getCharacterStyle(index, char)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.02,
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default VariableProximity;
