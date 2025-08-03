import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const EnhancedProjectCard = ({ project, index }) => {
  const { isDark } = useTheme();
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Card entrance animation
    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 100, 
            rotationX: 15,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'back.out(1.4)'
          }
        );
      }
    });

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Glowing border effect
      gsap.to(card.querySelector('.card-glow'), {
        opacity: 1,
        scale: 1.02,
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(card.querySelector('.card-glow'), {
        opacity: 0,
        scale: 1,
        duration: 0.3
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  const techColors = {
    'JavaScript': 'bg-yellow-500',
    'React': 'bg-blue-500',
    'Node.js': 'bg-green-500',
    'Python': 'bg-blue-600',
    'HTML': 'bg-orange-500',
    'CSS': 'bg-blue-400',
    'MongoDB': 'bg-green-600',
    'Express': 'bg-gray-600'
  };

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-pointer ${
        isDark ? 'bg-gray-900/50' : 'bg-white/50'
      } backdrop-blur-sm rounded-2xl border ${
        isDark ? 'border-gray-700/50' : 'border-gray-200/50'
      } overflow-hidden shadow-xl transition-all duration-300`}
      style={{ opacity: 0 }}
    >
      {/* Glowing border effect */}
      <div className={`card-glow absolute inset-0 rounded-2xl opacity-0 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' 
          : 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20'
      } blur-xl`} />

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div
          ref={imageRef}
          className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center"
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl opacity-50">
              📁
            </div>
          )}
        </div>
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
          {project.html_url && (
            <motion.a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-900/80 text-white rounded-full hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-xl" />
            </motion.a>
          )}
          {project.homepage && (
            <motion.a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600/80 text-white rounded-full hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExternalLinkAlt className="text-xl" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Stats */}
        <div className="flex items-start justify-between mb-3">
          <h3 className={`text-xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          } group-hover:text-transparent group-hover:bg-gradient-to-r ${
            isDark 
              ? 'group-hover:from-purple-400 group-hover:to-pink-400' 
              : 'group-hover:from-emerald-600 group-hover:to-blue-600'
          } group-hover:bg-clip-text transition-all duration-300`}>
            {project.name}
          </h3>
          
          <div className="flex items-center space-x-2 text-sm">
            {project.stargazers_count > 0 && (
              <div className={`flex items-center space-x-1 ${
                isDark ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                <FaStar className="text-xs" />
                <span>{project.stargazers_count}</span>
              </div>
            )}
            {project.forks_count > 0 && (
              <div className={`flex items-center space-x-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaCodeBranch className="text-xs" />
                <span>{project.forks_count}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm mb-4 leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {project.description || 'An amazing project built with passion and creativity.'}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.language && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${
              techColors[project.language] || 'bg-gray-500'
            }`}>
              {project.language}
            </span>
          )}
          {project.topics?.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 text-xs rounded-full ${
                isDark 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {project.html_url && (
            <motion.a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Code
            </motion.a>
          )}
          {project.homepage && (
            <motion.a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-purple-600 text-white hover:bg-purple-500'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className={`w-8 h-8 rounded-full ${
          isDark ? 'bg-purple-400' : 'bg-emerald-400'
        } animate-pulse`} />
      </div>
    </div>
  );
};

export default EnhancedProjectCard;
