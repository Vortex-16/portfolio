import React from 'react';
import { motion } from 'framer-motion';

const ProjectFilter = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeCategory === category
                            ? 'text-white'
                            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                        }`}
                >
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-gray-900 dark:bg-zinc-800 rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{category}</span>
                </button>
            ))}
        </div>
    );
};

export default ProjectFilter;
