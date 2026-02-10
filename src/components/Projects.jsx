import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { manualProjects, filters } from '../data/projects';
import { fetchGitHubProjects } from '../utils/github';
import ProjectCard from './ui/ProjectCard';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const githubData = await fetchGitHubProjects();
        // Merge manual projects with GitHub projects
        const allProjects = [...manualProjects, ...githubData];
        setProjects(allProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
        // Fallback to minimal manual projects if GitHub fails
        setProjects(manualProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section className="min-h-screen py-24 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-20 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-indigo-600' : 'bg-blue-400'
          }`} />
        <div className={`absolute bottom-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-purple-600' : 'bg-indigo-400'
          }`} />
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-20">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-lexa text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'
              }`}
          >
            Selected{' '}
            <span className={`${isDark
              ? 'bg-gradient-to-r from-indigo-400 to-purple-400'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600'
              } bg-clip-text text-transparent`}
            >
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-monorama text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
          >
            A curated list of my projects, experiments, and contributions.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeFilter === filter
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className={`text-xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
