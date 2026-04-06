import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { projects, filters } from '../data/projects';
import ProjectCard from './ui/ProjectCard';
import ProjectDetailsModal from './ui/ProjectDetailsModal';
import CodeBattleDemo from './ui/CodeBattleDemo';
import DevTrackDemo from './ui/DevTrackDemo';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaBolt, FaCode, FaRocket } from 'react-icons/fa';

const codeBattleProject = projects.find((p) => p.demoType === 'codebattle');
const devTrackProject = projects.find((p) => p.demoType === 'devtrack');

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBattle, setShowBattle] = useState(false);
  const [showDevTrack, setShowDevTrack] = useState(false);
  const { isDark } = useTheme();
  const gridRef = useScrollReveal();

  const filteredProjects = (activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter)
  ).filter((p) => !p.demoType); // exclude the battle card from the grid

  return (
    <section className="min-h-screen py-24 relative z-10 overflow-hidden">


      <div className="container mx-auto px-6 lg:px-20 relative z-20">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-lexa text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Selected{' '}
            <span className={`${isDark ? 'bg-gradient-to-r from-indigo-400 to-purple-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600'} bg-clip-text text-transparent`}>
              Works
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-monorama text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            A curated list of projects, experiments, and contributions.
          </motion.p>
        </div>

        {/* ── CodeBattle Featured Hero ── */}
        {codeBattleProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <div className={`rounded-2xl p-5 sm:p-6 border ${isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-gray-950 border-white/5'}`}>
              {/* Featured label */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <FaBolt className="text-yellow-400" size={14} />
                  <span className="font-mono text-xs text-yellow-400 font-bold tracking-widest uppercase">Featured Interactive Demo</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBattle(!showBattle)}
                    id="toggle-battle-demo"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all active:scale-95 ${showBattle ? 'bg-white/10 text-white' : 'bg-green-500 hover:bg-green-400 text-black'}`}
                  >
                    <FaCode size={11} />
                    {showBattle ? 'Hide Demo' : 'Launch Arena'}
                  </button>
                  <button
                    onClick={() => setSelectedProject(codeBattleProject)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all active:scale-95 border ${isDark ? 'border-white/15 text-gray-400 hover:text-white' : 'border-white/10 text-gray-400 hover:text-white'}`}
                  >
                    Case Study
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-lexa text-xl font-bold text-white mb-1">{codeBattleProject.title}</h3>
                <p className="font-mono text-xs text-gray-500">{codeBattleProject.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {codeBattleProject.techStack.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {showBattle && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <CodeBattleDemo />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── DevTrack Featured Hero ── */}
        {devTrackProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-14"
          >
            <div className={`rounded-2xl p-5 sm:p-6 border ${isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-gray-950 border-white/5'}`}>
              {/* Featured label */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <FaRocket className="text-indigo-400" size={14} />
                  <span className="font-mono text-xs text-indigo-400 font-bold tracking-widest uppercase">Hackathon Best Innovative Project</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDevTrack(!showDevTrack)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all active:scale-95 ${showDevTrack ? 'bg-white/10 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                  >
                    <FaCode size={11} />
                    {showDevTrack ? 'Hide Tracker' : 'Open Intelligence'}
                  </button>
                  <button
                    onClick={() => setSelectedProject(devTrackProject)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all active:scale-95 border ${isDark ? 'border-white/15 text-gray-400 hover:text-white' : 'border-white/10 text-gray-400 hover:text-white'}`}
                  >
                    Case Study
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-lexa text-xl font-bold text-white mb-1">{devTrackProject.title}</h3>
                <p className="font-mono text-xs text-gray-500">{devTrackProject.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {devTrackProject.techStack.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {showDevTrack && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <DevTrackDemo />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}


        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeFilter === filter ? 'text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
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

        {/* Project Grid */}
        <div ref={gridRef}>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="scroll-reveal" style={{ transitionDelay: `${(index % 3) * 0.07}s` }}>
                  <ProjectCard
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className={`text-xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No projects found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
