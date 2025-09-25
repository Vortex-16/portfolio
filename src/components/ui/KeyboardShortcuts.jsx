import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  const shortcuts = [
    { key: '?', description: 'Show/hide this help' },
    { key: 'Alt + A', description: 'Toggle accessibility tools' },
    { key: 'Ctrl + Shift + P', description: 'Toggle performance monitor (dev)' },
    { key: 'T', description: 'Toggle theme' },
    { key: '1-4', description: 'Navigate to sections (Home, About, Projects, Contact)' },
    { key: 'Esc', description: 'Close dialogs' },
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Add safety checks for e.key and e.target
      if (!e || !e.key || !e.target) return;
      
      if (e.key === '?') {
        e.preventDefault();
        setIsVisible(!isVisible);
      } else if (e.key === 'Escape') {
        setIsVisible(false);
      } else if (!isNaN(e.key) && e.key >= '1' && e.key <= '4') {
        // Quick navigation
        const sections = ['home', 'about', 'projects', 'contact'];
        const sectionIndex = parseInt(e.key) - 1;
        const element = document.getElementById(sections[sectionIndex]);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key && e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey) {
        // Toggle theme (only if not in input field)
        if (e.target && e.target.tagName && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
          const themeToggle = document.querySelector('[data-theme-toggle]');
          if (themeToggle) {
            themeToggle.click();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            className={`max-w-md w-full rounded-xl border p-6 ${
              isDark 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Keyboard Shortcuts</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close shortcuts help"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between">
                  <kbd className={`px-2 py-1 rounded text-xs font-mono ${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}>
                    {shortcut.key}
                  </kbd>
                  <span className="text-sm ml-3 flex-1">{shortcut.description}</span>
                </div>
              ))}
            </div>

            <div className={`mt-4 pt-4 border-t text-xs ${
              isDark ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}>
              Press <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700">?</kbd> again to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
