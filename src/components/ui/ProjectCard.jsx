import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group flex flex-col bg-emerald-50 dark:bg-[#171717] border border-emerald-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-xl hover:border-emerald-200 dark:hover:border-arch-blue transition-all duration-300"
        >
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-video">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"; // Fallback
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
            <div className="flex-1 p-5 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold tracking-wide text-emerald-600 dark:text-arch-blue uppercase">
                        {project.category}
                    </span>
                    <div className="flex items-center gap-3 text-emerald-800/60 dark:text-gray-400 text-xs">
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

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-arch-blue transition-colors">
                    {project.title}
                </h3>

                <p className="text-emerald-800 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {project.description || "No description provided."}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack?.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-[10px] font-medium bg-emerald-100/50 dark:bg-zinc-800 text-emerald-800 dark:text-gray-300 rounded border border-emerald-200 dark:border-zinc-700"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack?.length > 3 && (
                        <span className="px-2 py-1 text-[10px] font-medium bg-emerald-100/50 dark:bg-zinc-800 text-emerald-700/70 dark:text-gray-500 rounded border border-emerald-200 dark:border-zinc-700">
                            +{project.techStack.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
