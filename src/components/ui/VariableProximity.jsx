import { motion } from 'framer-motion';
import { useState } from 'react';

const VariableProximity = ({ 
  text = "Hi, I'm Vikash Gupta — 2nd Year CSE Student & Developer.",
  className = "",
  isDark = false
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`relative cursor-default select-none ${className}`}
      style={{ 
        lineHeight: 1.5,
        wordSpacing: '0.2em',
        letterSpacing: '0.02em',
        textAlign: 'center',
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word'
      }}
    >
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-3 mb-1">
          {word.split('').map((char, charIndex) => {
            const globalIndex = text.substring(0, text.indexOf(word) + charIndex).length;
            const isHovered = hoveredIndex === globalIndex;
            const isNearHovered = hoveredIndex !== null && Math.abs(hoveredIndex - globalIndex) <= 2;
            
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isHovered ? 1.2 : isNearHovered ? 1.1 : 1,
                  color: isHovered 
                    ? (isDark ? '#a855f7' : '#059669')
                    : isNearHovered 
                      ? (isDark ? '#c084fc' : '#34d399')
                      : 'inherit'
                }}
                transition={{ 
                  delay: globalIndex * 0.015,
                  duration: isHovered || isNearHovered ? 0.2 : 0.6,
                  ease: "easeOut"
                }}
                onMouseEnter={() => setHoveredIndex(globalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default VariableProximity;
