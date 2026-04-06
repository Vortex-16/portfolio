import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaExclamationTriangle, FaCog, FaChartBar } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ProjectDetailsModal = ({ project, onClose }) => {
    const { isDark } = useTheme();

    if (!project) return null;

    const isFeatured = project.featured && (project.problem || project.solution || project.result);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/60"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`relative w-[95%] max-w-3xl max-h-[90vh] rounded-[2rem] overflow-x-hidden overflow-y-auto sm:overflow-hidden flex flex-col md:flex-row shadow-2xl ${isDark ? 'bg-[#121212] border border-zinc-800' : 'bg-[#151515] border border-zinc-700'}`}
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors backdrop-blur-sm"
                >
                    <FaTimes size={18} />
                </button>

                {/* Left Side: Photo & Barcode */}
                <div className="w-full md:w-[40%] flex flex-col p-4 md:p-6 bg-gradient-to-b from-orange-600 to-red-600 relative rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none min-h-[300px] md:min-h-0">
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/30 transform -translate-x-4 translate-y-4" />

                    <div className="relative z-10 w-full aspect-[3/4] md:aspect-auto md:flex-1 rounded-xl overflow-hidden mb-6 mt-4 shadow-xl border border-white/20">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"; }}
                        />
                    </div>

                    {/* Barcode Mockup */}
                    <div className="mt-auto bg-white rounded-lg p-2.5 w-full max-w-[240px] mx-auto opacity-95 hidden sm:block">
                        <div className="flex justify-between items-end h-10 gap-[2px]">
                            {[...Array(35)].map((_, i) => (
                                <div key={i} className="bg-black h-full" style={{ width: `${Math.max(1, Math.random() * 4)}px` }} />
                            ))}
                        </div>
                        <div className="text-center font-mono text-[9px] mt-1 text-black tracking-widest font-bold">
                            {project.id ? String(project.id).toUpperCase() : '0417-4389234'}
                        </div>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-[60%] p-6 sm:p-8 flex flex-col justify-between text-white relative">
                    {/* Top Right Logo */}
                    <div className="absolute top-6 right-6 hidden sm:flex flex-col items-center opacity-80">
                        <div className="w-12 h-10 border-2 border-white flex items-center justify-center rounded-md mb-1">
                            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M12 2L2 22h20L12 2z" />
                                <circle cx="12" cy="14" r="3" fill="#151515" />
                            </svg>
                        </div>
                        <span className="font-lexa text-[10px] tracking-widest font-bold text-orange-400">PROJECT</span>
                        <span className="font-lexa text-[10px] tracking-widest font-bold">CLUB</span>
                    </div>

                    <div className="mt-2 sm:mt-10 sm:pr-16 overflow-y-auto" style={{ maxHeight: '55vh', scrollbarWidth: 'none' }}>
                        {/* Title */}
                        <div className="mb-4">
                            <span className="text-[10px] sm:text-xs font-monorama font-bold tracking-widest text-zinc-400 uppercase block mb-1">PROJECT</span>
                            <h2 className="font-lexa text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-white mb-1">
                                {project.title}
                            </h2>
                            <span className="inline-block font-lexa text-sm font-bold tracking-wider text-orange-400 uppercase">
                                {project.category ? String(project.category).toUpperCase() : 'UNKNOWN'}
                            </span>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-4">
                            <span className="text-[10px] sm:text-xs font-monorama font-bold tracking-widest text-zinc-400 uppercase block mb-2">Tech Stack</span>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack?.map((tech) => (
                                    <span key={tech} className="px-3 py-1 text-xs font-medium rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300">{tech}</span>
                                ))}
                            </div>
                        </div>

                        {/* ── Case Study Section (featured projects) ── */}
                        {isFeatured ? (
                            <div className="space-y-4 border-t border-zinc-800 pt-4">
                                {/* Problem */}
                                {project.problem && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <FaExclamationTriangle size={11} className="text-red-400" />
                                            <span className="text-[10px] font-monorama font-bold tracking-widest text-zinc-400 uppercase">Problem</span>
                                        </div>
                                        <p className="text-xs font-sans text-zinc-300 leading-relaxed">{project.problem}</p>
                                    </div>
                                )}

                                {/* Solution */}
                                {project.solution && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <FaCog size={11} className="text-blue-400" />
                                            <span className="text-[10px] font-monorama font-bold tracking-widest text-zinc-400 uppercase">Solution</span>
                                        </div>
                                        <p className="text-xs font-sans text-zinc-300 leading-relaxed">{project.solution}</p>
                                    </div>
                                )}

                                {/* Result */}
                                {project.result && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <FaChartBar size={11} className="text-green-400" />
                                            <span className="text-[10px] font-monorama font-bold tracking-widest text-zinc-400 uppercase">Result</span>
                                        </div>
                                        <p className="text-xs font-sans text-zinc-300 leading-relaxed">{project.result}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Fallback: description for non-featured */
                            <div className="mb-4">
                                <span className="text-[10px] sm:text-xs font-monorama font-bold tracking-widest text-zinc-400 uppercase block mb-2">Description</span>
                                <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed max-w-md">
                                    {project.description || "No description provided for this project."}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer: Links / Signature */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800 pt-5 shrink-0">
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-orange-500 hover:text-white transition-colors active:scale-95"
                                >
                                    <FaGithub size={16} /> Code
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-white hover:text-black transition-colors active:scale-95"
                                >
                                    <FaExternalLinkAlt size={14} /> Demo
                                </a>
                            )}
                        </div>

                        {/* Signature */}
                        <div className="hidden sm:flex flex-col items-center">
                            <span className="text-[10px] font-monorama font-bold tracking-widest text-zinc-500 uppercase mb-1">Authorization</span>
                            <div
                                className="font-['Stalemate',cursive,serif] text-3xl sm:text-4xl transform -rotate-6 text-white/90"
                                style={{ fontFamily: 'var(--font-primary, cursive)' }}
                            >
                                Vikash
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

export default ProjectDetailsModal;
