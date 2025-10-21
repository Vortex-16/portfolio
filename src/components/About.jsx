import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaCode, FaRocket, FaHeart } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

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

  const stats = [
    { icon: FaGraduationCap, label: "CSE Student", value: "2024-2028" },
    { icon: FaCode, label: "Projects", value: "25+" },
    { icon: FaRocket, label: "Technologies", value: "8+" },
    { icon: FaHeart, label: "Coffee Cups", value: "∞" },
  ];

  const interests = [
    "Web Development",
    "React & JavaScript",
    "Algorithm Design",
    "Open Source",
    "Competitive Programming",
    "Mobile OS Development",
  ];

  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
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
              About{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                Me
              </span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Side - Profile Image */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              {/* Profile Image */}
              <div className="relative mb-8">
                <motion.div
                  className="w-72 h-72 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 p-1 shadow-2xl"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <img 
                      src="/PofileNew.jpeg" 
                      alt="Vikash Gupta" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`backdrop-blur-md border rounded-2xl p-6 text-center ${
                      isDark 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-emerald-900/80 border-emerald-700/40'
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <stat.icon className="text-3xl text-emerald-400 dark:text-purple-400 mx-auto mb-3" />
                    <div className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-emerald-50'
                    }`}>{stat.value}</div>
                    <div className={`text-sm ${
                      isDark ? 'text-white/70' : 'text-emerald-200'
                    }`}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Fun Facts */}
              <motion.div 
                className={`backdrop-blur-md border rounded-3xl p-6 ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-emerald-900/80 border-emerald-700/40'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">✨</span>
                  <h4 className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-emerald-50'
                  }`}>Fun Facts About Me</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { emoji: "☕", text: "Powered by coffee and curiosity" },
                    { emoji: "🌄", text: "Daylight developer" },
                    { emoji: "💻", text: "Code enthusiast" },
                    { emoji: "📚", text: "Lifelong learner" },
                    { emoji: "🎮", text: "Gamer in free time" },
                  ].map((fact, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-full ${
                        isDark 
                          ? 'bg-white/5' 
                          : 'bg-emerald-800/30'
                      }`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl">{fact.emoji}</div>
                      <p className={`text-sm ${
                        isDark ? 'text-white/80' : 'text-emerald-100'
                      }`}>{fact.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - About Content */}
            <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
              {/* Introduction Card */}
              <motion.div 
                className={`backdrop-blur-md border rounded-3xl p-8 ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-emerald-900/80 border-emerald-700/40'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className={`text-3xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-emerald-50'
                }`}>
                  Hello! I'm Vikash Gupta 👋
                </h3>
                <div className={`space-y-4 text-lg leading-relaxed ${
                  isDark ? 'text-white/80' : 'text-emerald-100'
                }`}>
                  <p>
                    I'm a passionate Computer Science & Engineering student at St. Thomas College of Engineering and Technology (2024-2028), 
                    with a love for creating innovative solutions through code. My journey in tech started with curiosity 
                    and has evolved into a deep passion for web development and software engineering.
                  </p>
                  <p>
                    Currently in my academic journey, I spend my time learning cutting-edge technologies, 
                    building projects, and exploring the endless possibilities that programming offers. 
                    I believe in writing clean, efficient code and creating user experiences that make a difference.
                  </p>
                </div>
              </motion.div>

              {/* Education & Focus Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Education Section */}
                <motion.div 
                  className={`backdrop-blur-md border rounded-3xl p-6 ${
                    isDark 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-emerald-900/80 border-emerald-700/40'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FaGraduationCap className="text-emerald-400 dark:text-purple-400 text-2xl" />
                    <h4 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-emerald-50'
                    }`}>Education</h4>
                  </div>
                  <div>
                    <h5 className={`font-semibold mb-1 ${
                      isDark ? 'text-white' : 'text-emerald-50'
                    }`}>Bachelor of Technology</h5>
                    <p className={`text-sm mb-1 ${
                      isDark ? 'text-white/70' : 'text-emerald-200'
                    }`}>Computer Science & Engineering</p>
                    <p className={`text-sm mb-2 ${
                      isDark ? 'text-white/60' : 'text-emerald-300'
                    }`}>St. Thomas College of Engineering and Technology</p>
                    <div className="inline-block bg-emerald-500/20 dark:bg-purple-500/20 px-3 py-1 rounded-full">
                      <span className={`text-xs font-medium ${
                        isDark ? 'text-emerald-300' : 'text-emerald-100'
                      }`}>2024 - 2028</span>
                    </div>
                  </div>
                </motion.div>

                {/* Current Focus */}
                <motion.div 
                  className={`backdrop-blur-md border rounded-3xl p-6 ${
                    isDark 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-emerald-900/80 border-emerald-700/40'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FaRocket className="text-emerald-400 dark:text-purple-400 text-2xl" />
                    <h4 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-emerald-50'
                    }`}>Current Focus</h4>
                  </div>
                  <ul className={`space-y-3 ${
                    isDark ? 'text-white/80' : 'text-emerald-100'
                  }`}>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-emerald-400 dark:bg-purple-400 rounded-full"></span>
                      MERN-stack & NEXT JS
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-emerald-400 dark:bg-purple-400 rounded-full"></span>
                      Data Structures & Algorithms
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-emerald-400 dark:bg-purple-400 rounded-full"></span>
                      Open-source contributions
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Skills & Interests Grid - Two Column Layout */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Interests & Technologies - Left Side */}
                <motion.div 
                  className={`backdrop-blur-md border rounded-3xl p-6 flex flex-col ${
                    isDark 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-emerald-900/80 border-emerald-700/40'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <FaHeart className="text-emerald-400 dark:text-purple-400 text-2xl" />
                    <h4 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-emerald-50'
                    }`}>Interests & Technologies</h4>
                  </div>
                  <div className="flex flex-wrap gap-3 content-start">
                    {interests.map((interest, index) => (
                      <motion.span
                        key={index}
                        className={`px-4 py-2 backdrop-blur-md border rounded-full text-sm font-medium ${
                          isDark 
                            ? 'bg-white/10 border-white/20 text-white' 
                            : 'bg-emerald-800/50 border-emerald-600/40 text-emerald-100'
                        }`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Skills Section - Right Side */}
                <motion.div 
                  className={`lg:col-span-2 backdrop-blur-md border rounded-3xl p-8 ${
                    isDark 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-emerald-900/80 border-emerald-700/40'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <FaCode className="text-emerald-400 dark:text-purple-400 text-2xl" />
                    <h4 className={`text-2xl font-semibold ${
                      isDark ? 'text-white' : 'text-emerald-50'
                    }`}>Skills & Proficiency</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { name: 'JavaScript', level: 85, icon: '🟨' },
                      { name: 'React', level: 80, icon: '⚛️' },
                      { name: 'HTML/CSS', level: 90, icon: '🎨' },
                      { name: 'Python', level: 35, icon: '🐍' },
                      { name: 'Node.js', level: 70, icon: '💚' },
                      { name: 'MongoDB', level: 65, icon: '🍃' },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className={`p-4 rounded-2xl border ${
                          isDark 
                            ? 'bg-white/5 border-white/10' 
                            : 'bg-emerald-800/30 border-emerald-600/30'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{skill.icon}</span>
                            <span className={`font-medium ${
                              isDark ? 'text-white' : 'text-emerald-50'
                            }`}>{skill.name}</span>
                          </div>
                          <span className={`text-sm font-semibold ${
                            isDark ? 'text-emerald-400' : 'text-emerald-200'
                          }`}>{skill.level}%</span>
                        </div>
                        <div className={`w-full rounded-full h-3 ${
                          isDark ? 'bg-white/10' : 'bg-emerald-700/30'
                        }`}>
                          <motion.div
                            className="bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
