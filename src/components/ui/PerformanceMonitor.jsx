import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceMonitor = ({ isDevelopment = false }) => {
  const [fps, setFps] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isDevelopment) return;

    let frames = 0;
    let lastTime = performance.now();

    const updateFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(updateFPS);
    };

    requestAnimationFrame(updateFPS);

    // Toggle visibility with Ctrl + Shift + P
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDevelopment, isVisible]);

  if (!isDevelopment) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg font-mono text-sm z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div>FPS: {fps}</div>
          <div className="text-xs mt-1 opacity-70">Ctrl+Shift+P to toggle</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PerformanceMonitor;
