import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGraduationCap, FaCode, FaRocket, FaHeart } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';



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
    { icon: FaGraduationCap, label: "CSE Student", value: "2024-2028", inline: true },
    { icon: FaCode, label: "Live Projects", value: "15+" },
    { icon: FaRocket, label: "Hackathon Wins", value: "1+" },
    { icon: FaHeart, label: "Real Clients", value: "2+" },
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
    <>
      <section id="about" className="min-h-screen py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Section Header */}
            <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
              <motion.h2
                className={`font-lexa text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-emerald-950'
                  }`}
                variants={itemVariants}
              >
                About{' '}
                <span className="text-gradient bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                  Me
                </span>
              </motion.h2>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (4 cols) - Profile, Stats & Fun Facts (Sticky on PC / lg screens) */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                <motion.div className="space-y-6" variants={itemVariants}>
                  {/* Profile Image */}
                  <div className="relative">
                    <motion.div
                      className="w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 p-1 shadow-2xl"
                      whileHover={{ scale: 1.03, rotate: 1.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full h-full rounded-3xl overflow-hidden">
                        <img
                          src="https://github.com/Vortex-16.png"
                          alt="Vikash Gupta"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className={`backdrop-blur-md border rounded-2xl p-4 text-center ${isDark
                          ? 'bg-white/10 border-white/20'
                          : 'bg-emerald-900/80 border-emerald-700/40'
                          }`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, y: -3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <stat.icon className="text-2xl text-emerald-400 dark:text-purple-400 mx-auto mb-2" />
                        {stat.inline ? (
                          <div className="flex flex-col items-center">
                            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-emerald-50'}`}>{stat.label}</span>
                            <span className={`text-xs font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-200'}`}>{stat.value}</span>
                          </div>
                        ) : (
                          <>
                            <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-emerald-50'}`}>{stat.value}</div>
                            <div className={`text-xs ${isDark ? 'text-white/70' : 'text-emerald-200'}`}>{stat.label}</div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Fun Facts */}
                  <motion.div
                    className={`backdrop-blur-md border rounded-3xl p-6 ${isDark
                      ? 'bg-white/10 border-white/20'
                      : 'bg-emerald-900/80 border-emerald-700/40'
                      }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl">✨</span>
                      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-emerald-50'
                        }`}>Fun Facts About Me</h4>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { emoji: "☕", text: "Powered by coffee & curiosity" },
                        { emoji: "🌄", text: "Daylight developer" },
                        { emoji: "💻", text: "Code enthusiast" },
                        { emoji: "🏏", text: "Cricket lover" },
                        { emoji: "🎮", text: "Gamer in free time" },
                        { emoji: "🌐", text: "Avid web explorer" },
                      ].map((fact, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center gap-3 p-2.5 rounded-2xl ${isDark
                            ? 'bg-white/5'
                            : 'bg-emerald-800/30'
                            }`}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-xl">{fact.emoji}</div>
                          <p className={`text-xs sm:text-sm ${isDark ? 'text-white/80' : 'text-emerald-100'
                            }`}>{fact.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Column (8 cols) - Main Content, Education, Focus, Interests & Skills */}
              <motion.div className="lg:col-span-8 space-y-6" variants={itemVariants}>
                {/* Introduction Card */}
                <motion.div
                  className={`backdrop-blur-md border rounded-3xl p-6 md:p-8 ${isDark
                    ? 'bg-white/10 border-white/20'
                    : 'bg-emerald-900/80 border-emerald-700/40'
                    }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className={`font-lexa text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-emerald-50'
                    }`}>
                    Hello! I'm Vikash Gupta 👋
                  </h3>
                  <div className={`font-monorama space-y-3 text-sm md:text-base leading-relaxed ${isDark ? 'text-white/80' : 'text-emerald-100'
                    }`}>
                    <p>
                      Frontend developer and CSE undergrad at St. Thomas College of Engineering & Technology (2024–2028).
                      I build production-grade web applications — from AI-powered platforms to real-time competitive tools —
                      with 7+ deployed client projects and 2 hackathon recognitions under my belt.
                    </p>
                    <p>
                      My work spans React, Next.js, TypeScript, and AI integrations (RAG, LLMs, TensorFlow.js).
                      I care deeply about performance, accessibility, and pixel-perfect UI that translates
                      seamlessly across devices. Currently selected for the <strong>Web Developer</strong> position at <strong>DexMy Education</strong>.
                    </p>
                  </div>
                </motion.div>

                {/* Education & Current Focus */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Education Section */}
                  <motion.div
                    className={`backdrop-blur-md border rounded-3xl p-6 ${isDark
                      ? 'bg-white/10 border-white/20'
                      : 'bg-emerald-900/80 border-emerald-700/40'
                      }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FaGraduationCap className="text-emerald-400 dark:text-purple-400 text-2xl" />
                      <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-emerald-50'
                        }`}>Education</h4>
                    </div>
                    <div>
                      <h5 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-emerald-50'
                        }`}>Bachelor of Technology</h5>
                      <p className={`text-sm mb-1 ${isDark ? 'text-white/70' : 'text-emerald-200'
                        }`}>Computer Science & Engineering</p>
                      <p className={`text-xs sm:text-sm mb-3 ${isDark ? 'text-white/60' : 'text-emerald-300'
                        }`}>St. Thomas College of Engineering and Technology</p>
                      <div className="inline-block bg-emerald-500/20 dark:bg-purple-500/20 px-3 py-1 rounded-full">
                        <span className={`text-xs font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-100'
                          }`}>2024 - 2028</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Current Focus */}
                  <motion.div
                    className={`backdrop-blur-md border rounded-3xl p-6 ${isDark
                      ? 'bg-white/10 border-white/20'
                      : 'bg-emerald-900/80 border-emerald-700/40'
                      }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FaRocket className="text-emerald-400 dark:text-purple-400 text-2xl" />
                      <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-emerald-50'
                        }`}>Current Focus & Role</h4>
                    </div>
                    <ul className={`space-y-2.5 text-xs sm:text-sm ${isDark ? 'text-white/80' : 'text-emerald-100'
                      }`}>
                      <li className="flex items-center gap-2.5">
                        <span className="w-2 h-2 bg-emerald-400 dark:bg-purple-400 rounded-full shrink-0"></span>
                        <span><strong>Web Developer</strong> @ DexMy Education</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-2 h-2 bg-emerald-400 dark:bg-purple-400 rounded-full shrink-0"></span>
                        MERN-stack & NEXT JS
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-2 h-2 bg-emerald-400 dark:bg-purple-400 rounded-full shrink-0"></span>
                        Data Structures & Algorithms
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-2 h-2 bg-emerald-400 dark:bg-purple-400 rounded-full shrink-0"></span>
                        Open-source contributions
                      </li>
                    </ul>
                  </motion.div>
                </div>

                {/* Interests Section */}
                <motion.div
                  className={`backdrop-blur-md border rounded-3xl p-6 ${isDark
                    ? 'bg-white/10 border-white/20'
                    : 'bg-emerald-900/80 border-emerald-700/40'
                    }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FaHeart className="text-emerald-400 dark:text-purple-400 text-2xl" />
                    <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-emerald-50'
                      }`}>Interests & Technologies</h4>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {interests.map((interest, index) => (
                      <motion.span
                        key={index}
                        className={`px-3.5 py-1.5 backdrop-blur-md border rounded-full text-xs font-medium ${isDark
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-emerald-800/50 border-emerald-600/40 text-emerald-100'
                          }`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                  className={`backdrop-blur-md border rounded-3xl p-6 md:p-8 ${isDark
                    ? 'bg-white/10 border-white/20'
                    : 'bg-emerald-900/80 border-emerald-700/40'
                    }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <FaCode className="text-emerald-400 dark:text-purple-400 text-2xl" />
                    <h4 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-emerald-50'
                      }`}>Skills & Proficiency</h4>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: 'JavaScript (ES6+)', level: 88 },
                      { name: 'React / Next.js', level: 85 },
                      { name: 'TypeScript', level: 75 },
                      { name: 'HTML5 / CSS3', level: 92 },
                      { name: 'Tailwind CSS', level: 88 },
                      { name: 'Node.js / Express.js', level: 74 },
                      { name: 'MongoDB', level: 72 },
                      { name: 'Firebase', level: 80 },
                      { name: 'GCP', level: 71 },
                      { name: 'REST APIs / Git', level: 82 },
                      { name: 'C / Python', level: 72 },
                      { name: 'GSAP / Framer Motion', level: 78 },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className={`p-3.5 rounded-xl border ${isDark
                          ? 'bg-white/5 border-white/10'
                          : 'bg-emerald-800/30 border-emerald-600/30'
                          }`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-emerald-50'
                            }`}>{skill.name}</span>
                          <span className={`text-xs font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-200'
                            }`}>{skill.level}%</span>
                        </div>
                        <div className={`w-full rounded-full h-2.5 ${isDark ? 'bg-white/10' : 'bg-emerald-700/30'
                          }`}>
                          <motion.div
                            className="bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-purple-400 dark:to-purple-600 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 1 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
