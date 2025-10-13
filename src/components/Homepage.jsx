import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import VariableProximity from './ui/VariableProximity';

const Homepage = () => {
  const { isDark } = useTheme();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden z-20"
      aria-label="Home section"
    >
      {/* Main Content */}
      <div className="container mx-auto px-6 z-30 text-center relative">
        {/* Profile Image */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 p-1 shadow-2xl hover:shadow-emerald-500/25 dark:hover:shadow-purple-500/25 transition-all duration-300">
            <motion.img 
              src="/PofileNew.jpeg" 
              alt="Vikash Gupta - Profile photo" 
              className="w-full h-full rounded-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Animated Title */}
        <motion.div
          className="mb-8 px-4 md:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <VariableProximity 
            text="Hi, I'm Vikash Gupta — CSE Student at St. Thomas College of Engineering and Technology & Developer."
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-relaxed text-center max-w-7xl mx-auto ${
              isDark ? 'text-white' : 'text-emerald-950'
            }`}
            isDark={isDark}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
            isDark ? 'text-white/80' : 'text-emerald-800'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          CSE Student at St. Thomas College of Engineering and Technology, passionate about creating 
          innovative solutions and exploring the world of web development.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToProjects}
          className={`group relative z-50 px-8 py-4 backdrop-blur-md border font-semibold rounded-2xl transition-all duration-300 shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
              : 'bg-emerald-900/80 border-emerald-700/40 text-emerald-50 hover:bg-emerald-800/90'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Navigate to projects section"
        >
          <span className="flex items-center gap-3 relative z-10">
            Check My Work
            <motion.span
              className="text-xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </span>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 dark:from-purple-500/20 dark:to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          
          {/* Button ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: isDark 
                ? 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(5,150,105,0.3) 0%, transparent 70%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homepage;