import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SwiperCarousel from './ui/SwiperCarousel';
import { fetchGitHubProjects } from '../utils/github';
import { useTheme } from '../hooks/useTheme';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const projectData = await fetchGitHubProjects();
      setProjects(projectData);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen py-20 relative z-10 mt-20">
      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2 
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-emerald-950'
              }`}
              variants={itemVariants}
            >
              Featured{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>
            <motion.p 
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? 'text-white/70' : 'text-emerald-800'
              }`}
              variants={itemVariants}
            >
              A collection of projects that showcase my skills in web development, 
              algorithms, and problem-solving. Each project represents a step in my journey 
              as a developer.
            </motion.p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-white/80">Loading projects from GitHub...</span>
              </div>
            </motion.div>
          )}

          {/* Projects Carousel */}
          {!loading && projects.length > 0 && (
            <motion.div variants={itemVariants}>
              <SwiperCarousel projects={projects} />
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && projects.length === 0 && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-white/60">Projects will be loaded from GitHub when available.</p>
            </motion.div>
          )}

          {/* GitHub Link */}
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.a
              href="https://github.com/Vortex-16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View All Projects on GitHub
            </motion.a>
          </motion.div>

          {/* Skills showcase */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Python', 
                'MongoDB', 'Express.js', 'Tailwind CSS', 'Git', 
                'VS Code', 'Firebase', 'API Integration'
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
