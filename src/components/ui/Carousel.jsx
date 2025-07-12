import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ProjectCard = ({ project, isActive }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      className={`relative w-full max-w-md mx-auto backdrop-blur-md rounded-2xl border overflow-hidden shadow-2xl ${
        isDark 
          ? 'bg-white/10 border-white/20' 
          : 'bg-emerald-900/80 border-emerald-700/40'
      } ${isActive ? 'scale-100' : 'scale-95'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-purple-500 dark:to-purple-700">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="flex items-center justify-center h-full"
          style={{ display: project.image ? 'none' : 'flex' }}
        >
          <div className="text-6xl text-white/30">📁</div>
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-emerald-50'
        }`}>{project.title}</h3>
        <p className={`text-sm mb-4 line-clamp-3 ${
          isDark ? 'text-white/80' : 'text-emerald-200'
        }`}>{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-md ${
                isDark 
                  ? 'bg-white/20 text-white' 
                  : 'bg-emerald-800/50 text-emerald-100'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'bg-emerald-800/50 text-emerald-100 hover:bg-emerald-700/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={16} />
              <span className="text-sm">GitHub</span>
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 dark:bg-purple-500 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-purple-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt size={14} />
              <span className="text-sm">Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Carousel = ({ projects = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [projects.length, isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={isDark ? 'text-white/60' : 'text-emerald-700'}>No projects to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Carousel */}
      <div className="relative h-96">
        <AnimatePresence mode="wait">
          <ProjectCard
            key={currentIndex}
            project={projects[currentIndex]}
            isActive={true}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <motion.button
              onClick={goToPrevious}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors z-10 ${
                isDark 
                  ? 'bg-black/50 text-white hover:bg-black/70' 
                  : 'bg-emerald-900/80 text-emerald-50 hover:bg-emerald-800/90'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft size={20} />
            </motion.button>

            <motion.button
              onClick={goToNext}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors z-10 ${
                isDark 
                  ? 'bg-black/50 text-white hover:bg-black/70' 
                  : 'bg-emerald-900/80 text-emerald-50 hover:bg-emerald-800/90'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight size={20} />
            </motion.button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-emerald-500 dark:bg-purple-500'
                  : isDark 
                    ? 'bg-white/30 hover:bg-white/50' 
                    : 'bg-emerald-700/40 hover:bg-emerald-600/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      )}

      {/* Project Counter */}
      <div className={`text-center mt-4 text-sm ${
        isDark ? 'text-white/60' : 'text-emerald-700'
      }`}>
        {currentIndex + 1} of {projects.length}
      </div>
    </div>
  );
};

export default Carousel;
