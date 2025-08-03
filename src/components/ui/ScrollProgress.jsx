import { motion, useScroll } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const { isDark } = useTheme();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        background: isDark 
          ? 'linear-gradient(90deg, #a855f7, #ec4899, #f59e0b)'
          : 'linear-gradient(90deg, #059669, #0891b2, #7c3aed)',
        scaleX: scrollYProgress
      }}
    />
  );
};

export default ScrollProgress;
