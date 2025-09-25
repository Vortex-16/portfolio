import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const CustomCursor = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    // Add custom cursor class to body if not touch device
    if (!isTouchDevice && document.body) {
      document.body.classList.add('custom-cursor');
    }

    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      // Check if target is an Element and has the matches method
      if (target && target.nodeType === 1 && target.matches && target.matches('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])')) {
        setIsHovering(true);
        setCursorVariant('hover');
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      // Check if target is an Element and has the matches method
      if (target && target.nodeType === 1 && target.matches && target.matches('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])')) {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);
    }

    return () => {
      if (document.body) {
        document.body.classList.remove('custom-cursor');
      }
      window.removeEventListener('resize', checkTouchDevice);
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [isTouchDevice]);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 2,
    }
  };

  // Don't render custom cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`fixed top-0 left-0 w-4 h-4 rounded-full border-2 pointer-events-none z-[9999] ${
          isDark 
            ? 'bg-purple-400/80 border-purple-300' 
            : 'bg-emerald-500/80 border-emerald-400'
        }`}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.3
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9998] ${
          isDark 
            ? 'border-purple-400/30' 
            : 'border-emerald-500/30'
        }`}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.5
        }}
      />
    </>
  );
};

export default CustomCursor;
