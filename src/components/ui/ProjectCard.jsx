import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ProjectCard = ({ project, onClick }) => {
    const { isDark } = useTheme();
    const cardRef = useRef(null);

    // Smooth magnetic 3D-tilt hover (skipped when reduced-motion is requested).
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' });
        const xTo = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });

        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            xTo(px * 10);   // rotate around Y based on horizontal position
            yTo(-py * 10);  // rotate around X based on vertical position
        };
        const onEnter = () => gsap.to(el, { scale: 1.02, duration: 0.4, ease: 'power3.out' });
        const onLeave = () => {
            xTo(0);
            yTo(0);
            gsap.to(el, { scale: 1, duration: 0.5, ease: 'power3.out' });
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className="group flex flex-col h-full rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
            style={{
                backgroundColor: isDark ? '#0a0a0a' : '#ecfdf5',
                border: isDark ? '1px solid rgba(39,39,42,0.9)' : '1px solid #d1fae5',
                boxShadow: isDark ? '0 0 0 0 transparent' : undefined,
            }}
            whileHover={{
                boxShadow: isDark
                    ? '0 12px 40px rgba(0,0,0,0.6)'
                    : '0 12px 40px rgba(5,150,105,0.15)',
                borderColor: isDark ? 'rgba(23,147,209,0.4)' : '#6ee7b7',
            }}
        >
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-video">
                <img
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src = "/project-fallback.png";
                    }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform"
                            title="View Code"
                        >
                            <FaGithub size={20} />
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform"
                            title="Live Demo"
                        >
                            <FaExternalLinkAlt size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col cursor-pointer" onClick={onClick}>
                <div className="flex justify-between items-start mb-2">
                    <span style={{ color: isDark ? '#1793d1' : '#059669' }} className="text-xs font-semibold tracking-wide uppercase">
                        {project.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs" style={{ color: isDark ? '#71717a' : '#6b7280' }}>
                        {project.stars > 0 && (
                            <span className="flex items-center gap-1">
                                <FaStar className="text-amber-400" /> {project.stars}
                            </span>
                        )}
                        {project.forks > 0 && (
                            <span className="flex items-center gap-1">
                                <FaCodeBranch /> {project.forks}
                            </span>
                        )}
                    </div>
                </div>

                <h3
                    className="text-lg font-bold mb-2 line-clamp-1 transition-colors"
                    style={{ color: isDark ? '#ffffff' : '#111827' }}
                >
                    {project.title}
                </h3>

                <p className="text-sm mb-4 line-clamp-2 min-h-[2.5rem] flex-grow" style={{ color: isDark ? '#71717a' : '#065f46' }}>
                    {project.description || "No description provided."}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto min-h-[1.75rem]">
                    {project.techStack?.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-[10px] font-medium rounded"
                            style={{
                                backgroundColor: isDark ? '#111111' : 'rgba(209,250,229,0.5)',
                                color: isDark ? '#a1a1aa' : '#065f46',
                                border: isDark ? '1px solid #1e1e1e' : '1px solid #a7f3d0',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack?.length > 3 && (
                        <span
                            className="px-2 py-1 text-[10px] font-medium rounded"
                            style={{
                                backgroundColor: isDark ? '#111111' : 'rgba(209,250,229,0.5)',
                                color: isDark ? '#52525b' : '#6ee7b7',
                                border: isDark ? '1px solid #1e1e1e' : '1px solid #a7f3d0',
                            }}
                        >
                            +{project.techStack.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
