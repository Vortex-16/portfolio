import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaDownload, FaExternalLinkAlt, FaTimes, FaExpand } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ResumeModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-5xl h-[85vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col z-10 ${
            isDark
              ? 'bg-[#12121a] border-white/10 shadow-purple-950/40'
              : 'bg-white border-gray-200 shadow-xl'
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
                <FaFilePdf />
              </div>
              <div>
                <h3 className="font-lexa font-bold text-base sm:text-lg leading-tight">
                  Vikash Gupta — Resume
                </h3>
                <span className="font-mono text-xs opacity-60">Official PDF Document</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="/Resume.pdf"
                download="Vikash_Gupta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all active:scale-95 shadow-md ${
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                }`}
              >
                <FaDownload size={12} />
                <span className="hidden sm:inline">Download</span>
              </a>

              <a
                href="https://docs.google.com/document/d/1Xn7RrHZKX-XE2g2e1c9Df8qMJktjsiaGlk6cQsd-psQ/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all active:scale-95 ${
                  isDark
                    ? 'border-white/20 text-gray-300 hover:bg-white/10 hover:text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <FaExternalLinkAlt size={11} />
                <span className="hidden sm:inline">Open Google Doc</span>
              </a>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
                aria-label="Close modal"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* Modal Body: Google Docs Live Preview Embed */}
          <div className="flex-1 w-full h-full relative bg-black/40">
            <iframe
              src="https://docs.google.com/document/d/1Xn7RrHZKX-XE2g2e1c9Df8qMJktjsiaGlk6cQsd-psQ/preview"
              title="Vikash Gupta Resume Viewer"
              className="w-full h-full border-none"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
