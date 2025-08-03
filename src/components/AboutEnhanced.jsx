import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaCode, FaRocket, FaHeart, FaDownload } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import AnimatedSkills from './ui/AnimatedSkills';

const AboutEnhanced = () => {
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
    { icon: FaGraduationCap, label: "CSE Student", value: "2024-2028", color: "from-blue-500 to-purple-600" },
    { icon: FaCode, label: "Projects", value: "15+", color: "from-green-500 to-emerald-600" },
    { icon: FaRocket, label: "Technologies", value: "10+", color: "from-orange-500 to-red-600" },
    { icon: FaHeart, label: "Coffee Cups", value: "∞", color: "from-pink-500 to-rose-600" },
  ];

  const achievements = [
    {
      title: "Full Stack Development",
      description: "Built 15+ web applications using modern frameworks",
      icon: "🚀"
    },
    {
      title: "Problem Solving",
      description: "Solved 200+ coding challenges on various platforms",
      icon: "🧩"
    },
    {
      title: "Team Leadership",
      description: "Led multiple project teams during college",
      icon: "👥"
    },
    {
      title: "Continuous Learning",
      description: "Always exploring new technologies and frameworks",
      icon: "📚"
    }
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className={`py-20 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900/30' 
          : 'bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-emerald-200/30'
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full ${
          isDark ? 'bg-purple-500' : 'bg-emerald-500'
        } blur-3xl`} />
        <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full ${
          isDark ? 'bg-pink-500' : 'bg-blue-500'
        } blur-3xl`} />
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className={`text-5xl md:text-6xl font-black mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' 
              : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800'
          } bg-clip-text text-transparent`}>
            About Me
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-emerald-700'
          }`}>
            Passionate Computer Science student with a love for creating innovative solutions 
            and exploring cutting-edge technologies.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Personal Story */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
              isDark 
                ? 'bg-gray-900/50 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
            } shadow-xl`}>
              <h3 className={`text-3xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                My Journey 🚀
              </h3>
              <div className={`space-y-4 text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <p>
                  I'm currently pursuing my Computer Science and Engineering degree at 
                  <span className={`font-semibold ${
                    isDark ? 'text-purple-400' : 'text-emerald-600'
                  }`}> St. Thomas College of Engineering and Technology</span>. 
                  My journey in tech started with curiosity and has evolved into a passion for creating impactful solutions.
                </p>
                <p>
                  I love building full-stack applications with React and Node.js, exploring new frameworks, and solving complex problems. 
                  When I'm not coding, you'll find me learning new technologies, working on personal projects, 
                  or playing games (like the snake game hidden in this portfolio! 🐍).
                </p>
                <p>
                  My goal is to become a skilled developer who can bridge the gap between innovative ideas 
                  and practical, user-friendly implementations.
                </p>
              </div>
            </div>

            {/* Download Resume Button */}
            <motion.a
              href="/resume.pdf"
              download
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white'
              } shadow-lg hover:shadow-xl`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="text-lg" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Stats & Achievements */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`p-6 rounded-xl backdrop-blur-sm border text-center ${
                    isDark 
                      ? 'bg-gray-900/50 border-gray-700/50' 
                      : 'bg-white/50 border-gray-200/50'
                  } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Key Achievements
              </h4>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className={`p-4 rounded-lg backdrop-blur-sm border ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700/50' 
                      : 'bg-white/30 border-gray-200/50'
                  } hover:shadow-lg transition-all duration-300`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h5 className={`font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {achievement.title}
                      </h5>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Skills Section */}
        <AnimatedSkills />

        {/* Fun Facts */}
        <motion.div 
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <h3 className={`text-3xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Fun Facts About Me 🎉
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "☕", fact: "I can't code without coffee" },
              { emoji: "🎮", fact: "I built games for fun (like the snake game here!)" },
              { emoji: "🌙", fact: "I do my best coding at night" },
              { emoji: "📱", fact: "I check GitHub more than social media" },
              { emoji: "🎵", fact: "I code with lo-fi music playing" },
              { emoji: "🔥", fact: "I'm always learning something new" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg backdrop-blur-sm border ${
                  isDark 
                    ? 'bg-gray-800/30 border-gray-700/30' 
                    : 'bg-white/30 border-gray-200/30'
                } hover:shadow-lg transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {item.fact}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutEnhanced;
