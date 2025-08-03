import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityOverlay = () => {
  const [showA11yTools, setShowA11yTools] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
    }

    // Apply accessibility settings
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [fontSize, highContrast, reducedMotion]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + A to toggle accessibility tools
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setShowA11yTools(!showA11yTools);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showA11yTools]);

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Accessibility tools panel */}
      <AnimatePresence>
        {showA11yTools && (
          <motion.div
            className="fixed top-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg z-50 max-w-xs"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <h3 className="text-lg font-semibold mb-3">Accessibility Tools</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Font Size: {fontSize}%
                </label>
                <input
                  type="range"
                  min="75"
                  max="150"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                  />
                  High Contrast
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={(e) => setReducedMotion(e.target.checked)}
                  />
                  Reduce Motion
                </label>
              </div>
            </div>

            <button
              onClick={() => setShowA11yTools(false)}
              className="mt-3 w-full px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
            >
              Close (Alt+A)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityOverlay;
