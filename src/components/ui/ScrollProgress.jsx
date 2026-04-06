import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark } = useTheme();

  // Number of chevrons to display
  const totalChevrons = 6;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(scrollY / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center gap-1">
      {Array.from({ length: totalChevrons }).map((_, index) => {
        // Calculate at what scroll percentage this chevron should be fully revealed
        const threshold = (index + 1) / totalChevrons;
        const isActive = scrollProgress >= (index * 0.15); // Staggered entry

        // Progressively increase the stroke width and overall dimension
        const size = 14 + index * 4; // 14px up to 34px
        const strokeWidth = 1.5 + index * 0.5;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: isActive ? 1 : 0.15,
              y: isActive ? 0 : -5,
              scale: isActive ? 1 : 0.8
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: size, height: size }}
            className={`flex items-center justify-center ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-lg"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollProgress;
