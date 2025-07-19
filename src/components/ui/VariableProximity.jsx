import { motion } from 'framer-motion';

const VariableProximity = ({ 
  text = "Hi, I'm Vikash Gupta — 2nd Year CSE Student & Developer.",
  className = "",
  isDark = false
}) => {

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
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: globalIndex * 0.015,
                  duration: 0.6,
                  ease: "easeOut"
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
